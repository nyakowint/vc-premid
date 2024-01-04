# PreMiD Vencord (inspired by premid-powercord)

Alternative way to bridge premid to discord, instead of using their tray app thing

Supports watching/listening status and additionally attempts to match category to status type:
- `socials` w/ tag `video` -> **WATCHING**
- `anime` w/ tags `["video", "media", "streaming"]` -> **WATCHING**
- `music` -> **LISTENING**
- `videos` -> **WATCHING**
- Everything else falls back to **PLAYING**
*Using watching/listening statuses this way do not show timestamps despite them being provided, so I attempted to replicate it myself for the watching status.*

## Usage
Clone this repo to `src/userplugins` and `pnpm build` Vencord.
Follow the instructions in the [bridge](https://github.com/nyakowint/vc-pmb) repo and you're good to go.

> [!NOTE]
> The bridge is required because of PreMiD devs being weird and using socket.io for whatever reason lol
> including sio in vencord would be annoying and causes issues with building
