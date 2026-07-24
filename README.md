# Échange de cadeau

A simple Next.js app for organizing a gift exchange (Secret Santa). Set up an exchange and organiser, add at least 3 participants, and the app randomly assigns each participant a giftee and emails everyone their pick.

## Getting started

Install dependencies:

```bash
npm install
```

Add a `.env` file with a Resend API key (required for sending emails):

```
RESEND_API_KEY=your_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Stack

- Next.js (App Router)
- TypeScript
- Zustand for state
- Zod for validation
- SCSS (BEM) for styling
- Resend for transactional email
