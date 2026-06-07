import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ron's S A Landscape — Landscaping & Lawn Care in San Antonio, TX",
  description:
    "Ron's S A Landscape LLC — San Antonio landscaping & lawn care. Recurring maintenance, landscape installs, hardscape, irrigation, and seasonal cleanups. Call (210) 668-4924.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
