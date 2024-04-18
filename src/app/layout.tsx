import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import React from 'react';
import './globals.scss';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Blog',
  description: 'Next.js Blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
