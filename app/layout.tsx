import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smyth-collection.com"),

  title: {
    default: "Smyth Collection | Mode élégante et raffinée",
    template: "%s | Smyth Collection",
  },

  description:
    "Smyth Collection est une boutique de mode élégante et raffinée proposant des abayas, laces, bazins, sacs, chaussures et accessoires.",

  applicationName: "Smyth Collection",

  alternates: {
    canonical: "https://www.smyth-collection.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.smyth-collection.com",
    siteName: "Smyth Collection",
    title: "Smyth Collection | Mode élégante et raffinée",
    description:
      "Découvrez Smyth Collection : abayas, laces, bazins, sacs, chaussures et accessoires sélectionnés avec soin.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Smyth Collection | Mode élégante et raffinée",
    description:
      "Découvrez Smyth Collection : abayas, laces, bazins, sacs, chaussures et accessoires.",
  },

  icons: {
    icon: [
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],

    apple: [
      {
        url: "/icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#120b07",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
