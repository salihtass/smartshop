# SpendSmart App - README

## Overview

SpendSmart is a mobile application designed to help users track their spending, scan receipts, find deals, and analyze their purchasing habits. This Progressive Web App (PWA) provides a user-friendly interface for managing personal finances and finding the best deals on products.

## Features

- **Receipt Scanning**: Scan receipts to automatically track purchases
- **Barcode Scanning**: Scan product barcodes to check prices and deals
- **Spending Analysis**: View spending breakdown by category with visual charts
- **Personalized Offers**: Discover deals based on your shopping habits
- **Offline Support**: Use the app even without an internet connection
- **Multi-language Support**: Available in English and German

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Cloudflare D1
- **PWA Features**: Service Worker (Workbox)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/spendsmartapp.git
cd spendsmartapp
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Deployment

The app can be deployed as:

1. A standard web application
2. A Progressive Web App (PWA)
3. A Google Play Store application (using PWA packaging tools)

For detailed deployment instructions, see the [documentation](./documentation.md).

## Google Play Store Publication

For information on publishing to Google Play Store, refer to the [Play Store Materials](./play-store-materials.md) document.

## Project Structure

```
spendsmartapp/
├── public/                 # Static assets
│   ├── icons/              # App icons in various sizes
│   ├── manifest.json       # Web App Manifest
│   └── app.webmanifest     # Enhanced manifest for app stores
├── src/
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   └── hooks/              # Custom React hooks
├── migrations/             # Database migrations
└── wrangler.toml           # Cloudflare Workers configuration
```

## Documentation

For detailed documentation, see the [documentation](./documentation.md) file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
