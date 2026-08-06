This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

```
public/
- static files (images, fonts, logos) accessible to site visitors

src/ (where you'll do most of your coding)

  app/
  - Next.js folder that generates your website's pages
  - favicon.ico: browser tab icon
  - layout.tsx: master template, holds shared HTML skeleton for every page
  - page.tsx: code for the home page ("/" route)

  components/ui/
  - reusable visual building blocks (Button, Card, etc.) used across the app

  features/
  - mini-apps per feature (auth, clubs, events) so devs can work in parallel without conflicts

  lib/supabase/
  - code connecting your site to Supabase
  - client.ts: connects from the user's browser
  - server.ts: connects securely from the server

  types/ (typescript only)
  - database.ts: describes your database's data shape for autocomplete

supabase/
- database config, separate from website code
- migrations/: SQL files tracking database schema changes over time
- config.toml: settings for running Supabase locally

- .env.example / .env.local: environment variables (API keys, secrets). .env.local = real secrets (hidden from GitHub). .env.example = blank template for new devs
- .gitignore: tells Git which files/folders to ignore (e.g. .env.local, node_modules)
- package.json / package-lock.json: lists all npm packages the project needs; "npm install" reads this
- eslint.config.mjs: automated code style/formatting checker
- next.config.ts: Next.js settings
- postcss.config.mjs: required background tool for processing Tailwind CSS
- AGENTS.md / CLAUDE.md: instructions for AI coding assistants (Cursor, Windsurf, etc.)
- README.md: setup/start instructions for the project
- tsconfig.json / next-env.d.ts (typescript only): typescript config rules
```

## Typescript Guides

[TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

[Typescript for Javascript Developers in 15min](https://youtu.be/JUORwadOU7s)

