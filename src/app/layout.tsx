import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Golf Passport",
  description: "Track the golf courses you've played",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ background: '#f0f0f0', margin: 0, padding: 0 }}>
        <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: '#f2f4f0' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
