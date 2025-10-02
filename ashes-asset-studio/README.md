# Ashes of Verdun — Asset Studio

A single-page React + TypeScript + TailwindCSS tool for crafting, validating, and archiving card assets for the Ashes of Verdun tabletop project.

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Card data persists in `localStorage` per browser profile.

## Available Scripts

- `npm run dev` — Start the Vite development server.
- `npm run build` — Type-check with `tsc` and output a production build.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Lint TypeScript/React sources via ESLint.

## Adding New Asset Types

1. Author an AJV-compatible JSON schema in `src/schemas/<type>.schema.json` and register it inside `src/schemas/index.ts`.
2. Extend `AssetType` in `src/schemas/types.ts`.
3. Append a form definition in `src/utils/formConfig.ts` (or rely on JSON mode until the bespoke form is ready).
4. Add rendering logic in `CardPreview` as desired for the new asset type.

## Project Pillars

- Cohesive Ashen brand skin across previews.
- Strict schema validation via AJV for both form and JSON modes.
- Local persistence with graceful empty states and accessible UI patterns.
