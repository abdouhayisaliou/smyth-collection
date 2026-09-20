import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smyth Collection",
    short_name: "Smyth",
    description: "Mode élégante et raffinée pour hommes et femmes.",

    start_url: "/",
    scope: "/",

    display: "standalone",

    background_color: "#F8F4EC",
    theme_color: "#F8F4EC",

    icons: [
      {
        src: "/icon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
