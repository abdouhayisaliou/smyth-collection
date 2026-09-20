import type { Metadata } from "next";
import { products } from "@/data/products";

const categorySEO = {
  abayas: {
    title: "Abayas élégantes",
    description:
      "Découvrez la sélection Smyth Collection d’abayas élégantes et raffinées, disponibles en plusieurs tailles.",
  },

  laces: {
    title: "Laces raffinés",
    description:
      "Découvrez les laces raffinés de Smyth Collection, sélectionnés pour vos événements et occasions spéciales.",
  },

  boubous: {
    title: "Boubous élégants",
    description:
      "Découvrez la sélection de boubous élégants et raffinés de Smyth Collection.",
  },

  bazins: {
    title: "Bazins élégants",
    description:
      "Découvrez les bazins sélectionnés par Smyth Collection pour vos tenues élégantes et vos grandes occasions.",
  },

  sacs: {
    title: "Sacs élégants",
    description:
      "Découvrez la sélection de sacs élégants et raffinés de Smyth Collection.",
  },

  parfums: {
    title: "Parfums",
    description:
      "Découvrez la sélection de parfums de Smyth Collection, choisis avec attention.",
  },

  voiles: {
    title: "Voiles élégants",
    description:
      "Découvrez les voiles Smyth Collection disponibles dans différentes matières et teintes.",
  },

  chaussures: {
    title: "Chaussures élégantes",
    description:
      "Découvrez la sélection de chaussures Smyth Collection associant élégance et finition.",
  },
} as const;

type CategorySlug = keyof typeof categorySEO;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const category = categorySEO[slug as CategorySlug];

  if (!category) {
    return {
      title: "Boutique",
      description:
        "Découvrez les collections de mode de Smyth Collection.",
    };
  }

  return {
    title: category.title,
    description: category.description,

    alternates: {
      canonical: `https://www.smyth-collection.com/boutique/${slug}`,
    },

    openGraph: {
      title: `${category.title} | Smyth Collection`,
      description: category.description,
      url: `https://www.smyth-collection.com/boutique/${slug}`,
      siteName: "Smyth Collection",
      type: "website",
      locale: "fr_FR",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
