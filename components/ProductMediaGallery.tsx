"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ProductMediaGalleryProps = {
  images: string[];
  productName: string;
};

const isVideoFile = (media: string) =>
  /\.(mp4|webm|mov)(\?.*)?$/i.test(media);

export default function ProductMediaGallery({
  images,
  productName,
}: ProductMediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const currentMedia = images[currentIndex];

  const showPreviousMedia = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? images.length - 1 : previousIndex - 1,
    );
  };

  const showNextMedia = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === images.length - 1 ? 0 : previousIndex + 1,
    );
  };

  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  useEffect(() => {
    if (!isFullscreenOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFullscreen();
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

  if (images.length === 0 || !currentMedia) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center bg-black/30 text-sm text-white/50">
        Aucun média
      </div>
    );
  }

  return (
    <>
      {/* Média affiché dans la carte produit */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {isVideoFile(currentMedia) ? (
          <video
            key={currentMedia}
            src={currentMedia}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onClick={openFullscreen}
            className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            key={currentMedia}
            src={currentMedia}
            alt={`${productName} - média ${currentIndex + 1}`}
            loading="lazy"
            onClick={openFullscreen}
            className="h-full w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
          />
        )}

        {/* Ce dégradé ne doit jamais bloquer le clic */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

        {/* Navigation dans la carte */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousMedia();
              }}
              className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition hover:border-[#d4af37] hover:text-[#d4af37]"
              aria-label="Média précédent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextMedia();
              }}
              className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition hover:border-[#d4af37] hover:text-[#d4af37]"
              aria-label="Média suivant"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 z-20 flex max-w-[85%] -translate-x-1/2 gap-1.5 overflow-x-auto">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === index
                      ? "w-6 bg-[#d4af37]"
                      : "w-1.5 bg-white/60"
                  }`}
                  aria-label={`Afficher le média ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Galerie plein écran */}
      {isFullscreenOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95"
          onClick={closeFullscreen}
        >
          {/* En-tête */}
          <div className="absolute left-0 top-0 z-30 flex w-full items-center justify-between px-4 py-4 md:px-8">
            <div>
              <p className="text-sm font-medium text-white md:text-base">
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
                closeFullscreen();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              aria-label="Fermer la galerie"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Flèche précédente plein écran */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousMedia();
              }}
              className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black md:left-8 md:h-14 md:w-14"
              aria-label="Média précédent"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Média principal */}
          <div
            className="flex h-full w-full items-center justify-center px-5 pb-24 pt-20 md:px-28"
            onClick={(event) => event.stopPropagation()}
          >
            {isVideoFile(currentMedia) ? (
              <video
                key={currentMedia}
                src={currentMedia}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[78vh] max-w-full object-contain"
              >
                Votre navigateur ne prend pas en charge cette vidéo.
              </video>
            ) : (
              <img
                key={currentMedia}
                src={currentMedia}
                alt={`${productName} - média ${currentIndex + 1}`}
                className="max-h-[78vh] max-w-full object-contain"
              />
            )}
          </div>

          {/* Flèche suivante plein écran */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextMedia();
              }}
              className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white transition hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black md:right-8 md:h-14 md:w-14"
              aria-label="Média suivant"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Miniatures */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 z-30 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-2 backdrop-blur-md"
              onClick={(event) => event.stopPropagation()}
            >
              {images.map((media, index) => (
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
                  {isVideoFile(media) ? (
                    <>
                      <video
                        src={media}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />

                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 text-white">
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
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
