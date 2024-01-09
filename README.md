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
> *Discord does not display timestamps nor the timebar on desktop/web for some reason. You can check this yourself, it works just fine on mobile*


## Installation
There are two versions of this plugin:
- main (recommended): Uses `socket.io` npm package to allow the extension to connect with no extra applications.
- legacy: Uses a bridge script and does not require you to install any extra packages into Vencord. Switch to the `legacy-bridge` branch for this version.

### Install instructions
- Clone this repo to `src/userplugins`
- Build Vencord with `pnpm build`
- Fully restart Discord (Settings > Vencord > Restart Client)

- For `legacy-bridge` branch, switch to it and follow the instructions there.

> [!IMPORTANT]
> Only the PreMiD browser extension is supported. Offshoots/forks are not guaranteed to work if they function too differently.
