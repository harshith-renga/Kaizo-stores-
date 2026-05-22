# Dev Notes — Quick developer guide

This file contains small tips for working on the project and deploying to Vercel.

Running locally

```bash
npm install
npm run dev        # start dev server
npm run build      # verify production build
npm run clean      # remove .next build folder
```

Images & focal points

- Uploaded images are in the `images/` folder.
- Per-image focal points (object-position) are declared in `images/focalPoints.json` — update entries there to change how images are cropped on cards and hero.
- When adding a new image, add an entry into `images/focalPoints.json` using the image filename as the key and a CSS `object-position` value as the value (for example: `"myphoto.jpg": "center 30%"`).

Vercel deployment

- Ensure the repo is connected to Vercel (GitHub integration).
- Set these environment variables in the Vercel project for Supabase access:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Workflow suggestions

- Make UI/image adjustments by updating `images/focalPoints.json` rather than editing JSX inline.
- Use the `image-aesthetic` branch for iterative UI work; open a PR when ready to merge to `main`.
