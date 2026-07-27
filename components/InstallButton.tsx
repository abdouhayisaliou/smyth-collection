"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Download,
  Share2,
  PlusSquare,
  Smartphone,
  X,
} from "lucide-react";

export default function InstallButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#d4af37]/40 bg-[#0d0906] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37] sm:text-xs">
                    Smyth Collection
                  </p>

                  <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                    Installer sur iPhone
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-[#d4af37] hover:text-[#d4af37]"
                  aria-label="Fermer la fenêtre"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/70">
                Ajoutez Smyth Collection à votre écran d’accueil pour profiter
                d’un accès plus rapide et d’une expérience plus fluide.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-black">
                    <Share2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Étape 1
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-white/60">
                      Ouvrez cette page dans Safari puis appuyez sur le bouton
                      <strong className="text-white"> Partager</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-black">
                    <PlusSquare className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Étape 2
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-white/60">
                      Faites défiler le menu puis choisissez
                      <strong className="text-white">
                        {" "}
                        Ajouter à l’écran d’accueil
                      </strong>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-black">
                    <Smartphone className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Étape 3
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-white/60">
                      Appuyez sur
                      <strong className="text-white"> Ajouter</strong>.
                      L’application apparaîtra ensuite sur votre écran d’accueil.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-7 w-full rounded-md bg-[#d4af37] px-5 py-4 text-sm font-bold text-black transition hover:bg-[#e8bf52]"
              >
                J’ai compris
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-3 rounded-md border border-[#d4af37] bg-[#d4af37] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#e8bf52]"
      >
        <Download className="h-4 w-4" />
        Installer sur iPhone
      </button>

      {modal}
    </>
  );
}