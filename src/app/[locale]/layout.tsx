import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { I18nProviderClient } from '@/lib/i18n/client';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'PathFinder AI',
  description: 'PathFinder AI - Your personalized career & education advisor.',
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <I18nProviderClient locale={locale}>
            {children}
            <Toaster />
        </I18nProviderClient>
      </body>
    </html>
  );
}
