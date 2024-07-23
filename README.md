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
> *For watching and listening statuses, Discord does not display timestamps nor the timebar on desktop/web. You can check this yourself by opening Discord on mobile and checking profiles*


## Installation
There are two versions of this plugin:
- main (recommended): Uses `socket.io` npm package to allow the extension to connect with no extra applications.
- legacy: Uses a bridge script and does not require you to install any extra packages into Vencord. Switch to the `legacy-bridge` branch for this version.

### Install instructions
- [Read the docs](https://docs.vencord.dev/installing/custom-plugins/) to setup custom plugins
- Fully restart Discord (Settings > Vencord > Restart Client)
- Enable the plugin
- Ensure your extension is working on whatever site you wish

> [!IMPORTANT]
> Only the PreMiD browser extension is supported. Offshoots/forks are not guaranteed to work if they function too differently.
> 
> PreMiD extension versions newer than 2.5.2 are not guaranteed to work either. (see https://github.com/nyakowint/vc-premid/issues/4 ) They use Discord's application presence capabilities now anyways (it sucks and is slow lol) 
