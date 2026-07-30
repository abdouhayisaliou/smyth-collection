export type ProductPrice = {
  quantity: number;
  price: string;
};

export type Product = {
  id: string;
  name: string;
  categorySlugs: string[];
  images: string[];
  sizes: string[];
  pricing: ProductPrice[];
  status: "Disponible immédiatement" | "Disponible sur commande";
  description?: string;
};

export const products: Product[] = [
  {
    id: "pashmina-kaftan-abaya",
    name: "Pashmina ou Kaftan Abaya",
    categorySlugs: ["abayas"],
    images: [
      "/images/categories/Pashmina/Abaya8.JPG",
      "/images/categories/Pashmina/Abaya9.JPG",
      "/images/categories/Pashmina/Abaya5.JPG",
      "/images/categories/Pashmina/Abaya10.JPG",
      "/images/categories/Pashmina/Abaya7.JPG",
    ],
    sizes: ["52", "54", "56", "58", "60", "62"],
    pricing: [
      { quantity: 3, price: "69,99 €" },
      { quantity: 2, price: "59,99 €" },
    ],
    status: "Disponible immédiatement",
    description: "Abaya kaftan élégante et raffinée.",
  },
{
  id: "luxury-abaya",
  name: "Luxury Abaya",
  categorySlugs: ["abayas"],
  images: [
    "/images/categories/Luxury-abaya/lux1.JPG",
    "/images/categories/Luxury-abaya/lux2.JPG",
    "/images/categories/Luxury-abaya/lux3.JPG",
    "/images/categories/Luxury-abaya/lux4.JPG",
    "/images/categories/Luxury-abaya/lux5.JPG",
    "/images/categories/Luxury-abaya/lux6.JPG",
    "/images/categories/Luxury-abaya/lux7.JPG",
    "/images/categories/Luxury-abaya/lux8.JPG",


  ],
  sizes: ["52", "54", "56", "58", "60", "62"],
  pricing: [
    { quantity: 1, price: "139,99 €" },
  ],
  status: "Disponible immédiatement",
  description:
    "Une Abaya d’exception pour vos plus beaux événements.",
},
  {
    id: "autriche-applique-lace",
    name: "Autriche Applique Lace",
    categorySlugs: ["laces"],
    images: [
      "/images/categories/Autriche/aut1.MP4",
      "/images/categories/Autriche/aut2.JPG",
      "/images/categories/Autriche/aut2.MP4",
      "/images/categories/Autriche/aut1.JPG",
      "/images/categories/Autriche/aut3.MP4",
    ],
    sizes: [],
    pricing: [{ quantity: 1, price: "349,99 €" }],
    status: "Disponible immédiatement",
    description:
      "Autriche Lace pour une allure élégante et raffinée.",
  },

  {
    id: "dubai-lace-blanc-pierres-originaux",
    name: "Dubai Lace Blanc",
    categorySlugs: ["laces"],
    images: [
      "/images/categories/Dubai/25 B/dub1.MP4",
      "/images/categories/Dubai/25 B/dub2.MP4",
      "/images/categories/Dubai/25 B/dub3.MP4",
      "/images/categories/Dubai/25 B/dub4.MP4",
      "/images/categories/Dubai/25 B/dub5.MP4",
      "/images/categories/Dubai/25 B/dub6.MP4",
    ],
    sizes: [],
    pricing: [{ quantity: 1, price: "249,99 €" }],
    status: "Disponible immédiatement",
    description:
      "Dubai Lace blanc orné de pierres originales, pour une allure élégante et raffinée.",
  },

  {
    id: "dubai-lace-130-euros",
    name: "Dubai Lace",
    categorySlugs: ["laces"],
    images: [
      "/images/categories/Dubai/13/dub131.MP4",
      "/images/categories/Dubai/13/dub132.MP4",
    ],
    sizes: [],
    pricing: [{ quantity: 1, price: "129,99 €" }],
    status: "Disponible sur commande",
    description:
      "Dubai Lace élégant, sélectionné pour une tenue raffinée.",
  },

  {
    id: "exclusive-autriche-applique-brode-metallic-chemical-border",
    name: "Exclusive Autriche Appliqué Brodé",
    categorySlugs: ["laces"],
    images: [
      "/images/categories/Autriche/exlu/ex1.JPG",
      "/images/categories/Autriche/exlu/ex2.JPG",
      "/images/categories/Autriche/exlu/ex3.JPG",
      "/images/categories/Autriche/exlu/ex4.JPG",
    ],
    sizes: [],
    pricing: [{ quantity: 1, price: "379,99 €" }],
    status: "Disponible sur commande",
    description:
      "Exclusive Autriche Appliqué Lace brodé, avec bordure métallique chimique pour une finition prestigieuse et raffinée.",
  },

  {
    id: "dubai-lace-250-euros",
    name: "Dubai Lace",
    categorySlugs: ["laces"],
    images: [
      "/images/categories/Dubai/25/dub251.MP4",
      "/images/categories/Dubai/25/dub252.MP4",
      "/images/categories/Dubai/25/dub253.MP4",
      "/images/categories/Dubai/25/dub254.MP4",
    ],
    sizes: ["52", "54", "56", "58", "60", "62"],
    pricing: [{ quantity: 1, price: "249,99 €" }],
    status: "Disponible sur commande",
    description:
      "Lace haut de gamme, sélectionné pour une allure élégante et raffinée.",
  },

  {
    id: "bazin-getzner-perlage-4m",
    name: "Bazin Getzner Perlage",
    categorySlugs: ["bazins"],
    images: [
      "/images/categories/Bazin/getzner-perlage/b1.MP4",
      "/images/categories/Bazin/getzner-perlage/b2.MP4",
      "/images/categories/Bazin/getzner-perlage/b3.MP4",
      "/images/categories/Bazin/getzner-perlage/b4.MP4",
    ],
    sizes: ["4 m"],
    pricing: [{ quantity: 1, price: "199,99 €" }],
    status: "Disponible sur commande",
    description:
      "4 mètres : 3 mètres pour le boubou et 1 mètre pour le foulard.",
  },

  {
    id: "ensemble-sac-chaussures-made-in-italie-450",
    name: "Ensemble Sac & Chaussures",
    categorySlugs: ["sacs", "chaussures"],
    images: [
      "/images/categories/sac-chaussure/sac-chau2.JPG",
      "/images/categories/sac-chaussure/sac-chau3.JPG",
      "/images/categories/sac-chaussure/sac-chau4.JPG",
      "/images/categories/sac-chaussure/sac-chau1.JPG",
    ],
    sizes: [],
    pricing: [{ quantity: 1, price: "449,99 €" }],
    status: "Disponible immédiatement",
    description:
      "Ensemble élégant composé d’un sac et de chaussures assorties, Made in Italy.",
  },
];
