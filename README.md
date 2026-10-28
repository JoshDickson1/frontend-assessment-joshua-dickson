# Content Explorer

A small product browser built for the Frontend Assessment. It uses the
DummyJSON API and the Next.js App Router.

- **Live:** https://frontend-assessment-joshua-dickson.vercel.app
- **Repo:** https://github.com/JoshDickson1/frontend-assessment-joshua-dickson

## Features

- **F-1 Listing:** server-rendered product grid, 20 items per page, numbered
  pagination, and responsive columns.
- **F-2 Detail:** `/items/[id]` with server-side data, page metadata,
  breadcrumbs, an image gallery, and back-to-listing.
- **F-3 Search and filter:** URL-driven search with debounce and category
  filtering.
- **F-4 States:** loading skeletons, an error boundary, an empty state, and
  dedicated 404 pages.

## Setup

```bash
git clone https://github.com/JoshDickson1/frontend-assessment-joshua-dickson.git
cd frontend-assessment-joshua-dickson
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The app also works without `.env.local` because
both environment variables have defaults.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest suite |
| `npm run test:coverage` | Run tests with V8 coverage |
| `npm run typecheck` | Run `tsc --noEmit` |

## API choice

DummyJSON is public, requires no key, and provides enough product data for
search, categories, pagination, images, and detail pages. That keeps the focus
on the frontend while still exercising real server-side fetching, caching, and
error handling.

## Architecture

- **App Router with server components for data.** The listing and detail pages
  fetch on the server; interactive controls are small client components.
- **API layer in `src/lib/api.ts`.** Shared fetch logic, timeouts, one retry for
  network errors and 5xx responses, typed responses, and `revalidate: 3600`.
- **Types and helpers are separate.** Product/category types live in
  `src/types`, pagination and URL helpers live in `src/lib`, and reusable client
  behavior lives in `src/hooks`.
- **The URL is the source of truth.** `q`, `category`, and `page` are read from
  search params and written back with `router.replace`, so filters are
  shareable and survive reloads.
- **Streaming where it helps.** `ProductResults` is wrapped in a keyed Suspense
  boundary, so search, filter, and page changes show a meaningful skeleton
  while the next result set renders.
- **Last listing URL is remembered.** A small client tracker stores the current
  listing URL in `sessionStorage`, so the detail page can return to the filtered
  view the user came from.

### Testing

Vitest, React Testing Library, and jsdom cover the pagination utility and
component, `ProductCard`, `parsePage`, and `getDiscountedPrice`. There are 20
tests, with 100% statement, branch, function, and line coverage on `Pagination`
and `ProductCard`.

## Pagination choice

I used numbered, URL-driven pagination rather than infinite scroll. It keeps
the current page shareable, makes the browser back button predictable, gives
the server a clear unit to render, and is easier to navigate with a keyboard
and screen reader. Infinite scroll would add more client state and make it
harder to return to a specific result.

## Performance

- `next/image` with explicit dimensions, responsive `sizes`, and priority
  loading for the first four cards and the detail hero.
- `next/font` for the Geist font, avoiding layout shift and extra font requests.
- Server fetches use `revalidate: 3600`. Product data changes slowly, so a
  one-hour cache cuts repeated API work while keeping the content reasonably
  fresh.
- Keyed Suspense boundaries stream a skeleton while the next result set is
  fetched.
- Static assets are served with immutable caching
  (`public, max-age=31536000, immutable`), verified on the production URL.
- Glass blur is limited to a few surfaces. Hover motion uses transforms, and
  priority/LCP images skip the opacity fade so they can paint immediately.

**Lighthouse 13.6, run locally against the production URL, 28 October 2026.**
Mobile emulation; the detail run is `/items/2`. These are local Lighthouse
results, not PageSpeed Insights numbers.

| Page | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile home | 99 | 100 | 100 | 100 | 1.8 s | 0 | 40 ms |
| Mobile detail | 100 | 100 | 100 | 100 | 1.5 s | 0.005 | 20 ms |
| Desktop home | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms |

## Trade-offs and known limitations

- **Search plus category is filtered in memory.** DummyJSON cannot combine
  search and category in one request, so the app searches with `limit=0` and
  filters the category locally. This is fine for the current catalog size, but
  a larger catalog would need a paginated strategy.
- **Invalid product IDs return HTTP 200.** The detail route streams, so
  `notFound()` renders the correct 404 UI but the response status is already
  committed. A non-streaming route would return 404.
- **Image failures fall back after repeated load errors.** If the CDN or
  optimizer is unavailable, the card shows a clear "Image unavailable" state
  instead of a broken image.
- **Icons only from Lucide.** All layout, cards, controls, and states are
  hand-built; there is no UI component library.
- **No end-to-end tests or CI yet.** Unit and component tests are the current
  safety net; Playwright and CI are the next step.
- **No Cloudflare deployment.** Vercel was chosen for a reliable native
  Next.js deployment within the timebox. Cloudflare via the OpenNext adapter is
  the next deployment step.

## Deployment

The app is deployed on Vercel. It is a native Next.js host, which kept the
deployment path simple and reliable, and it gives the project production
caching, environment variables, and static asset headers without extra
infrastructure. `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_SITE_URL` are
documented in `.env.example`; both have sensible defaults.

The production config also sets `poweredByHeader: false`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy:
strict-origin-when-cross-origin`, and `X-Frame-Options: SAMEORIGIN`.

Cloudflare Workers with the OpenNext adapter and edge caching is the next
deployment step if the project needs a global edge footprint.

## Bonus tasks

- **B-2: Suspense streaming.** `ProductResults` sits inside a keyed Suspense
  boundary with a branded skeleton fallback. To verify it, open the live site,
  throttle the network in DevTools, and change the search term, category, or
  page; the skeleton appears while the next result set streams in.
- **B-3: Accessibility audit.** The production Lighthouse accessibility score
  is 100. The audit drove fixes for muted-text contrast, keyboard focus rings,
  a skip-to-content link, `aria-live` result counts, and the selected category
  in the filter trigger label. No automated findings remain.
- **B-1: Cloudflare/OpenNext edge caching.** Not attempted; see the deployment
  section for the planned next step.

## AI usage

AI tooling helped with scaffolding, boilerplate, tests, and documentation. I
reviewed the code, made the design and implementation decisions, and can
explain every section.

## What I'd do with 2 more hours

Move the deployment to Cloudflare Workers with the OpenNext adapter and add
edge caching, then add Playwright end-to-end tests and a CI workflow. I would
also move the search-plus-category filtering to a paginated strategy if the
catalog grew.
