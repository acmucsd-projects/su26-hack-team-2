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
  - mini-apps per feature so devs can work in parallel without conflicts

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

## Developer Guides

- [Backend Development](https://www.geeksforgeeks.org/blogs/backend-development/) - the important ones to read here are: HTTP, REST, npm, Git, GitHub, JavaScript, Node JS (Next.js is built on Node JS), PostgreSQL (Supabase is built on PostgreSQL)
- [Git Branch Naming Conventions](https://conventionalbranch.org/) - what should i name my branch?
- [Git Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0/) - what should i write in my commit message?
- [TypeScript for JavaScript Programmers (in 5 minutes)](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Typescript for JavaScript Developers in 15min](https://youtu.be/JUORwadOU7s)
- [W3 React Tutorial](https://www.w3schools.com/React/Default.ASP)
- [ALL React Hooks Explained in 12 Minutes](https://youtu.be/LOH1l-MP_9k) - quick overview of hooks
- [Master React Hooks in easy way | useEffect](https://youtu.be/YxkcMszKEYY) - deep dive into useEffect hook
- [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) - how to make your own hook
- [Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#index-routes) - how to create pages and use layouts (page templates) in Next.js
- [Learn CSS](https://web.dev/learn/css/welcome) - this is a good reference
- [Styling with Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes#overview) - how to use it
- [Tailwind CSS Cheat Sheet](https://www.creative-tim.com/twcomponents/cheatsheet)
- [Understanding SQL Migrations: Your Database, Layer by Layer](https://sql-page.com/your-first-sql-website/migrations) - what are database migrations and how to use them?
- [Supabase Local Development & CLI](https://supabase.com/docs/guides/cli) - how to develop with supabase locally
- [Docker Desktop](https://docs.docker.com/desktop/) - needed to run supabase locally
- [Supabase Database Migrations](https://supabase.com/docs/guides/deployment/database-migrations) - (put npx before each supabase command) commands to make changes to the database schemas (and avoid conflicts with other devs automatically)
- [Google Calendar API overview](https://developers.google.com/workspace/calendar/api/guides/overview)

Also take note of the "scripts" object in `package.json` which allow you to run commands like `npm run dev` or `npm run gen-types` without having to remember the full command. You might find it useful to use VSCode extensions, use auto-formatting on save, and turn on word wrap (especially for Tailwind CSS).

Backend Development Flow:
```
Launch Docker
    ↓
npx supabase start
    ↓
Pull latest changes from main
    ↓
Navigate to/create a branch as needed (from main)
    ↓
Apply any new migrations
    ↓
Generate updated TypeScript types (if needed: npm run gen-types)
    ↓
Begin implementing your feature
    ↓
If schema changes are needed:
    Create a new migration (file)
        ↓
    Apply the migration 
        ↓
    Generate updated TypeScript types
        ↓
    Commit migration + types + code
    ↓
Run npm run dev and npm run lint to test and lint your changes
    ↓
Push your (branched) changes to GitHub
    ↓
(optional) Create a pull request to merge your changes into main
```

Example supabase client call (get all events and display them on an events page):
```ts
// src/app/events/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function EventsPage() {
  const supabase = createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('start_time')

  return (
    <div>
      <h1>Events</h1>
      {events?.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  )
}
```
