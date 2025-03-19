Simple SWAPI app using Shadcn, Next.js 15+

The app is a frontend SPA with no SSR needed (other than layouts).

The requests are cached in both localStorage and using the new Next.js caching.

Cache (both server and localStorage) can be cleared from the home with the Clear Cache button.

## Getting Started

First, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Structure:

The main pages are in dashboard, with 3 components that are reused on every page:

- detail-page: takes a list of columns as input and format the fields of a resource
- list-page: takes a list of columns as input and format a paginated table
- resource-link: component to display a link to a resource, while fetching the Name from the API

```
src/
├── app/
│   ├── api/
│   │   └── swapi/
│   │       └── [...path]/
│   │           └── route.ts - Proxy to cache SWAPI on server with rate limiting
│   ├── dashboard/
│   │   ├── components/
│   │   │   └── list-page.tsx - takes a list of columns as input and format the fields of a resource
│   │   │   └── detail-page.tsx - takes a list of columns as input and format a paginated table
│   │   │   └── resource-link.tsx -  component to display a link to a resource, while fetching the Name from the API
│   │   ├── films/
│   │   │   └── [id] page.tsx - the detail page
│   │   │   └── page.tsx - the paginated list page
│   │   ├── swapi-client.tsx - an utility function to fetch from SWAPI, optionally with localStorage caching
│   │   └── use-swapi.tsx - an composable to manage loading of resources that needs to fetch the /resource/:id to show extra fields
│   └── layout.tsx - base dashboard layout (from shadcn)
├── components/ - components from Shadcn
│   ├── ...
│   └── ui/
│       ├── ...
├── configs/
│   ├── cache.tsx - Config utility for caching
│   └── menus.tsx - Static settings for the nav menu
├── env.example - Optional configs, like rate limiting and enable/disable server and localStorage cache
└── package.json
```
