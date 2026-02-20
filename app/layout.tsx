import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pizzeria Messina - Autentisk Italiensk Pizza i Tyresö sedan 1980",
  description:
    "Gott, färskt och smarrigt! Pizzeria Messina serverar autentisk italiensk pizza med kärlek i hjärtat av Tyresö. Beställ online eller besök oss på Trollbäcksvägen 34A.",
  keywords: [
    "pizzeria",
    "tyresö",
    "italiensk mat",
    "pizza",
    "kebab",
    "pasta",
    "messina",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full font-body antialiased">{children}</body>
    </html>
  );
}
