# Halden Estates
[![Checks](https://github.com/IliasJf/halden-estates/actions/workflows/ci.yml/badge.svg)](https://github.com/IliasJf/halden-estates/actions/workflows/ci.yml)

A responsive real estate website for a fictional Portuguese agency, built with **React 19**, **TypeScript**, **React Router 7**, **Tailwind CSS 4**, **Leaflet** and **Vite**.

What it does:

- **Search and filters** by place, type, price and bedrooms, kept in the URL so any search can be shared or bookmarked.
- **Map view** with price pins on OpenStreetMap. Nearby homes merge into a "3 homes" pin that zooms in when clicked, and the list under the map shows only the homes in the visible area. Leaflet loads only when someone opens the map.
- **Saved homes and compare:** tap the heart on any home, then compare up to three side by side (price, price per m², size, plot, rooms, year), with the best value in each row marked. Saved homes stay on the device and sync across open tabs.
- **Property pages** with a photo gallery, key facts, price per m² and a validated enquiry form.
- Home, About, Services and Contact pages.

**[Live demo](https://iliasjf.github.io/halden-estates/)**

## Getting started

You need [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (developed on Node 24) and [pnpm](https://pnpm.io/) (`npm install -g pnpm`).

```bash
pnpm install
pnpm dev
```

Then open the address Vite prints (usually http://localhost:5173).

| Command          | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `pnpm dev`       | Starts the development server with hot reload    |
| `pnpm build`     | Type-checks, then builds the site into `dist/`   |
| `pnpm typecheck` | Runs the TypeScript checker on its own         |
| `pnpm test`      | Runs the tests (filters, sorting, listing data)  |
| `pnpm preview`   | Serves the `dist/` build locally to check it     |

On Windows PowerShell, if `pnpm` is blocked by the script execution policy, type `pnpm.cmd` instead.

### Deploying

**GitHub Pages (set up):** every push to `main` runs `.github/workflows/deploy.yml`, which builds the site with `BASE_PATH=/<repo-name>/` and publishes it to `https://<user>.github.io/<repo-name>/`. It also copies `index.html` to `404.html` so deep links like `/properties/villa-mare-quinta-da-marinha` load correctly.

Elsewhere, `dist/` is a plain static site. Because routing happens in the browser, the host must send every unknown path to `index.html`:

- **Netlify:** add a `public/_redirects` file containing `/* /index.html 200`.
- **Vercel:** works out of the box for Vite projects.

## Folder structure

```
halden-estates/
├── index.html              Page shell, fonts and meta tags
├── public/                 Static files copied as-is (favicon)
├── tsconfig.json           Strict TypeScript settings
├── vite.config.ts          Vite + React + Tailwind plugins
└── src/
    ├── main.tsx            Entry point: mounts <App> inside the router
    ├── App.tsx             Route table
    ├── types.ts            Property, Filters and other shared types
    ├── index.css           Tailwind import, brand tokens (@theme) and shared classes
    ├── data/
    │   ├── properties.ts   ← Sample listings: edit this to change the properties
    │   └── site.ts         Brand details, navigation, services, team, stats
    ├── components/         Reusable building blocks
    │   ├── Layout.tsx        Skip link + Navbar + page + Footer
    │   ├── Navbar.tsx        Sticky header with a mobile menu and saved-homes link
    │   ├── Footer.tsx
    │   ├── Logo.tsx
    │   ├── PageHeader.tsx    Title band for inner pages
    │   ├── SectionHeading.tsx
    │   ├── PropertyCard.tsx
    │   ├── PropertyMap.tsx   Leaflet map with price pins and clustering (lazy-loaded)
    │   ├── SaveButton.tsx    Heart button for saving a home
    │   ├── SearchBar.tsx     Home page search → /properties?…
    │   ├── Filters.tsx       Properties page filter panel
    │   ├── SelectField.tsx   Labelled native <select>
    │   ├── Gallery.tsx       Photo viewer with thumbnails and arrow-key support
    │   ├── EnquiryForm.tsx   Validated lead form with success state
    │   ├── FormField.tsx     Label + input + inline error
    │   ├── EmptyState.tsx
    │   ├── CallToAction.tsx
    │   └── Icon.tsx          Inline SVG icon set
    ├── pages/              One component per route
    ├── hooks/
    │   ├── useDocumentTitle.ts
    │   └── useSaved.ts     Saved homes in localStorage (useSyncExternalStore)
    └── utils/
        ├── filters.ts      Filtering, sorting, and URL ↔ filter conversion
        ├── format.ts       Price and area formatting
        ├── image.ts        Responsive image URLs (srcset)
        └── enquiries.ts    Where form submissions go (see below)
```

## Editing the sample data

All listings live in **`src/data/properties.ts`**, typed by `Property` in `src/types.ts`. Each property looks like this:

```ts
{
  id: 1,
  slug: 'villa-mare-quinta-da-marinha', // used in the URL, must be unique
  title: 'Villa Maré',
  location: 'Cascais',                  // must be one of LOCATIONS
  neighbourhood: 'Quinta da Marinha',
  coords: [38.7155, -9.456],           // latitude, longitude for the map pin
  type: 'Villa',                        // must be one of PROPERTY_TYPES
  price: 3950000,                       // euros
  beds: 5,
  baths: 6,
  size: 520,                            // m²
  plot: 1800,                           // m², or null for apartments
  yearBuilt: 2021,
  featured: true,                       // shown on the home page
  summary: '…',
  description: ['paragraph 1', 'paragraph 2'],
  features: ['20 m heated pool', '…'],
  images: [{ src: 'https://…', alt: 'Describe what the photo shows' }],
}
```

- To add a location or property type, add it to `LOCATIONS` or `PROPERTY_TYPES` at the top of the same file; the filters and footer pick it up automatically.
- The first image is used on cards. Every image needs meaningful `alt` text.
- Images are hotlinked from [Unsplash](https://unsplash.com). Any URL works; Unsplash URLs are resized automatically through the `w` parameter.
- Agency details, services, team members and stats are in `src/data/site.ts`.
- Brand colours and fonts are defined once in the `@theme` block of `src/index.css`.

## Enquiry form: where submissions go

There is **no backend**. When someone sends an enquiry, `src/utils/enquiries.ts`:

1. saves it to the browser's **localStorage** under the key `halden-estates:enquiries`, and
2. logs it to the **browser console** (`[Halden Estates] New enquiry`).

To see stored enquiries, open the browser console and run:

```js
JSON.parse(localStorage.getItem('halden-estates:enquiries'))
```

To receive real leads, replace the body of `saveEnquiry()` with a `fetch()` call to your own API or a form service such as Formspree or Netlify Forms. The form component does not need to change.

## Accessibility notes

- Semantic landmarks, a "Skip to content" link and one `<h1>` per page.
- Visible `:focus-visible` outlines in a colour that adapts to light and dark sections.
- Every form field has a label; errors are shown inline and linked with `aria-describedby`, and focus moves to the first invalid field on submit.
- The mobile menu exposes `aria-expanded`, closes on Escape and on navigation.
- Text colours meet WCAG AA contrast on their backgrounds; motion is reduced when the user prefers it.

## Credits

Photography from [Unsplash](https://unsplash.com). Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors. Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts. Halden Estates, its staff, listings and contact details are fictional.

## License

[MIT](LICENSE)
