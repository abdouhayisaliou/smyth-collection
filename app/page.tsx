
"use client";

import Image from "next/image";
import BackToTop from "@/components/BackToTop";
import InstallButton from "@/components/InstallButton";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { products } from "@/data/products";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Crown,
  MessageCircle,
  Flower2,
  Gem,
  Handbag,
  Shirt,
  Sparkles,
  Footprints,
  Scissors,
  ChevronLeft,
  ChevronRight,
  Mail,
  Send,
  Image as ImageIcon,

} from "lucide-react";

const slides = [
  { type: "image", src: "/images/categories/Pashmina/Abaya8.JPG" },
  { type: "video", src: "/videos/hero.MP4" },
  { type: "image", src: "/images/categories/Luxury-abaya/lux1.JPG" },
  { type: "video", src: "/videos/hero2.MP4" },
  { type: "image", src: "/images/categories/Pashmina/Abaya10.JPG" },
  { type: "video", src: "/videos/hero3.MP4" },
  { type: "image", src: "/images/categories/Pashmina/Abaya9.JPG" },
  { type: "video", src: "/videos/hero4.MP4" },
  { type: "image", src: "/images/categories/Luxury-abaya/lux4.JPG" },
  { type: "video", src: "/videos/hero5.MP4" },
  { type: "image", src: "/images/categories/Bazin/Ba1.JPG" },
  { type: "video", src: "/videos/hero6.MP4" },
  { type: "image", src: "/images/categories/Luxury-abaya/lux2.JPG" },

];

const categories = [
  {
    name: "Abayas",
    slug: "abayas",
    image: "/images/categories/Pashmina/Abaya1.jpeg",
    icon: Shirt,
  },
  {
    name: "Laces",
    slug: "laces",
    image: "/images/categories/Autriche/aut1.JPG",
    icon: Scissors,
  },
  {
    name: "Boubous",
    slug: "boubous",
    image: "/images/categories/Boubou/boubou1.JPG",
    icon: Shirt,
  },
  {
    name: "Bazins",
    slug: "bazins",
    image: "/images/categories/Bazin/Ba1.JPG",
    icon: Gem,
  },
  {
    name: "Sacs",
    slug: "sacs",
    image: "/images/categories/sac-chaussure/sac1.JPG",
    icon: Handbag,
  },
  {
    name: "Parfums",
    slug: "parfums",
    image: "/images/categories/parfum/parfum1.png",
    icon: Sparkles,
  },
  {
    name: "Voiles",
    slug: "voiles",
    image: "/images/categories/voiles/voile.png",
    icon: Flower2,
  },
  {
    name: "Chaussures",
    slug: "chaussures",
    image: "/images/categories/sac-chaussure/sac-chau1.JPG",
    icon: Footprints,
  },
];


