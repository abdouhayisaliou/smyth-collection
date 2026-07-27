"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Revenir en haut de la page"
      className="fixed bottom-5 right-5 z-[850] flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/70 bg-[#0d0906]/90 text-[#d4af37] shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur transition hover:bg-[#d4af37] hover:text-black"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}