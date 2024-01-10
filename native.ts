/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { BrowserWindow, WebContents } from "electron";
import { createServer, Server as HttpServer } from "http";

import { Server, Socket } from "./dependencies.dist";

let io: Server;
let httpServer: HttpServer;
let hasInit = false;
let webFrame: WebContents;

export function init() {
    if (hasInit) return;

    const windows = BrowserWindow.getAllWindows();
    for (const win of windows) {
        const url = win.webContents.getURL();
        console.log(url);
        switch (url) {
            case "https://discord.com/app":
            case "https://ptb.discord.com/app":
            case "https://canary.discord.com/app":
                webFrame = win.webContents;
                break;
        }
    }

    httpServer = createServer();

    io = new Server(httpServer, {
        serveClient: false,
        allowEIO3: true,
        cors: { origin: "*" }
    });
    httpServer.listen(3020, () => {
        console.log("[vc-premid] SocketIO starting on 3020");
        info("SocketIO starting on 3020");
    });
    httpServer.on("error", onIOError);
    io.on("connection", onConnect);
    hasInit = true;
}

export function disconnect() {
    if (!hasInit) return;
    io.close();
    httpServer.close();
    hasInit = false;
}

async function onConnect(sio: Socket) {
    try {
        console.log("[vc-premid] PreMiD socket connected!");
        webFrame.executeJavaScript("window.Vencord.Plugins.plugins.PreMiD.showToast('PreMiD connected!')");
        // Get current user from plugin & send to extension
        const {
            username,
            globalName,
            id,
            avatar,
            discriminator,
            flags,
            premiumType
        } = JSON.parse(await webFrame.executeJavaScript("JSON.stringify(window.Vencord.Webpack.Common.UserStore.getCurrentUser());"));
        sio.emit("discordUser", { username, global_name: globalName, discriminator, id, avatar, bot: false, flags, premium_type: premiumType });

        // Extension requests Premid version
        sio.on("getVersion", () => {
            info("Extension requested version");
            sio.emit("receiveVersion", "221");
        });

        sio.on("setActivity", setActivity);
        sio.on("clearActivity", clearActivity);
        sio.on("selectLocalPresence", () => { info("Selecting local presence is not supported"); });
        sio.once("disconnect", () => onIoDisconnect());
    } catch (e) {
        console.error("[vc-premid] Error in onConnect: ", e);
    }
}

function info(message: string) {
    webFrame.executeJavaScript(`window.Vencord.Plugins.plugins.PreMiD.logger.info('${message}')`);
}

function setActivity(activity: any) {
    // hopefully this works
    webFrame.executeJavaScript(`window.Vencord.Plugins.plugins.PreMiD.receiveActivity(${JSON.stringify(activity)})`).catch(console.error);
}

function clearActivity() {
    info("Clearing activity");
    webFrame.executeJavaScript("window.Vencord.Plugins.plugins.PreMiD.clearActivity()");
}

function onIOError(e: { message: any; code: string; }) {
    console.error("[vc-premid] SocketIO error", e);
    info(`SocketIO error ${e.code}: ${e.message}`);
}

async function onIoDisconnect() {
    info("[vc-premid] SocketIO disconnected");
    clearActivity();
}
