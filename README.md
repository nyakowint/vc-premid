# PreMiD Vencord (legacy-bridge)
inspired by [premid-powercord](https://github.com/MulverineX/premid-powercord)

Connect the [PreMiD Extension](https://premid.app) to Discord using a Vencord plugin and a bridge script — An alternative to their tray process.

Supports watching/listening status and additionally attempts to match category to status type:
- `socials` w/ tag `video` -> **WATCHING**
- `anime` w/ tags `["video", "media", "streaming"]` -> **WATCHING**
- `music` -> **LISTENING**
- `videos` -> **WATCHING**
- Everything else falls back to **PLAYING**

> [!NOTE]
> *Watching/Listening status timestamps and timebar do not display on desktop/web for some reason. You can blame discord for this*

## Usage
Clone this repo to `src/userplugins` and `pnpm build` Vencord.
Follow the instructions to setup the [bridge script](https://github.com/nyakowint/vc-pmb) and you're good to go.

> [!NOTE]
> The bridge is required in this version as there is no plugin native code.
