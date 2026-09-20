import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://smyth-collection.com"),

  title: {
    default: "Smyth Collection | Mode élégante et raffinée",
    template: "%s | Smyth Collection",
  },

  description:
    "Smyth Collection propose une sélection de mode élégante et raffinée : abayas, laces, bazins, sacs et chaussures.",

  applicationName: "Smyth Collection",

  alternates: {
    canonical: "https://smyth-collection.com",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://smyth-collection.com",
    siteName: "Smyth Collection",
    title: "Smyth Collection | Mode élégante et raffinée",
    description:
      "Découvrez Smyth Collection : abayas, laces, bazins, sacs et chaussures sélectionnés avec soin.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Smyth Collection | Mode élégante et raffinée",
    description:
      "Découvrez notre sélection de mode élégante et raffinée.",
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
