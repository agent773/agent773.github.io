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

## GitHub setup

1. Create a repo named `agent773.github.io` and push `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. The first push deploys the placeholder to `https://agent773.github.io`.

## Cutover to the Angular site

1. Settings → Secrets and variables → Actions → Variables → add `PUBLISH_APP` = `site`.
2. Re-run the workflow (Actions → Deploy to GitHub Pages → Run workflow).
3. Check the home page and a refresh on a non-root route.

To roll back, set `PUBLISH_APP` to `placeholder` (or delete it) and re-run.
