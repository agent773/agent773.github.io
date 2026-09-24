# Website

Personal website. Two apps in one Yarn workspace, deployed to GitHub Pages:

- `apps/placeholder` – Astro landing page, live while the real site is built
- `apps/site` – Angular site (the Figma design)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) publishes whichever workspace the
repository variable `PUBLISH_APP` names. It defaults to `placeholder`.

## Local development

Requires Node 24 and Corepack (`corepack enable`). Install once from the repo root with `yarn`.

| Task | Command |
| --- | --- |
| Run placeholder | `yarn dev:placeholder` |
| Build placeholder | `yarn build:placeholder` |
| Preview placeholder build | `yarn preview:placeholder` |
| Run Angular site | `yarn dev:site` |
| Build Angular site | `yarn build:site` |
