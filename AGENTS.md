# Pokédex web guide

Public personal demo at https://talana.stevenacz.com/; source is StevenACZ/steven-coaila-11-2025. This is the Kanto Pokédex demo, separate from Talana employer/mobile repositories.

- Preserve the existing visual identity, routes and six-member team contract.
- Use Bun 1.4.1 and the tracked bun.lock. Node must satisfy package.json engines.
- Initial catalog/filtering and team stats use the validated 151-record snapshot in src/data/kanto.json. Normal builds never fetch the whole API. Refresh explicitly with bun run refresh:catalog; keep bounded concurrency and validate complete IDs before replacement.
- Descriptions/evolution and images/audio remain public PokéAPI resources. Keep errors recoverable and do not add external services without a specific need.
- Buttons must work with Enter/Space; dialogs need focus, Escape and restoration. Respect reduced motion and keep visible content usable without decoration scripts.
- Home is public/indexable. Team state is local to the browser; team routes are noindex and absent from the sitemap. Preserve unknown-path HTTP 404 behavior.
- Do not commit credentials, caches, generated dist output, private infrastructure paths or raw API dumps.
- Run bun run format and bun run verify before Git/deploy. Check native Chrome selection/filter/detail/remove/modal flows and mobile layout after interface changes.
- Keep README and CHANGELOG accurate. No invented license, ratings or performance scores.

- Main is protected. Open a pull request with passing checks instead of relying on owner bypass for direct pushes. Pull-request verification runs on GitHub-hosted runners; deploy jobs run only from trusted main.
