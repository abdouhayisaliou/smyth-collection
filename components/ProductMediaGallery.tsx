"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from "lucide-react";

type ProductMediaGalleryProps = {
  images: string[];
  productName: string;
};

const isVideoMedia = (media: string) => {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(media);
};

export default function ProductMediaGallery({
  images,
  productName,
}: ProductMediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const currentMedia = images[currentIndex];

  const showPreviousMedia = () => {
    setCurrentIndex((previousIndex) => {
      if (images.length === 0) {
        return 0;
      }

      return previousIndex === 0
        ? images.length - 1
        : previousIndex - 1;
    });
  };

  const showNextMedia = () => {
    setCurrentIndex((previousIndex) => {
      if (images.length === 0) {
        return 0;
      }

      return previousIndex === images.length - 1
        ? 0
        : previousIndex + 1;
    });
  };

  const openFullscreenGallery = () => {
    setIsFullscreenOpen(true);
  };

  const closeFullscreenGallery = () => {
    setIsFullscreenOpen(false);
  };

  useEffect(() => {
    if (!isFullscreenOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFullscreenGallery();
      }

      if (event.key === "ArrowLeft") {
        showPreviousMedia();
      }

      if (event.key === "ArrowRight") {
        showNextMedia();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [isFullscreenOpen, images.length]);

  if (!images || images.length === 0 || !currentMedia) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-black/30 px-4 text-center text-sm text-white/50">
        Aucun média disponible
      </div>
    );
  }

  return (
    <>
      {/* Média affiché dans la carte */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {isVideoMedia(currentMedia) ? (
          <video
            key={currentMedia}
            src={currentMedia}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onClick={openFullscreenGallery}
            className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            key={currentMedia}
            src={currentMedia}
            alt={`${productName} - média ${currentIndex + 1}`}
            loading="lazy"
            onClick={openFullscreenGallery}
            className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
          />
        )}

        {/* Dégradé visuel. Ne bloque pas les clics. */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

        {/* Bouton vidéo décoratif */}
        {isVideoMedia(currentMedia) && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/45 text-white backdrop-blur">
            <Play className="h-6 w-6 fill-current" />
          </div>
        )}

        {/* Flèches dans la carte */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousMedia();
              }}
              className="absolute left-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              aria-label="Afficher le média précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextMedia();
              }}
              className="absolute right-2 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              aria-label="Afficher le média suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Indicateurs */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-30 flex max-w-[80%] -translate-x-1/2 items-center gap-1.5 overflow-x-auto">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`h-1.5 flex-none rounded-full transition-all ${
                  index === currentIndex
                    ? "w-6 bg-[#d4af37]"
                    : "w-1.5 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Afficher le média ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Galerie plein écran */}
      {isFullscreenOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeFullscreenGallery}
        >
          {/* En-tête */}
          <div className="absolute left-0 top-0 z-40 flex w-full items-center justify-between border-b border-white/10 bg-black/30 px-4 py-4 backdrop-blur-md md:px-8">
            <div className="min-w-0 pr-4">
              <p className="truncate text-sm font-medium text-white md:text-base">
                {productName}
              </p>

              <p className="mt-1 text-xs text-white/60">
                {currentIndex + 1} / {images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeFullscreenGallery();
              }}
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              aria-label="Fermer la galerie"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Flèche précédente */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousMedia();
              }}
              className="absolute left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black md:left-8 md:h-14 md:w-14"
              aria-label="Média précédent"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Média principal plein écran */}
          <div
            className="flex h-full w-full items-center justify-center px-14 pb-28 pt-24 md:px-28"
            onClick={(event) => event.stopPropagation()}
          >
            {isVideoMedia(currentMedia) ? (
              <video
                key={currentMedia}
                src={currentMedia}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[76vh] max-w-full object-contain"
              >
                Votre navigateur ne prend pas en charge cette vidéo.
              </video>
            ) : (
              <img
                key={currentMedia}
                src={currentMedia}
                alt={`${productName} - média ${currentIndex + 1}`}
                className="max-h-[76vh] max-w-full object-contain"
              />
            )}
          </div>

          {/* Flèche suivante */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextMedia();
              }}
              className="absolute right-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black md:right-8 md:h-14 md:w-14"
              aria-label="Média suivant"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Miniatures */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 z-40 flex max-w-[92vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/70 p-2 backdrop-blur-md"
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((media, index) => {
                const mediaIsVideo = isVideoMedia(media);

                return (
                  <button
                    key={`${media}-${index}`}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`relative h-14 w-14 flex-none overflow-hidden rounded-md border-2 transition md:h-16 md:w-16 ${
                      currentIndex === index
                        ? "border-[#d4af37]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`Afficher le média ${index + 1}`}
                  >
                    {mediaIsVideo ? (
                      <>
                        <video
                          src={media}
                          muted
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        />

                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35 text-white">
                          <Play className="h-4 w-4 fill-current" />
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
    </>
  );
}
