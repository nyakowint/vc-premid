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
    const discordUrls = ["https://discord.com", "https://ptb.discord.com", "https://canary.discord.com"];

    for (const win of windows) {
        const url = win.webContents.getURL();
        if (discordUrls.some(prefix => url.startsWith(prefix))) {
            webFrame = win.webContents;
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
        logRenderer("SocketIO starting on 3020");
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
        logRenderer("[vc-premid] PreMiD socket connected!");
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
            logRenderer("Extension requested version");
            sio.emit("receiveVersion", "221");
        });

        sio.on("setActivity", setActivity);
        sio.on("clearActivity", clearActivity);
        sio.on("selectLocalPresence", () => {
            logRenderer("Selecting local presence is not supported");
            alert("Selecting local presence is not supported");
        });
        sio.once("disconnect", () => onIoDisconnect());
    } catch (e) {
        logError("[vc-premid] Error in onConnect: ", e);
    }
}

function logRenderer(message: string) {
    if (webFrame) {
        webFrame.executeJavaScript(`window.Vencord.Plugins.plugins.PreMiD.logger.info('${message}')`);
    } else {
        // just in case, dont worry about it pls
        console.log(`[vc-premid (fallback)] ${message}`);
    }
}

function logError(message: string, ...args: any[]) {
    console.error(`[vc-premid] ${message}`, args);
    alert(`vc-premid Error, please report this in thread or on THE PLUGIN'S github: ${message} ${args}`);
}

function setActivity(activity: any) {
    // hopefully this works
    webFrame.executeJavaScript(`window.Vencord.Plugins.plugins.PreMiD.receiveActivity(${JSON.stringify(activity)})`).catch(console.error);
}

function clearActivity() {
    logRenderer("Clearing activity");
    webFrame.executeJavaScript("window.Vencord.Plugins.plugins.PreMiD.clearActivity()");
}

function onIOError(e: { message: any; code: string; }) {
    logError("[vc-premid] SocketIO error", e);
}

async function onIoDisconnect() {
    console.log("[vc-premid] SocketIO disconnected");
    logRenderer("SocketIO disconnected");
    clearActivity();
}
