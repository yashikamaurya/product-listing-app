# Product Listing App

A responsive product listing page built with **Next.js**, **React**, **TypeScript**, and **Bootstrap 5**. Product data is fetched from the public [Fake Store API](https://fakestoreapi.com/products) using **Server-Side Rendering (SSR)**.

## Features

- ✅ Server-Side Rendering using `getServerSideProps`
- ✅ Responsive product cards using Bootstrap grid (1 column on mobile, up to 4 on desktop)
- ✅ Each card shows image, title, price, category, and rating
- ✅ Client-side search bar to filter products by title
- ✅ Category dropdown filter (bonus)
- ✅ Loading spinner shown while filtering
- ✅ Client-side pagination (8 products per page)
- ✅ Dynamic product details page (`/product/[id]`) with SSR
- ✅ Written in TypeScript
- ✅ Unit tests with Jest + React Testing Library

## Tech Stack

- React.js
- Next.js (Pages Router)
- TypeScript
- Bootstrap 5
- Fetch API
- Jest + React Testing Library

## Project Structure

```
product-listing-app/
├── components/
│   ├── ProductCard.tsx       # Single product card UI
│   └── LoadingSpinner.tsx    # Bootstrap spinner
├── pages/
│   ├── _app.tsx              # Global app wrapper, imports Bootstrap CSS
│   ├── index.tsx             # Main listing page (SSR + search + pagination)
│   └── product/
│       └── [id].tsx          # Dynamic product details page (SSR)
├── types/
│   └── product.ts            # TypeScript interface for a Product
├── __tests__/
│   └── ProductCard.test.tsx  # Unit tests
├── styles/
│   └── globals.css
└── README.md
```

## Setup Instructions

1. **Clone the repo / unzip the folder**
   ```bash
   cd product-listing-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser.

4. **Run unit tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Assumptions Made

- Since fakestoreapi.com does not support server-side search/pagination, filtering and pagination are implemented on the **client side** after the initial SSR fetch (the requirement explicitly mentioned client-side filtering).
- A short artificial delay (300ms) is added when searching/filtering just to demonstrate the loading spinner, since the Fake Store API itself returns data almost instantly.
- Pagination size is set to 8 products per page; this can be changed via the `ITEMS_PER_PAGE` constant in `pages/index.tsx`.
- Used Bootstrap's npm package (v5) imported directly into `_app.tsx`, instead of a CDN link tag, for better Next.js integration.

## Live Demo

(Add your Vercel/Netlify link here after deploying, e.g. `vercel deploy`)

## Author

Built as part of a frontend assignment task.
