# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 14 e-commerce application built with TypeScript and Tailwind CSS, integrated with BigCommerce as the headless CMS.

### Key Architecture Components

**BigCommerce Integration (`lib/bigcommerce/`)**
- GraphQL-based API integration with BigCommerce Storefront API
- Core file: `lib/bigcommerce/index.ts` - Contains all BigCommerce operations (products, cart, categories)
- Authentication via `BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN`
- Data mapping between BigCommerce and Vercel commerce format in `mappers.ts`

**App Router Structure (`app/`)**
- Next.js 13+ App Router with nested layouts
- Category pages: `app/categories/[category]/` with dynamic product pages
- API routes: `app/api/` for server-side operations

**Components (`components/`)**
- Layout components in `components/layout/` (navbar, footer)
- Product components in `components/product/` (gallery, description, variant selector)
- Cart components in `components/cart/` with state management

**Custom Assets & Images**
- Product note images stored in `public/notas/` and mapped in `lib/nota-images.ts`
- Custom image mapping system for perfume notes with special character handling
- Assets folder contains brand-specific images and icons

### Environment Configuration

Required environment variables:
- `BIGCOMMERCE_STORE_HASH` - Store identifier
- `BIGCOMMERCE_CHANNEL_ID` - Sales channel
- `BIGCOMMERCE_CUSTOMER_IMPERSONATION_TOKEN` - API authentication
- `NEXT_PUBLIC_VERCEL_URL` - Deployment URL
- `SITE_NAME` - Site title

### Styling & Fonts

- Tailwind CSS with custom breakpoints and colors
- Multiple Google Fonts: Julius Sans One, Raleway, Charm, Judson, Urbanist
- Custom color palette defined in tailwind.config.ts (c1: #4E014F, c2: #50297a, c3: #151515)

### Key Features

- Server-side rendered product catalog
- Shopping cart with BigCommerce integration
- Dynamic category and product pages
- Perfume note visualization system
- Mobile-responsive design with custom breakpoints