export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productSlides, setProductSlides] = useState<Record<string, number>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fullscreenMedia, setFullscreenMedia] = useState<string[]>([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [fullscreenProductName, setFullscreenProductName] = useState("");
  const openFullscreenGallery = (
  media: string[],
  selectedIndex: number,
  productName: string
) => {
  setFullscreenMedia(media);
  setFullscreenIndex(selectedIndex);
  setFullscreenProductName(productName);
};
  const closeFullscreenGallery = () => {
  setFullscreenMedia([]);
  setFullscreenIndex(0);
  setFullscreenProductName("");
};
  const closeSearch = () => {
  setIsSearchOpen(false);
  setSearchTerm("");
};

const showPreviousFullscreenMedia = () => {
  setFullscreenIndex((previousIndex) =>
    previousIndex === 0
      ? fullscreenMedia.length - 1
      : previousIndex - 1
  );
};

const showNextFullscreenMedia = () => {
  setFullscreenIndex((previousIndex) =>
    previousIndex === fullscreenMedia.length - 1
      ? 0
      : previousIndex + 1
  );
};
  useEffect(() => {
  const savedFavorites = localStorage.getItem("smyth-favorites");

  if (savedFavorites) {
    try {
      setFavorites(JSON.parse(savedFavorites));
    } catch {
      localStorage.removeItem("smyth-favorites");
    }
  }
},
            useEffect(() => {
  if (isSearchOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [isSearchOpen]);
  

 const toggleFavorite = (productId: string) => {
  setFavorites((currentFavorites) => {
    const isAlreadyFavorite = currentFavorites.includes(productId);

    const updatedFavorites = isAlreadyFavorite
      ? currentFavorites.filter((id) => id !== productId)
      : [...currentFavorites, productId];

    localStorage.setItem(
      "smyth-favorites",
      JSON.stringify(updatedFavorites)
    );
    
    return updatedFavorites;
  });
};
  
 useEffect(() => {
  if (fullscreenMedia.length > 0) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [fullscreenMedia]);

useEffect(() => {
  const handleFullscreenKeyboard = (event: KeyboardEvent) => {
    if (fullscreenMedia.length === 0) {
      return;
    }

    if (event.key === "Escape") {
      closeFullscreenGallery();
    }

    if (event.key === "ArrowLeft") {
      setFullscreenIndex((previousIndex) =>
        previousIndex === 0
          ? fullscreenMedia.length - 1
          : previousIndex - 1
      );
    }

    if (event.key === "ArrowRight") {
      setFullscreenIndex((previousIndex) =>
        previousIndex === fullscreenMedia.length - 1
          ? 0
          : previousIndex + 1
      );
    }
  };

  window.addEventListener("keydown", handleFullscreenKeyboard);
  return () => {
    window.removeEventListener("keydown", handleFullscreenKeyboard);
  };
}, [fullscreenMedia]);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 6000);

  return () => clearInterval(interval);
}, []);

const changeProductImage = (
  productId: string,
  direction: "next" | "prev"
) => {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  setProductSlides((prev) => {
    const current = prev[productId] || 0;
    const total = product.images.length;

    return {
      ...prev,
      [productId]:
        direction === "next"
          ? (current + 1) % total
          : (current - 1 + total) % total,
    };
  });
};

  const favoriteProducts = products.filter((product) =>
  favorites.includes(product.id),
);

const normalizedSearchTerm = searchTerm
  .toLowerCase()
  .trim()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

const searchWords = normalizedSearchTerm
  .split(/\s+/)
  .filter(Boolean);

const searchResults = products.filter((product) => {
  if (searchWords.length === 0) {
    return false;
  }

  const searchableContent = [
    product.name,
    product.description ?? "",
    product.status,
    product.categorySlugs.join(" "),
    product.sizes.map((size) => String(size)).join(" "),
    product.pricing
      .map(
        (offer) =>
          `${String(offer.quantity)} ${String(offer.price)}`
      )
      .join(" "),
  ]
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return searchWords.every((word) =>
    searchableContent.includes(word)
  );
});

return (
    <main className="min-h-screen bg-[#0d0c0b] text-white">
      <section className="relative min-h-screen overflow-hidden">
  {/* Slides du hero */}
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      {slide.type === "image" ? (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${slide.src}')` }}
        />
      ) : (
        <video
          className="h-full w-full object-cover"
          src={slide.src}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
    </div>
  ))}

  {/* Assombrissement du fond */}
  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/15" />
  <div className="absolute inset-0 bg-black/20" />

  {/* Header original */}
  <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-7">
    <a
      href="#accueil"
      aria-label="Retour à l’accueil"
      className="flex items-center"
    >
      <img
        src="/images/logo-smyth4.png"
        alt="Logo Smyth Collection"
        className="h-28 w-auto object-contain md:h-40"
      />
    </a>

    <nav className="hidden items-center gap-7 text-[11px] font-medium uppercase tracking-wide text-white/90 lg:flex">
      <a href="#accueil" className="border-b border-[#d4af37] pb-2">
        Accueil
      </a>

      <a href="#boutique" className="transition hover:text-[#d4af37]">
        Boutique
      </a>

      <a href="#nouveautes" className="transition hover:text-[#d4af37]">
        Nouveautés
      </a>

      <a href="#collections" className="transition hover:text-[#d4af37]">
        Collections
      </a>

      <a href="#apropos" className="transition hover:text-[#d4af37]">
        À propos
      </a>

      <a href="#temoignages" className="transition hover:text-[#d4af37]">
        Témoignages
      </a>

      <a href="#contact" className="transition hover:text-[#d4af37]">
        Contact
      </a>
    </nav>

<div className="flex items-center gap-1 text-white sm:gap-2 md:gap-4">
  {/* Recherche */}
  <button
    type="button"
    onClick={() => setIsSearchOpen(true)}
    className="flex h-9 w-9 items-center justify-center transition hover:text-[#d4af37]"
    aria-label="Rechercher"
  >
    <Search className="h-[18px] w-[18px] md:h-5 md:w-5" />
  </button>

  {/* Favoris */}
  <button
  type="button"
  onClick={() => setIsFavoritesOpen(true)}
  className="relative flex h-9 w-9 items-center justify-center transition hover:text-[#d4af37]"
  aria-label="Ouvrir les favoris"
>
  <Heart className="h-[18px] w-[18px] md:h-5 md:w-5" />

  {favorites.length > 0 && (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[10px] font-bold text-black">
      {favorites.length}
    </span>
  )}
</button>

  {/* Panier */}
  <button
    type="button"
    onClick={() => setIsCartOpen(true)}
    className="relative flex h-9 w-9 items-center justify-center transition hover:text-[#d4af37]"
    aria-label="Ouvrir le panier"
  >
    <ShoppingBag className="h-[18px] w-[18px] md:h-5 md:w-5" />
  </button>

  {/* Menu mobile */}
  <button
    type="button"
    onClick={() => setIsMenuOpen(true)}
    className="flex h-9 w-9 items-center justify-center transition hover:text-[#d4af37] lg:hidden"
    aria-label="Ouvrir le menu"
  >
    <Menu className="h-5 w-5" />
  </button>
</div>
  </header>

  {/* Menu mobile */}
  {isMenuOpen && (
    <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm lg:hidden">
      <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-[#d4af37]/40 bg-[#0d0906] p-6 shadow-2xl">
        <div className="mb-10 flex items-center justify-between">
          <img
            src="/images/logo-smyth4.png"
            alt="Logo Smyth Collection"
            className="h-20 w-auto object-contain"
          />

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl text-[#d4af37]"
            aria-label="Fermer le menu"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col gap-5 text-sm font-semibold uppercase tracking-[0.2em] text-white">
          {[
            ["Accueil", "#accueil"],
            ["Boutique", "#boutique"],
            ["Nouveautés", "#nouveautes"],
            ["Collections", "#collections"],
            ["À propos", "#apropos"],
            ["Témoignages", "#temoignages"],
            ["Contact", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-white/10 pb-4 transition hover:text-[#d4af37]"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/4917623345700"
          target="_blank"
          rel="noreferrer"
          className="mt-10 flex items-center justify-center gap-2 border border-[#d4af37] px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]"
        >
          <MessageCircle className="h-4 w-4" />
          Commander
        </a>
      </div>
    </div>
  )}

  {/* Contenu principal du hero */}
  <div
    id="accueil"
    className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-5 pb-28 pt-16 md:px-8 md:pb-32"
  >
    <div className="max-w-2xl">
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.35em] text-[#d4af37] md:text-sm">
        Luxury • Elegance • Style
      </p>

      <h1 className="font-serif text-5xl leading-[1.04] tracking-tight text-white md:text-7xl lg:text-8xl">
        L&apos;Élégance
        <br />
        qui <span className="text-[#d4af37]">vous</span> ressemble
      </h1>

      <p className="mt-6 max-w-md text-base leading-7 text-white/80 md:text-lg">
        Tenues islamiques et africaines haut de gamme pour hommes et femmes.
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <a
          href="#boutique"
          className="inline-flex items-center justify-center rounded-sm bg-[#d4af37] px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#16110a] transition hover:bg-[#ecc85e]"
        >
          Découvrir la collection
        </a>
        <InstallButton />
        <a
          href="https://wa.me/4917623345700"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#d4af37]/80 px-6 py-4 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#d4af37] hover:text-[#16110a]"
        >
          <MessageCircle className="h-4 w-4" />
          Commander sur WhatsApp
        </a>
      </div>
    </div>
  </div>

  {/* Indicateurs du slider */}
  <div className="absolute bottom-[245px] left-1/2 z-20 flex max-w-[85%] -translate-x-1/2 flex-wrap justify-center gap-2 sm:bottom-32">
    {slides.map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setCurrentSlide(index)}
        aria-label={`Afficher la slide ${index + 1}`}
        className={`h-1.5 rounded-full transition-all duration-300 ${
          index === currentSlide
            ? "w-7 bg-[#d4af37]"
            : "w-1.5 bg-white/55"
        }`}
      />
    ))}
  </div>

  {/* Bandeau des avantages */}
  <div className="relative z-10 border-t border-[#d4af37]/25 bg-[#11100e]/90 backdrop-blur-sm">
    <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-[#d4af37]/20 px-5 py-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
      <div className="flex items-center gap-4 py-3 sm:px-4">
        <Crown className="h-6 w-6 shrink-0 text-[#d4af37]" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide">
            Produits de qualité
          </p>

          <p className="mt-1 text-xs text-white/60">
            Sélectionnés avec soin
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 py-3 sm:px-4">
        <Truck className="h-6 w-6 shrink-0 text-[#d4af37]" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide">
            Livraison rapide
          </p>

          <p className="mt-1 text-xs text-white/60">
            Europe et Bénin
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 py-3 sm:px-4">
        <ShieldCheck className="h-6 w-6 shrink-0 text-[#d4af37]" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide">
            Commandes simplifiées
          </p>

          <p className="mt-1 text-xs text-white/60">
            Accompagnement WhatsApp
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      <section

        id="boutique"
        className="relative overflow-hidden bg-[#080604] px-5 py-20 text-white md:px-8 md:py-28"
      >
        <Reveal>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2f1d0c_0%,#120c07_42%,#050403_100%)]" />

        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/images/bg-luxury-texture1.png')" }}
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.45em] text-[#d4af37]">
              Smyth Collection
            </p>

            <div className="mx-auto mt-4 flex w-40 items-center gap-3">
              <span className="h-px flex-1 bg-[#d4af37]/60" />
              <span className="h-2 w-2 rotate-45 border border-[#d4af37]" />
              <span className="h-px flex-1 bg-[#d4af37]/60" />
            </div>

           <Reveal>
          <h2 className="mt-6 font-serif text-5xl leading-tight md:text-7xl">
            Catégories <span className="text-[#d4af37]">populaires</span>
          </h2>
        </Reveal>

            <p className="mx-auto mt-5 max-w-2xl font-serif text-lg leading-8 text-white/85 md:text-xl">
              Des pièces choisies avec soin pour sublimer votre élégance,
              <br className="" />
              en toutes occasions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
           {categories.map((category, index) => {
  const Icon = category.icon;

  return (
    <Reveal key={category.slug} delay={index * 0.08}>
      <Link
        href={`/boutique/${category.slug}`}
        className="group relative block overflow-hidden rounded-md border border-[#d4af37]/60 bg-[#110b06]/70 shadow-[0_18px_50px_rgba(0,0,0,0.55)] transition duration-500 hover:-translate-y-2 hover:border-[#f3ce70] hover:shadow-[0_28px_70px_rgba(212,175,55,0.18)]"
      >
        <div className="relative aspect-[1.08/1] overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#d4af37]/25 bg-black/65 px-3 pb-4 pt-8 text-center backdrop-blur-md md:px-5 md:pb-5">
            <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-[#d4af37] bg-[#130d08] shadow-[0_0_25px_rgba(212,175,55,0.22)]">
              <Icon
                className="h-5 w-5 text-[#d4af37]"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="font-serif text-2xl text-white md:text-3xl">
              {category.name}
            </h3>

            <p className="mt-1.5 text-[11px] font-medium text-[#d4af37] md:text-sm">
              Voir la sélection{" "}
              <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-[-30%] -left-[70%] z-30 w-[35%] rotate-[18deg] bg-gradient-to-r from-transparent via-[#f5d98a]/30 to-transparent opacity-0 blur-md transition-all duration-1000 ease-out group-hover:left-[135%] group-hover:opacity-100" />
      </Link>
    </Reveal>
  );
})}
          </div>
        </div>
        </Reveal>
      </section>

      <section
     
        id="nouveautes"
        className="relative overflow-hidden bg-[#070604] px-5 py-24 text-white md:px-8 md:py-28"
      >
         <Reveal>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/bg-luxury-texture.png')" }}
        />

        <div className="absolute inset-0 bg-[#090604]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090604]/35 via-transparent to-[#090604]/70" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.45em] text-[#d4af37]">
              Smyth Collection
            </p>

            <h2 className="mt-5 font-serif text-5xl md:text-7xl">
              Nouveautés <span className="text-[#d4af37]">premium</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75">
              Les dernières pièces ajoutées à la collection, avec plusieurs
              visuels pour mieux apprécier les détails, les couleurs et les
              finitions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product, index) => {
            const currentImage = productSlides[product.id] || 0;
              return (
                <Reveal
              key={product.id}
              delay={index * 0.08}
            >
              <article
                  key={product.id}
                  className="group overflow-hidden rounded-sm border border-[#d4af37]/35 bg-[#0d0906] shadow-[0_12px_35px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-[0_20px_45px_rgba(212,175,55,0.14)]"
                >
                  <div className="relative aspect-[1/1] overflow-hidden">
              {product.images[currentImage].toLowerCase().endsWith(".mp4") ? (
               <video
                    src={product.images[currentImage]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onClick={() =>
                      openFullscreenGallery(
                        product.images,
                        currentImage,
                        product.name
                      )
                    }
                    className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
                  />
              ) : (
                <Image
                  src={product.images[currentImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  onClick={() =>
                    openFullscreenGallery(
                      product.images,
                      currentImage,
                      product.name
                    )
                  }
                  className="cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
                />
              )}

<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

  <span className="absolute left-3 top-3 z-30 border border-[#d4af37]/60 bg-[#0b0805]/75 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur">
                      {product.categorySlugs
  .map((category) => {
    const labels: Record<string, string> = {
      abayas: "Abayas",
      laces: "Laces",
      boubous: "Boubous",
      bazins: "Bazins",
      sacs: "Sacs",
      parfums: "Parfums",
      voiles: "Voiles",
      chaussures: "Chaussures",
    };

    return labels[category] ?? category;
  })
  .join(" • ")}
                    </span>

                    <button
                      type="button"
                      onClick={(event) => {
                      event.stopPropagation();
                      changeProductImage(product.id, "prev");
                    }}
                      className="absolute left-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/50 text-white/90 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:border-[#d4af37] hover:text-[#d4af37]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  changeProductImage(product.id, "next");
                }}                      
                   className="absolute right-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/50 text-white/90 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:border-[#d4af37] hover:text-[#d4af37]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(event) => {
                              event.stopPropagation();
                            
                              setProductSlides((prev) => ({
                                ...prev,
                                [product.id]: index,
                              }));
                            }}
                          className={`h-1 rounded-full transition-all ${
                            index === currentImage
                              ? "w-5 bg-[#d4af37]"
                              : "w-1.5 bg-white/55"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[#d4af37]/20 px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d4af37]">
                          Nouvelle pièce
                        </p>

                        <h3 className="mt-1 font-serif text-xl leading-6 text-white">
                          {product.name}
                        </h3>
                        {product.description && (
                            <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/65">
                              {product.description}
                            </p>
                          )}
                      </div>

                      <button
  type="button"
  onClick={(event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(product.id);
  }}
className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
    aria-label={
    favorites.includes(product.id)
      ? "Retirer des favoris"
      : "Ajouter aux favoris"
  }
>
  <Heart
    className={`h-5 w-5 transition ${
      favorites.includes(product.id)
        ? "fill-[#d4af37] text-[#d4af37]"
        : "text-white"
    }`}
  />
</button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                      <div>
                        <div className="space-y-1">
                          {product.pricing.map((offer) => (
                            <p
                              key={`${product.id}-${offer.quantity}`}
                              className="text-sm font-semibold text-[#d4af37]"
                            >
                              {offer.quantity} pièces : {offer.price}
                            </p>
                          ))}

                          <p className="pt-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
                            Tailles : {product.sizes.join(" • ")}
                          </p>
                        </div>

                        <p
                          className={`mt-1 text-[9px] font-medium uppercase tracking-wide ${
                            product.status === "Disponible sur commande"
                              ? "text-[#dfa948]"
                              : "text-[#8dc889]"
                          }`}
                        >
                          {product.status}
                        </p>
                      </div>

                      <a
                        href="https://wa.me/4917623345700"
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#d4af37]/70 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#0d0906]"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
                </Reveal>
              );
            })}
          </div>
        </div>
        </Reveal>
      </section>

      <section
  id="collections"
  className="relative overflow-hidden bg-[#0b0704] px-5 py-24 text-white md:px-8 md:py-32"
>
   <Reveal>
  <div
    className="absolute inset-0 bg-cover bg-center opacity-100"
    style={{ backgroundImage: "url('/images/collection-signature.png')" }}
  />

  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-black/10" />
<div className="absolute inset-0 bg-gradient-to-t from-[#0b0704]/70 via-transparent to-transparent" />

  <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#d4af37]">
        Collection Signature
      </p>

      <h2 className="mt-6 font-serif text-5xl leading-tight md:text-7xl">
        Une élégance pensée pour les grands moments
      </h2>

      <p className="mt-6 max-w-xl text-sm leading-8 text-white/75 md:text-base">
        Découvrez une sélection raffinée de tenues islamiques et africaines,
        choisies pour leur qualité, leur finition et leur présence.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href="#nouveautes"
          className="inline-flex items-center justify-center border border-[#d4af37] bg-[#d4af37] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black transition hover:bg-transparent hover:text-[#d4af37]"
        >
          Voir les nouveautés
        </a>

        <a
          href="https://wa.me/4917623345700"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
        >
          <MessageCircle className="h-4 w-4" />
          Demander conseil
        </a>
      </div>
    </div>

    <div className="relative hidden md:block">
      <div className="absolute -inset-6 border border-[#d4af37]/25" />
      <div className="relative border border-[#d4af37]/50 bg-black/30 p-4 backdrop-blur-sm">
        <img
          src="/images/collection-card.png"
          alt="Collection Smyth"
          className="h-[520px] w-full object-cover"
        />

        <div className="absolute bottom-8 left-8 right-8 border border-[#d4af37]/40 bg-black/65 p-6 backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">
            Premium Selection
          </p>
          <h3 className="mt-2 font-serif text-3xl">Smyth Collection</h3>
        </div>
      </div>
    </div>
  </div>
  </Reveal>
</section>

<section
  id="apropos"
  className="relative overflow-hidden bg-[#2a1b12] px-5 py-24 text-[#f8ead8] md:px-8 md:py-32"
>
   <Reveal>
  {/* Fond bronze profond, plus chaleureux que noir */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,175,55,0.22),transparent_28%),radial-gradient(circle_at_88%_78%,rgba(166,105,49,0.24),transparent_32%),linear-gradient(135deg,#1a100a_0%,#3b2618_48%,#24160f_100%)]" />

  <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
    <div className="relative">
      <div className="absolute -left-5 -top-5 h-32 w-32 border-l border-t border-[#d4af37]/55" />
      <div className="absolute -bottom-5 -right-5 h-32 w-32 border-b border-r border-[#d4af37]/55" />

      <div className="relative border border-[#d4af37]/40 bg-[#1b100a]/45 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur">
        <img
          src="/images/about-smyth.png"
          alt="Smyth Collection"
          className="h-[560px] w-full object-cover"
        />

        <div className="absolute bottom-8 left-8 right-8 border border-[#d4af37]/35 bg-[#160d08]/80 p-5 text-[#fff7ed] backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">
            Smyth Collection
          </p>
          <h3 className="mt-2 font-serif text-3xl">
            Élégance • Qualité • Raffinement
          </h3>
        </div>
      </div>
    </div>

    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#e2bd68]">
        Notre univers
      </p>

      <div className="mt-4 flex w-40 items-center gap-3">
        <span className="h-px flex-1 bg-[#d4af37]/65" />
        <span className="h-2 w-2 rotate-45 border border-[#d4af37]" />
        <span className="h-px flex-1 bg-[#d4af37]/65" />
      </div>

      <h2 className="mt-7 font-serif text-5xl leading-tight md:text-7xl">
        Le goût du beau, pensé avec{" "}
        <span className="text-[#e2bd68]">exigence</span>
      </h2>

      <p className="mt-7 max-w-2xl text-sm leading-8 text-[#f3ddc3]/85 md:text-base">
        Smyth Collection sélectionne des pièces élégantes, raffinées et
        soigneusement choisies pour sublimer chaque style avec distinction.
      </p>

      <p className="mt-4 max-w-2xl text-sm leading-8 text-[#ead0b1]/75 md:text-base">
        Chaque détail compte : la matière, la coupe, les finitions, les couleurs
        et l’expérience d’achat. L’objectif est simple : proposer une sélection
        qui inspire confiance, beauté et présence.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["01", "Sélection", "Des pièces choisies avec soin."],
          ["02", "Finition", "Une attention portée aux détails."],
          ["03", "Service", "Un accompagnement simple et humain."],
        ].map(([number, title, text]) => (
          <div
            key={title}
            className="border border-[#d4af37]/30 bg-[#4a2f1d]/35 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur transition hover:-translate-y-1 hover:border-[#d4af37] hover:bg-[#4f321e]/55"
          >
            <p className="font-serif text-3xl text-[#e2bd68]">{number}</p>
            <h3 className="mt-3 font-serif text-2xl text-[#fff4e7]">
              {title}
            </h3>
            <p className="mt-2 text-xs leading-6 text-[#efd7ba]/70">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row">
        <a
          href="#nouveautes"
          className="inline-flex items-center justify-center border border-[#d4af37] bg-[#d4af37] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#211208] transition hover:bg-transparent hover:text-[#f0cb73]"
        >
          Découvrir les pièces
        </a>

        <a
          href="https://wa.me/4917623345700"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-[#e7c98b]/35 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#fff1df] transition hover:border-[#d4af37] hover:text-[#f0cb73]"
        >
          <MessageCircle className="h-4 w-4" />
          Être conseillé
        </a>
      </div>
    </div>
  </div>
  </Reveal>
</section>
<section
  id="temoignages"
  className="relative overflow-hidden bg-[#f7f0e6] px-5 py-24 text-[#1b130d] md:px-8 md:py-32"
>
   <Reveal>
  {/* Texture et lumières chaudes */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(212,175,55,0.22),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(157,103,54,0.16),transparent_28%),linear-gradient(135deg,#fffaf3_0%,#f3e6d6_48%,#fff8ef_100%)]" />
  
  <div className="absolute left-[-100px] top-[-100px] h-72 w-72 rounded-full border border-[#d4af37]/20" />
  <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full border border-[#b98542]/20" />

  <div className="relative z-10 mx-auto max-w-7xl">
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a87825]">
        Témoignages
      </p>

      <div className="mx-auto mt-4 flex w-36 items-center gap-3">
        <span className="h-px flex-1 bg-[#b7832f]/60" />
        <span className="h-2 w-2 rotate-45 border border-[#b7832f]" />
        <span className="h-px flex-1 bg-[#b7832f]/60" />
      </div>

      <h2 className="mt-6 font-serif text-5xl leading-tight text-[#1b130d] md:text-7xl">
        Elles parlent de leur{" "}
        <span className="text-[#b7832f]">expérience</span>
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6d5746]">
        Des retours clients qui reflètent la qualité, l’élégance et
        l’accompagnement Smyth Collection.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {[
        {
          id: "avis-1",
          name: "Makya",
          location: "Allemagne / Berlin",
          initials: "M",
          text: "Les produits sont magnifiques, la qualité est au rendez-vous et le suivi sur WhatsApp est vraiment professionnel.",
        },
        {
          id: "avis-2",
          name: "Soumi",
          location: "Belgique",
          initials: "S",
          text: "J’ai reçu une tenue encore plus belle en vrai. Les finitions sont propres et la livraison a été rapide.",
        },
        {
          id: "avis-3",
          name: "Asma",
          location: "Allemagne / Hamburg",
          initials: "A",
          text: "Service très réactif, conseils utiles et commande bien emballée. Je recommande sans hésiter.",
        },
      ].map((testimonial) => (
        <article
          key={testimonial.id}
          className="group relative overflow-hidden border border-[#c99c52]/55 bg-[#fffaf4]/85 p-7 shadow-[0_20px_55px_rgba(83,52,23,0.12)] backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-[#b7832f] hover:shadow-[0_28px_65px_rgba(164,112,42,0.22)]"
        >
          {/* Grande citation décorative */}
          <div className="absolute -right-5 -top-10 font-serif text-[150px] leading-none text-[#c99c52]/15">
            “
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#b7832f] bg-[#1b130d] text-sm font-bold text-[#e5bd67] shadow-[0_0_24px_rgba(183,131,47,0.22)]">
                {testimonial.initials}
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#1b130d]">
                  {testimonial.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-[#a87825]">
                  {testimonial.location}
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-1 text-[#c28a2c]">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-[#604a39]">
              {testimonial.text}
            </p>

            <div className="mt-7 h-px w-full bg-gradient-to-r from-[#b7832f]/70 via-[#b7832f]/20 to-transparent" />

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a87825]">
              Cliente vérifiée
            </p>
          </div>
        </article>
      ))}
    </div>
  </div>
  </Reveal>
</section>

<section
  id="contact"
  className="relative overflow-hidden bg-[#120b07] px-5 py-24 text-[#fff5e8] md:px-8 md:py-32"
>
  <Reveal>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(212,175,55,0.20),transparent_30%),radial-gradient(circle_at_88%_80%,rgba(133,76,33,0.30),transparent_32%),linear-gradient(135deg,#0b0604_0%,#28170d_52%,#100806_100%)]" />

    <div className="absolute left-[-180px] top-1/3 h-[480px] w-[480px] rounded-full border border-[#d4af37]/15" />

    <div className="absolute bottom-[-220px] right-[-160px] h-[580px] w-[580px] rounded-full border border-[#d4af37]/15" />

    <div className="relative z-10 mx-auto max-w-7xl">
      {/* Titre de la section */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#e5bd67]">
          Nous contacter
        </p>

        <div className="mx-auto mt-4 flex w-40 items-center gap-3">
          <span className="h-px flex-1 bg-[#d4af37]/60" />
          <span className="h-2 w-2 rotate-45 border border-[#d4af37]" />
          <span className="h-px flex-1 bg-[#d4af37]/60" />
        </div>

        <h2 className="mt-7 font-serif text-5xl leading-tight md:text-7xl">
          Parlons de votre prochaine{" "}
          <span className="text-[#e5bd67]">pièce d’exception</span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#f1d9bd]/75 md:text-base">
          Une question, une demande particulière ou besoin d’un conseil ?
          Écrivez-nous, notre équipe vous répondra avec attention.
        </p>
      </div>

      <div className="grid overflow-hidden border border-[#d4af37]/35 bg-[#1b100a]/55 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
        {/* Informations */}
        <aside className="relative overflow-hidden border-b border-[#d4af37]/25 bg-[#24140b]/75 p-8 md:border-b-0 md:border-r md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(212,175,55,0.18),transparent_35%)]" />

          <div className="relative z-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              Smyth Collection
            </p>

            <h3 className="mt-5 font-serif text-4xl leading-tight text-white">
              Une attention particulière à chaque demande.
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#f1d9bd]/75">
              Pour une commande, une disponibilité, un conseil de taille ou une
              demande personnalisée, contactez-nous directement.
            </p>

            <div className="mt-10 space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/4917623345700"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 border border-[#d4af37]/35 bg-black/15 p-4 transition hover:border-[#d4af37] hover:bg-[#d4af37]/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/60 text-[#d4af37]">
                  <MessageCircle className="h-5 w-5" />
                </span>

                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                    WhatsApp
                  </span>

                  <span className="mt-1 block text-sm text-white">
                    Commander ou demander conseil
                  </span>
                </span>
              </a>

              {/* E-mail */}
              <a
                href="mailto:soumaiyatha@gmail.com"
                className="group flex items-center gap-4 border border-[#d4af37]/35 bg-black/15 p-4 transition hover:border-[#d4af37] hover:bg-[#d4af37]/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/60 text-[#d4af37]">
                  <Mail className="h-5 w-5" />
                </span>

                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
                    E-mail
                  </span>

                  <span className="mt-1 block text-sm text-white">
                    soumaiyatha@gmail.com
                  </span>
                </span>
              </a>
            </div>

            <div className="mt-10 border-t border-[#d4af37]/20 pt-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#d4af37]/80">
                Réponse personnalisée
              </p>

              <p className="mt-2 text-sm text-[#f1d9bd]/70">
                Nous vous accompagnons pour faire le bon choix.
              </p>
            </div>
          </div>
        </aside>

        {/* Formulaire */}
        <div className="bg-[#120a06]/70 p-8 md:p-12">
          <form
            action="https://formsubmit.co/soumaiyatha@gmail.com"
            method="POST"
            className="space-y-6"
          >
            {/* Configuration FormSubmit */}
            <input
              type="hidden"
              name="_subject"
              value="Nouvelle demande depuis Smyth Collection"
            />

            <input type="hidden" name="_captcha" value="false" />

            <input type="hidden" name="_template" value="table" />

            {/* À remplacer après le déploiement */}
            <input
              type="hidden"
              name="_next"
              value="https://smythcollection.com/merci"            />

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Nom */}
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5bd67]">
                  Nom complet
                </span>

                <input
                  type="text"
                  name="Nom complet"
                  required
                  autoComplete="name"
                  placeholder="Votre nom"
                  className="mt-3 w-full border-b border-[#d4af37]/35 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
                />
              </label>

              {/* Téléphone */}
              <label className="block">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5bd67]">
                  Téléphone / WhatsApp
                </span>

                <input
                  type="tel"
                  name="Téléphone ou WhatsApp"
                  autoComplete="tel"
                  placeholder="+49, +33, +229..."
                  className="mt-3 w-full border-b border-[#d4af37]/35 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
                />
              </label>
            </div>

            {/* E-mail */}
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5bd67]">
                Adresse e-mail
              </span>

              <input
                type="email"
                name="E-mail du client"
                required
                autoComplete="email"
                placeholder="vous@exemple.com"
                className="mt-3 w-full border-b border-[#d4af37]/35 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
              />
            </label>

            {/* Objet */}
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5bd67]">
                Objet de votre demande
              </span>

              <select
                name="Objet de la demande"
                required
                defaultValue=""
                className="mt-3 w-full appearance-none border-b border-[#d4af37]/35 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-[#d4af37]"
              >
                <option className="bg-[#1b100a]" value="" disabled>
                  Sélectionnez un sujet
                </option>

                <option className="bg-[#1b100a]" value="Commander un article">
                  Commander un article
                </option>

                <option
                  className="bg-[#1b100a]"
                  value="Vérifier une disponibilité"
                >
                  Vérifier une disponibilité
                </option>

                <option className="bg-[#1b100a]" value="Demander conseil">
                  Demander conseil
                </option>

                <option className="bg-[#1b100a]" value="Autre demande">
                  Autre demande
                </option>
              </select>
            </label>

            {/* Message */}
            <label className="block">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e5bd67]">
                Votre message
              </span>

              <textarea
                name="Message"
                required
                rows={5}
                placeholder="Dites-nous ce que vous recherchez..."
                className="mt-3 w-full resize-none border border-[#d4af37]/30 bg-black/10 p-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#d4af37]"
              />
            </label>

            {/* Bouton */}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-3 border border-[#d4af37] bg-[#d4af37] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-[#1c1008] transition hover:bg-transparent hover:text-[#f0cb73] sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Envoyer ma demande
            </button>

            <p className="text-xs leading-5 text-[#f1d9bd]/55">
              Vos informations sont utilisées uniquement pour répondre à votre
              demande.
            </p>
          </form>
        </div>
      </div>
    </div>
  </Reveal>
</section>

<footer className="relative overflow-hidden bg-[#080503] px-5 pt-20 text-[#f8ead8] md:px-8 md:pt-24">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(212,175,55,0.16),transparent_28%),linear-gradient(135deg,#070403_0%,#1a0f09_55%,#080503_100%)]" />

  <div className="relative z-10 mx-auto max-w-7xl">
    <div className="grid gap-12 border-b border-[#d4af37]/25 pb-14 md:grid-cols-[1.35fr_0.8fr_0.9fr_1fr]">
      {/* Marque */}
      <div>
              <a
        href="#accueil"
        aria-label="Retour en haut de la page"
        className="inline-flex"
      >
        <img
          src="/images/logo-smyth4.png"
          alt="Smyth Collection"
          className="h-24 w-auto object-contain transition duration-300 hover:scale-105"
        />
</a>
        <p className="mt-5 max-w-sm text-sm leading-7 text-[#efd7ba]/70">
          Une sélection de pièces élégantes et raffinées, pensée pour révéler
          votre style avec distinction.
        </p>

        <a
          href="https://wa.me/4917623345700"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 border border-[#d4af37]/45 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5bd67] transition hover:bg-[#d4af37] hover:text-[#1b100a]"
        >
          <MessageCircle className="h-4 w-4" />
          Écrire sur WhatsApp
        </a>
      </div>

      {/* Navigation */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d4af37]">
          Navigation
        </p>

        <nav className="mt-6 flex flex-col gap-3 text-sm text-[#efd7ba]/75">
          <a href="#accueil" className="transition hover:text-[#d4af37]">
            Accueil
          </a>
          <a href="#boutique" className="transition hover:text-[#d4af37]">
            Boutique
          </a>
          <a href="#nouveautes" className="transition hover:text-[#d4af37]">
            Nouveautés
          </a>
          <a href="#collections" className="transition hover:text-[#d4af37]">
            Collections
          </a>
          <a href="#apropos" className="transition hover:text-[#d4af37]">
            À propos
          </a>
        </nav>
      </div>

      {/* Service */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d4af37]">
          Service client
        </p>

        <nav className="mt-6 flex flex-col gap-3 text-sm text-[#efd7ba]/75">
          <a href="#contact" className="transition hover:text-[#d4af37]">
            Nous contacter
          </a>
          <a href="#temoignages" className="transition hover:text-[#d4af37]">
            Témoignages
          </a>
          <a href="#contact" className="transition hover:text-[#d4af37]">
            Livraison & commandes
          </a>
          <a href="#contact" className="transition hover:text-[#d4af37]">
            Questions fréquentes
          </a>
        </nav>
      </div>

      {/* Newsletter */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d4af37]">
          L’univers Smyth
        </p>

        <h3 className="mt-5 font-serif text-3xl leading-tight text-white">
          Recevez nos nouveautés en avant-première.
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#efd7ba]/70">
          Inscrivez-vous pour découvrir les nouvelles pièces et les collections
          exclusives.
        </p>

        <form className="mt-6 flex border border-[#d4af37]/40 bg-black/20 p-1">
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-white/35"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#d4af37] text-[#1b100a] transition hover:bg-[#efca70]"
            aria-label="S'inscrire à la newsletter"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>

    <div className="flex flex-col gap-5 py-7 text-xs text-[#efd7ba]/55 md:flex-row md:items-center md:justify-between">
      <p>
        © {new Date().getFullYear()} Smyth Collection. Tous droits réservés.
      </p>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <a href="#" className="transition hover:text-[#d4af37]">
          Mentions légales
        </a>
        <a href="#" className="transition hover:text-[#d4af37]">
          Politique de confidentialité
        </a>
        <a href="#" className="transition hover:text-[#d4af37]">
          Conditions de vente
        </a>
      </div>

      <p className="text-[#d4af37]/80">
        Luxury • Elegance • Style
      </p>
    </div>
  </div>
</footer>
<BackToTop />
      {fullscreenMedia.length > 0 && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
    onClick={closeFullscreenGallery}
  >
    {/* En-tête de la galerie */}
    <div className="absolute left-0 top-0 z-30 flex w-full items-center justify-between px-4 py-4 md:px-8">
      <div>
        <p className="text-sm font-medium text-white md:text-base">
          {fullscreenProductName}
        </p>

        <p className="mt-1 text-xs text-white/60">
          {fullscreenIndex + 1} / {fullscreenMedia.length}
        </p>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          closeFullscreenGallery();
        }}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl font-light text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
        aria-label="Fermer la galerie"
      >
        ×
      </button>
    </div>

    {/* Flèche précédente */}
    {fullscreenMedia.length > 1 && (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          showPreviousFullscreenMedia();
        }}
        className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black md:left-8 md:h-14 md:w-14"
        aria-label="Média précédent"
      >
        ‹
      </button>
    )}

    {/* Média principal */}
    <div
      className="relative flex h-full w-full items-center justify-center px-16 pb-24 pt-20 md:px-28"
      onClick={(event) => event.stopPropagation()}
    >
      {/\.(mp4|webm|mov)$/i.test(
        fullscreenMedia[fullscreenIndex]
      ) ? (
        <video
          key={fullscreenMedia[fullscreenIndex]}
          src={fullscreenMedia[fullscreenIndex]}
          controls
          autoPlay
          playsInline
          className="max-h-[78vh] max-w-full object-contain"
        >
          Votre navigateur ne prend pas en charge cette vidéo.
        </video>
      ) : (
        <img
          key={fullscreenMedia[fullscreenIndex]}
          src={fullscreenMedia[fullscreenIndex]}
          alt={`${fullscreenProductName} - média ${
            fullscreenIndex + 1
          }`}
          className="max-h-[78vh] max-w-full object-contain"
        />
      )}
    </div>

    {/* Flèche suivante */}
    {fullscreenMedia.length > 1 && (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          showNextFullscreenMedia();
        }}
        className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black md:right-8 md:h-14 md:w-14"
        aria-label="Média suivant"
      >
        ›
      </button>
    )}

    {/* Miniatures */}
    {fullscreenMedia.length > 1 && (
      <div
        className="absolute bottom-4 left-1/2 z-30 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-2 backdrop-blur-md"
        onClick={(event) => event.stopPropagation()}
      >
        {fullscreenMedia.map((media, index) => {
          const isVideo = /\.(mp4|webm|mov)$/i.test(media);

          return (
            <button
              key={`${media}-${index}`}
              type="button"
              onClick={() => setFullscreenIndex(index)}
              className={`relative h-14 w-14 flex-none overflow-hidden rounded-md border-2 transition md:h-16 md:w-16 ${
                fullscreenIndex === index
                  ? "border-[#d4af37]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`Afficher le média ${index + 1}`}
            >
              {isVideo ? (
                <>
                  <video
                    src={media}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />

                  <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-lg text-white">
                    ▶
                  </span>
                </>
              ) : (
                <img
                  src={media}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          );
        })}
      </div>
    )}
  </div>
)}
{isFavoritesOpen && (
  <div className="fixed inset-0 z-[200]">
    {/* Fond sombre */}
    <button
      type="button"
      aria-label="Fermer les favoris"
      onClick={() => setIsFavoritesOpen(false)}
      className="absolute inset-0 bg-black/75 backdrop-blur-sm"
    />

    {/* Panneau */}
    <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[#d4af37]/30 bg-[#0b0704] shadow-2xl">
      {/* En-tête */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
            Smyth Collection
          </p>

          <h2 className="mt-1 font-serif text-3xl text-white">
            Mes favoris
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsFavoritesOpen(false)}
          className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {favoriteProducts.length > 0 ? (
          <div className="space-y-4">
            {favoriteProducts.map((product) => {
              const firstMedia = product.images[0];
              const isVideo =
                firstMedia?.toLowerCase().endsWith(".mp4") ||
                firstMedia?.toLowerCase().endsWith(".webm");

              return (
                <article
                  key={product.id}
                  className="flex gap-4 border border-white/10 bg-white/[0.03] p-3"
                >
                  {/* Média */}
                  <div className="h-28 w-24 shrink-0 overflow-hidden bg-black">
                    {isVideo ? (
                      <video
                        src={firstMedia}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={firstMedia}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#d4af37]">
                      Favori
                    </p>

                    <h3 className="mt-1 line-clamp-2 font-serif text-lg leading-5 text-white">
                      {product.name}
                    </h3>

                    {product.pricing?.[0] && (
                      <p className="mt-2 text-sm font-semibold text-[#d4af37]">
                        {product.pricing[0].price}
                      </p>
                    )}

                    <div className="mt-auto flex items-center gap-2 pt-3">
                      <a
                        href={`https://wa.me/4917623345700?text=${encodeURIComponent(
                          `Bonjour Smyth Collection, je souhaite avoir des informations sur : ${product.name}`,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 border border-[#d4af37]/50 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Commander
                      </a>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        className="flex h-9 w-9 items-center justify-center border border-white/20 text-white transition hover:border-red-400 hover:text-red-400"
                        aria-label={`Retirer ${product.name} des favoris`}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <Heart className="h-14 w-14 text-[#d4af37]/45" />

            <h3 className="mt-5 font-serif text-3xl text-white">
              Aucun favori
            </h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
              Ajoutez les articles qui vous intéressent pour les retrouver
              rapidement ici.
            </p>

            <button
              type="button"
              onClick={() => setIsFavoritesOpen(false)}
              className="mt-6 border border-[#d4af37]/50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              Découvrir la boutique
            </button>
          </div>
        )}
      </div>
    </aside>
  </div>
)}
      {isSearchOpen && (
  <div className="fixed inset-0 z-[300] overflow-hidden bg-[#0b0704] md:bg-transparent">
    {/* Fond sombre visible uniquement sur tablette et ordinateur */}
    <button
      type="button"
      aria-label="Fermer la recherche"
      onClick={closeSearch}
      className="absolute inset-0 hidden bg-black/75 backdrop-blur-sm md:block"
    />

    {/* Recherche plein écran mobile, panneau latéral ordinateur */}
    <aside
      className="
        relative flex h-[100dvh] max-h-[100dvh] w-full flex-col
        overflow-hidden bg-[#0b0704]
        md:absolute md:left-0 md:top-0 md:w-[92%] md:max-w-xl
        md:border-r md:border-[#d4af37]/30 md:shadow-2xl
      "
    >
      {/* Zone fixe en haut */}
      <div
        className="
          shrink-0 border-b border-white/10 bg-[#0b0704]
          px-4 pb-4 pt-[max(16px,env(safe-area-inset-top))]
          sm:px-5
        "
      >
        {/* Titre et fermeture */}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#d4af37] sm:text-[10px]">
              Smyth Collection
            </p>

            <h2 className="mt-1 font-serif text-2xl text-white sm:text-3xl">
              Rechercher
            </h2>
          </div>

          <button
            type="button"
            onClick={closeSearch}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl text-white transition hover:border-[#d4af37] hover:text-[#d4af37] sm:h-10 sm:w-10"
            aria-label="Fermer la recherche"
          >
            ×
          </button>
        </div>

        {/* Champ de recherche */}
        <div className="relative mt-4">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d4af37] sm:left-4 sm:h-5 sm:w-5" />

          <input
            type="search"
            autoFocus
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Nom, catégorie, taille, prix..."
            enterKeyHint="search"
            autoComplete="off"
            className="
              w-full rounded-sm border border-[#d4af37]/30
              bg-black/25 py-3 pl-11 pr-11 text-base text-white
              outline-none placeholder:text-sm placeholder:text-white/35
              focus:border-[#d4af37]
              sm:py-4 sm:pl-12 sm:pr-12
            "
          />

          {searchTerm.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-xl text-white/60 transition hover:text-[#d4af37]"
              aria-label="Effacer la recherche"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Seule cette zone défile */}
      <div
        className="
          min-h-0 flex-1 overflow-y-auto overscroll-contain
          px-3 py-4
          pb-[max(20px,env(safe-area-inset-bottom))]
          sm:px-5 sm:py-5
        "
      >
        {!searchTerm.trim() ? (
          /* État initial */
          <div className="flex min-h-full flex-col items-center justify-center px-5 py-10 text-center">
            <Search className="h-10 w-10 text-[#d4af37]/40 sm:h-14 sm:w-14" />

            <h3 className="mt-4 font-serif text-2xl text-white sm:text-3xl">
              Que recherchez-vous ?
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
              Recherchez une tenue, une catégorie, une taille, un prix ou une
              disponibilité.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                "Abaya",
                "Lace",
                "Bazin",
                "Dubai",
                "56",
                "Disponible",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setSearchTerm(suggestion)}
                  className="border border-[#d4af37]/35 px-3 py-2 text-[11px] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black sm:text-xs"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          /* Résultats */
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-white/50 sm:mb-4 sm:text-xs">
              {searchResults.length} résultat
              {searchResults.length > 1 ? "s" : ""}
            </p>

            <div className="space-y-3 sm:space-y-4">
              {searchResults.map((product) => {
                const firstMedia = product.images[0];
                const isVideo = /\.(mp4|webm|mov)$/i.test(firstMedia);

                return (
                  <article
                    key={product.id}
                    className="flex gap-3 border border-white/10 bg-white/[0.03] p-2.5 transition hover:border-[#d4af37] sm:gap-4 sm:p-3"
                  >
                    {/* Image ou vidéo */}
                    <button
                      type="button"
                      onClick={() => {
                        closeSearch();

                        openFullscreenGallery(
                          product.images,
                          0,
                          product.name
                        );
                      }}
                      className="h-24 w-20 shrink-0 overflow-hidden bg-black sm:h-28 sm:w-24"
                      aria-label={`Voir ${product.name}`}
                    >
                      {isVideo ? (
                        <video
                          src={firstMedia}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={firstMedia}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>

                    {/* Informations */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="line-clamp-1 text-[8px] uppercase tracking-[0.15em] text-[#d4af37] sm:text-[9px]">
                        {product.categorySlugs.join(" • ")}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          closeSearch();

                          openFullscreenGallery(
                            product.images,
                            0,
                            product.name
                          );
                        }}
                        className="mt-1 text-left"
                      >
                        <h3 className="line-clamp-2 font-serif text-base leading-5 text-white transition hover:text-[#d4af37] sm:text-lg">
                          {product.name}
                        </h3>
                      </button>

                      {product.pricing[0] && (
                        <p className="mt-1.5 text-xs font-semibold text-[#d4af37] sm:mt-2 sm:text-sm">
                          {product.pricing[0].quantity} pièces :{" "}
                          {product.pricing[0].price}
                        </p>
                      )}

                      <p className="mt-1 line-clamp-1 text-[9px] uppercase tracking-wide text-white/50 sm:text-[10px]">
                        Tailles : {product.sizes.join(" • ")}
                      </p>

                      <p className="mt-1 line-clamp-1 text-[9px] text-white/55 sm:text-[10px]">
                        {product.status}
                      </p>

                      <div className="mt-auto flex items-center gap-2 pt-2 sm:pt-3">
                        <a
                          href={`https://wa.me/4917623345700?text=${encodeURIComponent(
                            `Bonjour Smyth Collection, je souhaite avoir des informations sur : ${product.name}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-1 items-center justify-center gap-1.5 border border-[#d4af37]/50 px-2 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black sm:gap-2 sm:px-3 sm:text-[9px]"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Commander
                        </a>

                        <button
                          type="button"
                          onClick={() => toggleFavorite(product.id)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/20 transition hover:border-[#d4af37] sm:h-9 sm:w-9"
                          aria-label={
                            favorites.includes(product.id)
                              ? `Retirer ${product.name} des favoris`
                              : `Ajouter ${product.name} aux favoris`
                          }
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              favorites.includes(product.id)
                                ? "fill-[#d4af37] text-[#d4af37]"
                                : "text-white"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          /* Aucun résultat */
          <div className="flex min-h-full flex-col items-center justify-center px-5 py-10 text-center">
            <Search className="h-10 w-10 text-[#d4af37]/40 sm:h-14 sm:w-14" />

            <h3 className="mt-4 font-serif text-2xl text-white sm:text-3xl">
              Aucun résultat
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
              Aucun produit ne correspond à « {searchTerm} ».
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Abaya", "Lace", "Bazin", "Sac", "56"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setSearchTerm(suggestion)}
                    className="border border-[#d4af37]/35 px-3 py-2 text-[11px] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black sm:text-xs"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  </div>
)} 
    </main>
  );
}
