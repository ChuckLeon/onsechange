# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A French-language Next.js (App Router) app for organizing gift exchanges ("échange de cadeau" / Secret Santa). A user sets up an exchange and organiser name, adds 3+ participants (name + email), and on submit the app randomly assigns each participant a giftee (no self-assignment) and emails each participant their pick via Resend.

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (`next/core-web-vitals` config)

No test suite is configured in this repo.

Requires a `.env` with `RESEND_API_KEY` for the email-sending API route to work.

## Architecture

**Path alias**: `@/*` maps to the repo root (see `tsconfig.json`).

**State flow**: A single `Step` (`"SetOrganiser" | "AddUsers" | "ExchangeSent"`) drives which section of the UI is visible, held in a global zustand store (`lib/store.ts`). `app/page.tsx` conditionally shows the intro copy based on this step; `containers/game/Game.tsx` conditionally shows/hides its three sections via CSS classes (all three sections are always mounted, visibility toggled with `clsx`/modifier classes — not conditional rendering) keyed off the same step.

**Game logic lives in the hook, not the component**: `containers/game/useGame.ts` owns all state and behavior (players array, refs to uncontrolled top-level inputs, submit handling, validation, giftee assignment, email sending). `containers/game/Game.tsx` is presentational and just wires the hook's returned values to JSX. When changing game behavior, edit the hook; when changing layout/markup, edit the component.

**Uncontrolled form pattern**: Player name/email inputs are uncontrolled (no `value`/`onChange` per keystroke) named `player{index}-name` / `player{index}-email`. On submit, `useGame.buildPlayersFromFormData` reads a native `FormData` from the form ref and reconstructs the `IPlayer[]` array by regex-matching field names. Validation runs through `utilities/schemas.ts` (zod) against that reconstructed array, and per-field errors are mapped back onto player state by array index for display (`nameIsInvalid`/`emailIsInvalid` props).

**Giftee assignment**: `sendToPlayers` in `useGame.ts` iterates players, and for each picks a random giftee from players not yet assigned as a giftee using `utilities/array.ts#getRandomItemFromArray` (which excludes self and mutates the array passed in via `splice`). One email is sent per player via `scripts/sendEmail.ts`, sequentially in a loop (not in parallel).

**Email sending path**: Client calls `scripts/sendEmail.ts#sendEmail`, which POSTs to `pages/api/email.ts` (Pages Router API route, coexisting with the App Router `app/` directory). That route uses the `resend` package to send an HTML email (all copy in French). Request/response shapes are defined in `utilities/types.ts` (`EmailApiRequest`, `EmailApiResponse`, `EmailApiError`).

**Component organization**:
- `components/` — generic, reusable, presentational UI primitives (Button, Input, Header, Particles). Each has its own folder with `Component.tsx`, `Component.scss`, and an `index.ts` barrel; all re-exported from `components/index.ts`.
- `containers/` — feature/domain-specific pieces that compose primitives (Game, Player, LabelledInput), same folder/barrel convention, re-exported from `containers/index.ts`.
- `Particles` (`components/particles/`) is a WebGL background effect built directly on `ogl` (falling particles), with inline GLSL vertex/fragment shaders — not a generic canvas wrapper.

**Styling**: SCSS with BEM naming, no Tailwind. Global partials in `styling/` (`colors.scss`, `spacing.scss`, `helpers.scss`, `functions.scss`) are auto-prepended to every SCSS module via `sassOptions.prependData` in `next.config.js` — don't manually `@import` them in component files. Colors are HEX values via CSS custom properties (`--color-*`) defined in `styling/colors.scss`, which also generates utility classes (`.text-*`, `.bg-*`, `.border-*`). `styling/helpers.scss` generates layout/utility classes (flex, spacing, radius, etc.) in the same vein — check there before writing an equivalent one-off rule.

## Conventions (from AGENTS.md)

- Function components + hooks only; `.tsx` for components.
- Avoid `useEffect` where possible.
- Wrap functions/values passed to children or used in dependency arrays with `useCallback`/`useMemo`.
- Import `React` members directly (e.g. `import { useState }`), don't reference `React.xxx`.
- No comments unless truly necessary; **no comments at all in SCSS files**.
- SCSS: BEM naming, HEX colors, use existing variables/helpers from `styling/`, no Tailwind.
- Keep component styles in a sibling `.scss` file, not inline.
