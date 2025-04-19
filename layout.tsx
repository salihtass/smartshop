import { Metadata, Viewport } from 'next';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'SpendSmart - Track Your Spending',
  description: 'Track your spending, scan receipts, and find the best deals with SpendSmart',
  applicationName: 'SpendSmart',
  appleWebApp: {
    capable: true,
    title: 'SpendSmart',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#3B82F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/android/icon-mdpi.png" />
        <link rel="apple-touch-icon" href="/icons/android/icon-xxxhdpi.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script src="/sw-register.js" defer></script>
        <script src="/install.js" defer></script>
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
