/*
 * Vencord, a Discord client mod
 * Copyright (c) 2023 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Link } from "@components/Link";
import { Devs } from "@utils/constants";
import { Logger } from "@utils/Logger";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { ApplicationAssetUtils, FluxDispatcher, Forms, Toasts } from "@webpack/common";

interface ActivityAssets {
    large_image: string;
    large_text?: string | null;
    small_image: string;
    small_text: string;
}

type ActivityButton = {
    label: string;
    url: string;
};

export interface Activity {
    state: string;
    details?: string;
    timestamps?: {
        start?: number;
        end?: number;
    };
    assets: ActivityAssets;
    buttons?: Array<string>;
    name: string;
    application_id: string;
    metadata?: {
        button_urls?: Array<string>;
    };
    type: number;
    flags: number;
}

interface PremidActivity {
    state: string;
    details?: string;
    startTimestamp?: number;
    endTimestamp?: number;
    largeImageKey: string;
    largeImageText: string;
    smallImageKey: string;
    smallImageText: string;
    buttons?: ActivityButton[];
    name?: string;
    application_id: string;
    type: number;
    flags: number;
}

interface PresenceData {
    // Only relevant types - https://github.com/PreMiD/PreMiD/blob/main/%40types/PreMiD/PresenceData.d.ts
    clientId: string;
    presenceData: PremidActivity;
}

const enum ActivityType {
    PLAYING = 0,
    LISTENING = 2,
    WATCHING = 3,
    COMPETING = 5
}

const enum ActivityFlag {
    INSTANCE = 1 << 0
}

interface PublicApp {
    id: string;
    name: string;
    icon: string;
    statusType: ActivityType | undefined;
    flags: number;
}

const logger = new Logger("Vencord-PreMiD", "#8fd0ff");

const RPCUtils = findByPropsLazy("fetchApplicationsRPC", "getRemoteIconURL");

const apps: any = {};
async function getApp(applicationId: string): Promise<PublicApp> {
    if (apps[applicationId]) return apps[applicationId];
    const socket: any = {};
    debugLog(`Looking up ${applicationId}`);
    await RPCUtils.fetchApplicationsRPC(socket, applicationId);
    logger.debug(socket);
    debugLog(`Lookup finished for ${socket.application.name}`);
    const activityType = await determineStatusType(socket.application);
    debugLog(`Activity type for ${socket.application.name}: ${activityType}`);
    socket.application.statusType = settings.store.detectCategory ? activityType : ActivityType.PLAYING || ActivityType.PLAYING;
    apps[applicationId] = socket.application;
    return socket.application;
}

async function getAppAsset(applicationId: string, key: string): Promise<string> {
    return (await ApplicationAssetUtils.fetchAssetIds(applicationId, [key]))[0];
}

function setActivity(activity: Activity | undefined) {
    FluxDispatcher.dispatch({
        type: "LOCAL_ACTIVITY_UPDATE",
        activity,
        socketId: "PreMiD",
    });
}

const settings = definePluginSettings({
    enableSet: {
        description: "Should the plugin set presences?",
        type: OptionType.BOOLEAN,
        default: true,
        onChange: (value: boolean) => {
            if (!value) shiggyMid.clearActivity();
        },
    },
    showButtons: {
        description: "Show buttons",
        type: OptionType.BOOLEAN,
        default: true,
    },
    detectCategory: {
        description: "Set your Activity Type based on presence category",
        type: OptionType.BOOLEAN,
        default: true,
    },
    hideViewChannel: {
        description: "YouTube: Hide view channel button",
        type: OptionType.BOOLEAN,
        default: false,
    },
    // Still have not felt like implementing this lol
    // manualShare: {
    //     description: "Share presence manually",
    //     type: OptionType.BOOLEAN,
    //     default: false,
    // }
});

const Native = VencordNative.pluginHelpers["Vc-premid"] as PluginNative<typeof import("./native")>;

const shiggyMid = definePlugin({
    name: "PreMiD",
    tags: ["presence", "premid", "rpc"],
    description: "A PreMiD app replacement. Supports watching/listening status. Requires extra setup (see settings)",
    authors: [Devs.Nyako],
    toolboxActions: {
        "Toggle presence sharing": () => {
            settings.store.enableSet = !settings.store.enableSet;
            showToast(`Presence sharing is now ${settings.store.enableSet ? "enabled" : "disabled"}`);
            shiggyMid.clearActivity();
        },
    },

    settingsAboutComponent: () => (
        <>
            <Forms.FormTitle tag="h3">How to use this plugin</Forms.FormTitle>
            <Forms.FormText>
                Install the <Link href="https://premid.app/downloads#ext-downloads">PreMiD browser extension</Link>.
            </Forms.FormText>
            <Forms.FormText tag="h4">
                This will not work with anything that has differing behavior (such as PreWrap)
            </Forms.FormText>
            <Forms.FormText>
                That's all you need, if you followed the instructions in this plugin's README you should be good. This plugin replicates their electron tray process so no need to use allat.
            </Forms.FormText>
        </>
    ),

    settings,
    logger,

    start() {
        Native.init();
    },

    stop() {
        this.clearActivity();
        Native.disconnect();
    },

    clearActivity() {
        FluxDispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            activity: null,
            socketId: "PreMiD",
        });
    },

    showToast,

    async receiveActivity(data: PresenceData) {
        logger.log("Received activity", data);
        if (!settings.store.enableSet) {
            this.clearActivity();
            return;
        }
        try {
            const id = data.clientId;
            if (!id) return;
            const appInfo = await getApp(id);
            const presence = { ...data.presenceData };
            if (appInfo.name === "PreMiD") return;
            logger.info(`Setting activity of ${appInfo.name} "${presence.details}"`);

            const { details, state, largeImageKey, smallImageKey, smallImageText } = presence;
            const activity: Activity = {
                application_id: id,
                name: appInfo.name,
                details: details ?? "",
                state: state ?? "",
                type: appInfo.statusType || ActivityType.PLAYING,
                flags: ActivityFlag.INSTANCE,
                assets: {
                    large_image: await getAppAsset(id, largeImageKey ?? "oops"),
                    small_image: await getAppAsset(id, smallImageKey ?? "oops"),
                    small_text: smallImageText || "hello there :3",
                },
                buttons: presence.buttons?.map((b: { label: any; }) => b.label),
                metadata: {
                    button_urls: presence.buttons?.map((b: { url: any; }) => b.url)
                },
                timestamps: {
                    start: presence.startTimestamp,
                    end: presence.endTimestamp
                }
            };


            if (activity.type === ActivityType.PLAYING) {
                activity.assets = {
                    large_image: await getAppAsset(id, largeImageKey ?? "guh"),
                    large_text: "vc-premid",
                    small_image: await getAppAsset(id, smallImageKey ?? "guhh"),
                    small_text: smallImageText || "hello there :3",
                };
            }

            if (settings.store.showButtons && activity.buttons) {
                if (appInfo.name === "YouTube" && settings.store.hideViewChannel) {
                    activity.buttons?.pop();
                    if (activity.metadata && activity.metadata && activity.metadata.button_urls) {
                        activity.metadata.button_urls = [activity.metadata.button_urls[0]];
                    }
                }
            }

            // Discord sooo braindead - timestamps for WATCHING/LISTENING show on mobile but not desktop lmaoo

            // if (activity.timestamps) {
            //     const { start, end } = activity.timestamps;
            //     if (start && end) {
            //         activity.timestamps = {
            //             start,
            //             end
            //         };
            //     } else if (start) {
            //         if (activity.type === ActivityType.WATCHING || activity.type === ActivityType.LISTENING) {
            //             activity.assets.large_text = `${formatTime(Math.floor(Date.now() / 1000) - start)} elapsed`;
            //         }
            //         activity.timestamps = {
            //             start: start
            //         };
            //     } else if (end) {
            //         if (activity.type === ActivityType.WATCHING || activity.type === ActivityType.LISTENING) {
            //             const remainingTime = end - Math.floor(Date.now() / 1000);
            //             activity.assets.large_text = `${formatTime(remainingTime)} left`;
            //         }
            //         activity.timestamps = {
            //             ...activity.timestamps,
            //             end: end
            //         };
            //     }
            // }

            // prevActivity = activity;

            // if (activity.type === ActivityType.WATCHING) {
            //     if (activity.timestamps) {
            //         clearInterval(timerInterval);
            //         timerInterval = setInterval(() => updateTimer(prevActivity, activity), 1000);
            //     }
            // }

            for (const k in activity) {
                if (k === "type") continue; // without type, the presence is considered invalid.
                const v = activity[k];
                if (!v || v.length === 0)
                    delete activity[k];
            }


            setActivity(activity);
        } catch (err) {
            logger.error(err);
        }
    }
});


// function formatTime(seconds: number): string {
//     seconds = Math.max(0, seconds);

//     const hours = Math.floor(seconds / 3600);
//     seconds -= hours * 3600;
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;

//     let formattedTime = `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
//     if (hours > 0) {
//         formattedTime = `${hours.toString()}:${formattedTime}`;
//     }

//     return formattedTime;
// }

async function determineStatusType(info: PublicApp): Promise<ActivityType | undefined> {
    let firstCharacter = info.name.charAt(0);
    if (firstCharacter.match(/[a-zA-Z]/)) {
        firstCharacter = firstCharacter;
    } else if (firstCharacter.match(/[0-9]/)) {
        firstCharacter = "0-9";
    } else {
        firstCharacter = "%23"; // #
    }

    const res = await fetch(`https://raw.githubusercontent.com/PreMiD/Presences/main/websites/${firstCharacter}/${info.name}/metadata.json`);
    if (!res.ok) return ActivityType.PLAYING;

    try {
        const metadata = await res.json();
        switch (metadata.category) {
            case "socials":
                if (metadata.tags.includes("video")) {
                    return ActivityType.WATCHING;
                }
                break;
            case "anime":
                if (metadata.tags.some((tag: string) => ["video", "media", "streaming"].includes(tag))) {
                    return ActivityType.WATCHING;
                }
                break;
            case "music":
                return ActivityType.LISTENING;
            case "videos":
                return ActivityType.WATCHING;
        }
    } catch (e) {
        logger.error(e);
        return ActivityType.PLAYING;
    }
    return ActivityType.PLAYING;
}

function debugLog(msg: string) {
    if (IS_DEV) console.log(msg);
}

function showToast(msg: string) {
    Toasts.show({
        message: msg,
        type: Toasts.Type.SUCCESS,
        id: Toasts.genId(),
        options: {
            duration: 5000,
            position: Toasts.Position.TOP
        }
    });
}

export default shiggyMid;

