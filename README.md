# TDNT Assignment

## Nuxt 3 Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Configs

This project is using opinionated configs from personal preference like [prettier](https://prettier.io/) and [eslint](https://eslint.org/).

To check for linting and format errors run the following command

```bash
pnpm lint
```

Additionally you can run that `lint:fix` to automatically fix them (if possible)

```bash
pnpm lint:fix
```

## Component library

I'm using [shadcn-vue](https://www.shadcn-vue.com/) as the main component library, it has a vast collection of accessible and highly customizable components, which are based on `tailwindcss`. It has a cli tool that lets you add components on demand.

## CSS

I'm using `tailwindcss` because I Utility-First css approach and it's faster to develop with compared to traditional css.

tailwind's config is in `tailwind.config.ts` and the css variables are declared in `/app/assets/css/tailwind.css`

## Server

I've spun up a small server (code in `/server`) to mock user authentication with password hasing, user data is hardcoded javascript variables for mock purposes. On refresh, user is fetched using the saved token in session storage

## Client-side api

I created an api wrapper that handles sending the token if it's available

## I18N

For internalization I'm using the [nuxt port](https://i18n.nuxtjs.org/) of `Vue I18n`, translation files are found in `/i18n/locales/`, static text and error messages are internationalized

## Supabase

I'm using supabase for oAuth features (github login).

## Testing

This was actually the first time I do unit tests, it was a pretty interesting experience. For that I've used `@nuxt/test-utils` alongside `vitest`. I've focused on basic component logic and made sure internationalization worked perfectly.

## Global State, middlewares

I'm using pinia for global state management, it has great DX and dev-tools integration. There are 2 middlewares (1 for guest and another for authenticated users), respectively, one prevents logged in users from visiting guest-only routes, the other prevents guests (not logged in) from checking routes that requires authentication. middlewares can be found at `/app/middleware` and registered in the page's metadata (using `definePageMeta`)

## Layouts

The website has a default layout (global layout defined in a component).

## Typescript

I'm using typescript because why wouldn't you :)

## HTPPS

generated a certificate using `openssl` for secure communication
