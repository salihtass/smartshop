# SpendSmart App Documentation

## Overview

SpendSmart is a Progressive Web App (PWA) designed to help users track their spending, scan receipts, find deals, and analyze their purchasing habits. The app provides a user-friendly interface for managing personal finances and finding the best deals on products.

## Table of Contents

1. [Architecture](#architecture)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage Guide](#usage-guide)
5. [Technical Implementation](#technical-implementation)
6. [Deployment](#deployment)
7. [Google Play Store Publication](#google-play-store-publication)

## Architecture

SpendSmart is built using the following technologies:

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Cloudflare D1 (via Cloudflare Workers)
- **PWA Features**: Service Worker (Workbox), Web App Manifest

The application follows a component-based architecture with the following structure:

```
spendsmartapp/
├── public/                 # Static assets
│   ├── icons/              # App icons in various sizes
│   ├── manifest.json       # Web App Manifest
│   ├── app.webmanifest     # Enhanced manifest for app stores
│   ├── sw-register.js      # Service Worker registration
│   └── install.js          # App installation handler
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (pages)/        # Application pages
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Root page
│   ├── components/         # React components
│   │   ├── features/       # Feature-specific components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Utility functions
│   │   ├── database.ts     # Database operations
│   │   └── store.ts        # Zustand store
│   └── hooks/              # Custom React hooks
├── migrations/             # Database migrations
└── wrangler.toml           # Cloudflare Workers configuration
```

## Features

### 1. Home Screen
- Displays top 5 consumed products
- Shows upcoming discounts and offers
- Quick access to all app features

### 2. Receipt Scanner
- Camera interface for scanning receipts
- Automatic extraction of purchase data
- Updates spending records in the database

### 3. Barcode Scanner
- Camera interface for scanning product barcodes
- Retrieves product information and price
- Shows available discounts for the product

### 4. Offers
- Lists available discounts and promotions
- Filtering by category
- Search functionality
- Option to save offers for later

### 5. Spending Analysis
- Pie chart visualization of spending by category
- List of top spending products
- Total spending calculation

### 6. Profile and Settings
- User information management
- Notification preferences
- Daily spending limit configuration
- Language selection (English/German)

## Installation

### As a Progressive Web App

1. Visit the app URL in a modern browser
2. The browser will show an "Install" option in the address bar or menu
3. Click "Install" and follow the prompts
4. The app will be installed on your device and available offline

### From Google Play Store

1. Search for "SpendSmart" in the Google Play Store
2. Click "Install"
3. The app will be installed on your device

## Usage Guide

### Scanning Receipts

1. Navigate to the Receipt Scanner page
2. Point your camera at a receipt
3. Click the "Scan Receipt" button
4. The app will process the receipt and update your spending data

### Scanning Barcodes

1. Navigate to the Barcode Scanner page
2. Point your camera at a product barcode
3. Click the "Scan Product" button
4. The app will display product information and available discounts

### Viewing Spending Analysis

1. Navigate to the Spending page
2. View the pie chart showing spending by category
3. Scroll down to see your top spending products

### Finding Offers

1. Navigate to the Offers page
2. Use the category filter to narrow down offers
3. Use the search bar to find specific products
4. Click "Save" on any offer to save it for later

### Managing Profile

1. Navigate to the Profile page
2. Toggle notifications on/off
3. Set your daily spending limit
4. Select your preferred language

## Technical Implementation

### State Management

The app uses Zustand for state management. The main store is defined in `src/lib/store.ts` and includes:

- User data
- Spending records
- Product information
- Offers and discounts

### Database Integration

The app uses Cloudflare D1 for data storage:

- Database schema is defined in `migrations/0001_initial.sql`
- Database operations are implemented in `src/lib/database.ts`
- API routes in `src/app/api/data/route.ts` provide endpoints for data access

### PWA Implementation

The app is configured as a Progressive Web App with:

- Service Worker using Workbox for offline functionality
- Web App Manifest for installability
- Installation prompt handling

## Deployment

### Production Build

To create a production build:

```bash
npm run build
```

This generates optimized static files in the `.next` directory.

### Deployment to Cloudflare Pages

The app can be deployed to Cloudflare Pages:

1. Configure Cloudflare Pages to use the repository
2. Set the build command to `npm run build`
3. Set the output directory to `.next`

### Local Development

To run the app locally:

```bash
npm run dev
```

This starts a development server at http://localhost:3000.

## Google Play Store Publication

To publish the app to Google Play Store:

1. Create a Google Play Developer account
2. Use the information in `play-store-materials.md` to fill out the store listing
3. Upload the app icon from `public/icons/android/icon-playstore.png`
4. Create and upload screenshots of the app
5. Use Bubblewrap or PWA Builder to package the PWA as an Android app
6. Upload the generated APK or Android App Bundle
7. Submit for review

For detailed instructions on packaging a PWA for Google Play Store, refer to:
https://developer.chrome.com/docs/android/trusted-web-activity/
