# Melody Tai — Good design. On repeat.

Music-inspired product design portfolio built with Next.js, React and TypeScript.

## Local development

Run `./scripts/run-local.sh` and open http://localhost:3000.
Use `./scripts/run-local.sh typecheck`, `lint`, or `build` to check the site.
Stop the development server before building, then restart it afterward.

## Content

- Four selectable project discs, a rotating player, and play/pause controls.
- About and project pages with shared platinum, charcoal, and warm orange styling.
- Local Geist fonts, light/dark themes, keyboard focus and reduced-motion support.
- Project data: `src/data/projects.ts`.
- Player and collection: `src/components/MusicPortfolio.tsx` and `music.css`.
- Shared styling: `src/app/globals.css` and `theme.css`.

The portfolio includes MapSocial, Instagram Redesign, RingSense, and internship case studies. RingSense is presented as a concept in progress. The Resume link serves `public/resume.pdf`.

## Deployment

This is a standard Next.js application. On Vercel, import this repository, keep the Next.js framework preset, and use the default build settings. Production deployments follow the `main` branch.

Generated files, local environment settings, and preview screenshots are excluded from Git. The asset manifests in `docs/` are included because the case study pages import them.
