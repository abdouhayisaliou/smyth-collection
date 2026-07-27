import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata = {
  title: "Smyth Collection",

  description: "Luxury Fashion",

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Smyth Collection",
  },

  icons: {
    icon: "/favicon.ico",

    apple: "/icons/apple-touch-icon.png",
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