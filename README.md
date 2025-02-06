## This plugin has been deprecated as of `Oct 1 2024` & the plugin's patches no longer work (Feb 2025)... 

# PreMiD Vencord
inspired by [premid-powercord](https://github.com/MulverineX/premid-powercord)

Connect the [PreMiD Extension](https://premid.app) to Discord using a Vencord plugin — An alternative to their tray process.

Supports watching/listening status and additionally attempts to match category to status type:
- `socials` w/ tag `video` -> **WATCHING**
- `anime` w/ tags `["video", "media", "streaming"]` -> **WATCHING**
- `music` -> **LISTENING**
- `videos` -> **WATCHING**
- Everything else falls back to **PLAYING**

> [!NOTE]
> ~~*For watching and listening statuses, Discord does not display timestamps nor the timebar on desktop/web. You can check this yourself by opening Discord on mobile and checking profiles*~~ Discord finally fixed it! <sub>took them long enough</sub>


## Installation
There are two <sub>and a half</sub> versions of this plugin:
- main (recommended): Uses `socket.io` npm package to allow the extension to connect with no extra applications.
- legacy: Uses a bridge script and does not require you to install any extra packages into Vencord. Switch to the `legacy-bridge` branch for this version.
- 2.5.2 branch: The plugin before PreMiD and Discord did their activity status update, based off main. (2024-09-30)

### Install instructions
- [Read the docs](https://docs.vencord.dev/installing/custom-plugins/) to setup custom plugins
- Fully restart Discord (Settings > Vencord > Restart Client)
- Enable the plugin
- Ensure your extension is working on whatever site you wish

> [!NOTE]
> If you use version 2.6.11 or newer, I've tested with the following settings:
>
> ![Use Playing Status + Prefer App](https://github.com/user-attachments/assets/ff48dbf0-0ce5-4c06-8938-3b86360998cc)
>
> They may break this version again in the future, so if you have trouble womp womp lol

> [!IMPORTANT]
> Only the PreMiD browser extension is supported. Offshoots/forks are not guaranteed to work if they function too differently.
>
