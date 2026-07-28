"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";import {
  ArrowLeft,
  Heart,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

import { products } from "@/data/products";
import ProductMediaGallery from "@/components/ProductMediaGallery";

const categories = {
  abayas: {
    name: "Abayas",
    description:
      "Découvrez notre sélection d’abayas élégantes et soigneusement choisies.",
    background: "/images/categories/Pashmina/Abaya1.jpeg",
  },

  laces: {
    name: "Laces",
    description:
      "Des laces raffinés aux détails prestigieux pour vos plus belles occasions.",
    background: "/images/categories/Autriche/aut1.JPG",
  },

  boubous: {
    name: "Boubous",
    description:
      "Des pièces élégantes associant présence, confort et finitions soignées.",
    background: "/images/categories/Boubou/boubou1.JPG",
  },

  bazins: {
    name: "Bazins",
    description:
      "Des bazins sélectionnés pour la richesse de leurs matières et détails.",
    background: "/images/categories/Bazin/Ba1.JPG",
  },

  sacs: {
    name: "Sacs",
    description:
      "Des sacs raffinés pour compléter votre style avec distinction.",
    background: "/images/categories/sac-chaussure/sac1.JPG",
  },

  parfums: {
    name: "Parfums",
    description:
      "Découvrez des fragrances sélectionnées avec attention.",
    background: "/images/categories/parfum/parfum1.png",
  },

  voiles: {
    name: "Voiles",
    description:
      "Des voiles élégants dans différentes matières et différentes teintes.",
    background: "/images/categories/voiles/voile.png",
  },

  chaussures: {
    name: "Chaussures",
    description:
      "Des chaussures choisies pour associer élégance et finition.",
    background: "/images/categories/sac-chaussure/sac-chau1.JPG",
  },
} as const;

type CategorySlug = keyof typeof categories;

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [favorites, setFavorites] = useState<string[]>([]);

  if (!(slug in categories)) {
    notFound();
  }

  const categorySlug = slug as CategorySlug;
  const category = categories[categorySlug];

  const categoryProducts = products.filter((product) =>
    product.categorySlugs.includes(categorySlug),
  );

  useEffect(() => {
  const savedFavorites = localStorage.getItem("smyth-favorites");

  if (!savedFavorites) {
    return;
  }

  try {
    const parsedFavorites = JSON.parse(savedFavorites);

    if (Array.isArray(parsedFavorites)) {
      setFavorites(parsedFavorites);
    }
  } catch {
    localStorage.removeItem("smyth-favorites");
  }
}, []);

  const toggleFavorite = (productId: string) => {
  setFavorites((currentFavorites) => {
    const isAlreadyFavorite = currentFavorites.includes(productId);

    const updatedFavorites = isAlreadyFavorite
      ? currentFavorites.filter((id) => id !== productId)
      : [...currentFavorites, productId];

    localStorage.setItem(
      "smyth-favorites",
      JSON.stringify(updatedFavorites),
    );

    return updatedFavorites;
  });
};
  
  return (
    <main className="min-h-screen bg-[#0b0704] text-white">
      {/* En-tête de la catégorie */}
      <section className="relative min-h-[470px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${category.background}')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0704] via-transparent to-black/30" />

        <div className="relative z-10 mx-auto flex min-h-[470px] max-w-7xl flex-col justify-between px-5 py-8 md:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/#boutique"
              className="inline-flex items-center gap-2 border border-[#d4af37]/45 bg-black/30 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e5bd67] backdrop-blur transition hover:bg-[#d4af37] hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Link>

            <Link href="/" aria-label="Retour à l’accueil">
              <img
                src="/images/logo-smyth4.png"
                alt="Smyth Collection"
                className="h-24 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="max-w-3xl pb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#d4af37]">
              Smyth Collection
            </p>

            <h1 className="mt-5 font-serif text-5xl md:text-7xl">
              Collection{" "}
              <span className="text-[#d4af37]">
                {category.name}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Liste des produits */}
      <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.14),transparent_28%),linear-gradient(135deg,#080503_0%,#1b1009_52%,#080503_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">
                La sélection
              </p>

              <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                Tous les articles
              </h2>
            </div>

            <p className="shrink-0 text-sm text-white/60">
              {categoryProducts.length} article
              {categoryProducts.length > 1 ? "s" : ""}
            </p>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {categoryProducts.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden border border-[#d4af37]/30 bg-[#100a06] shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-2 hover:border-[#d4af37]"
                >
                  {/* Galerie du produit */}
                  <div className="relative">
                    <ProductMediaGallery
                      images={product.images}
                      productName={product.name}
                    />
                    {/* Favori */}
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`absolute right-3 top-3 z-40 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
                        favorites.includes(product.id)
                          ? "border-[#d4af37] bg-[#d4af37] text-black"
                          : "border-[#d4af37]/40 bg-black/55 text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                      }`}
                      aria-label={
                        favorites.includes(product.id)
                          ? `Retirer ${product.name} des favoris`
                          : `Ajouter ${product.name} aux favoris`
                      }
                      aria-pressed={favorites.includes(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Informations produit */}
                  <div className="p-4">
                    <h3 className="font-serif text-xl leading-6">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/55">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-4 border-t border-white/10 pt-4">
                      <div className="space-y-1">
                        {product.pricing.map((offer) => (
                          <p
                            key={`${product.id}-${offer.quantity}`}
                            className="text-sm font-semibold text-[#d4af37]"
                          >
                            {offer.quantity} pièce
                            {offer.quantity > 1 ? "s" : ""} :{" "}
                            {offer.price}
                          </p>
                        ))}
                      </div>

                      {product.sizes.length > 0 && (
                        <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-white/45">
                          Tailles : {product.sizes.join(" • ")}
                        </p>
                      )}

                      <p
                        className={`mt-2 text-[9px] font-medium uppercase tracking-[0.15em] ${
                          product.status === "Disponible sur commande"
                            ? "text-[#dfa948]"
                            : "text-[#8dc889]"
                        }`}
                      >
                        {product.status}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/4917623345700?text=${encodeURIComponent(
                        `Bonjour Smyth Collection, je souhaite avoir des informations sur : ${product.name}`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 flex items-center justify-center gap-2 border border-[#d4af37]/50 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Commander
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-[#d4af37]/30 bg-black/25 px-6 py-20 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-[#d4af37]/60" />

              <h2 className="mt-5 font-serif text-3xl">
                Aucun article disponible
              </h2>

              <p className="mt-3 text-sm text-white/60">
                Les prochains articles seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
