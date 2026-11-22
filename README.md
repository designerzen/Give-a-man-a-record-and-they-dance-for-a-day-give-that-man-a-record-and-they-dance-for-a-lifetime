# Give a man a record and they dance for a day, give that man a synthesizer and they dance for a lifetime

Slides for talks about [PhotoSYNTH](https://interface.place) by designerzen, built with [reveal.js](https://revealjs.com) and [Vite](https://vite.dev). `vite.config.js` compiles each `source/*.pug` page (files starting with `_` are partials) to a root-level `.html` entry.
Extracted from the [InterFACE](https://github.com/designerzen/InterFACE) repository.

| Page | Talk |
| --- | --- |
| `source/talk.pug` | PhotoSYNTH talk |
| `source/talk-rix.pug` | Talk @ RIX |
| `source/iop.pug` | IOP talk |

## Develop

```sh
pnpm install
pnpm start        # http://localhost:909
pnpm run build    # static site in ./dist
pnpm run preview  # serve ./dist
```

Speaker notes: press `S` in a deck.

## Media

- `static/talk/` – every image, video and sound used by the slides (bundled by Vite). Only add files a slide references.

## Deploy

Both workflows in `.github/workflows` run on every push to `main`.

- **GitHub Pages** – set *Settings → Pages → Source* to *GitHub Actions*.
- **Cloudflare Pages** – add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; the workflow deploys to the `photosynth-talks` project (create it once with `pnpm dlx wrangler pages project create photosynth-talks`). Or connect the repo in the Cloudflare dashboard with build command `pnpm run build` and output directory `dist`. Local deploy: `pnpm run deploy:cloudflare`.

## License

AGPL-3.0-or-later, see [LICENSE.md](LICENSE.md). Fonts: Oxanium and Readex Pro, SIL Open Font License.
