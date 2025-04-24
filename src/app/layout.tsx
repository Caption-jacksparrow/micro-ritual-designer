'use client';

import { useEffect } from 'react';
import AppInitializer from '@/components/rituals/AppInitializer';
import NotificationSystem from '@/components/rituals/NotificationSystem';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <NotificationSystem />
          <AppInitializer />
        </div>
      </body>
    </html>
  );
}
