# Pokédex de Kanto

A public personal Vue application at [talana.stevenacz.com](https://talana.stevenacz.com/). Browse the original 151 Pokémon, search and combine type filters, choose up to six team members, and inspect their stats, descriptions, evolution and cries. Team and theme preferences stay in the browser.

## Development

Use Bun 1.4.1 and Node 22.19 or newer. Install with `bun install --frozen-lockfile`, run `bun run dev`, and verify with `bun run verify`. `bun run format` applies the repository formatter; lint is read-only unless `lint:fix` is explicitly selected.

## Data and performance

`src/data/kanto.json` is a validated snapshot of IDs 1–151 from [PokéAPI](https://pokeapi.co/docs/v2). Initial browsing, filtering and team stats use that local data instead of a list request followed by 151 detail requests. Public artwork/audio remain remote; descriptions and evolution load when requested and use the existing session cache. No user data is sent to an application backend.

To refresh the catalog deliberately, run `bun run refresh:catalog`. It uses four concurrent requests, bounded timeouts and complete ID validation before replacing the snapshot. Normal builds and deployments never fetch the full catalog. Snapshot refreshed September 5, 2026.

Existing Orbitron and Rajdhani fonts are self-hosted from Fontsource 5.3.0; their OFL licenses are in `public/fonts/`. Pokémon names/artwork belong to their respective owners. This is an unofficial personal demo, not a Pokémon or Talana product. No repository code license has been added.

## Structure

- `src/views/`: catalog, team and team-member detail.
- `src/components/`: shared controls, navigation and Pokémon presentation.
- `src/composables/`: loading, filtering, pagination and theme behavior.
- `src/stores/`: team persistence and session caches.
- `src/services/pokemonService.ts`: cached catalog and on-demand public API access.
- `scripts/`: explicit catalog refresh and generated-site checks.

## Validation and deployment

`bun run verify` checks formatting, types, ESLint, regression tests, build output, SEO/asset budget and dependency advisories. The deployment workflow requires these checks to pass. Home is indexable; personal team routes are noindex and absent from the sitemap. Deployment must preserve direct `/team` and `/team/:id` navigation while returning real 404 for unknown routes.

Browser acceptance: keyboard-select six Pokémon, filter/search, open the team, inspect a member, remove it, cancel/confirm the clear-team dialog, and verify light/dark and reduced-motion behavior at desktop and mobile widths. A blocked API should still allow catalog browsing; detail errors must offer a retry. Confirm live home, robots, sitemap, hashed assets and deep links after publication.
