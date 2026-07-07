"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AlbumImage } from "../../lib/album";

type Rect = { top: number; left: number; width: number; height: number };

const EASE = "cubic-bezier(0.22, 0.9, 0.26, 1)";
const DURATION = 280;

function centeredRect(): Rect {
  // photo card: 3:4 portrait, capped by viewport
  const height = Math.min(window.innerHeight * 0.78, 640);
  let width = height * 0.75;
  if (width > window.innerWidth * 0.85) {
    width = window.innerWidth * 0.85;
  }
  const h = width / 0.75;
  return {
    top: (window.innerHeight - h) / 2,
    left: (window.innerWidth - width) / 2,
    width,
    height: h,
  };
}

export function AvatarAlbum({ photos }: { photos: AlbumImage[] }) {
  const avatarRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // false = at avatar, true = centered
  const [index, setIndex] = useState(0);
  const [fromRect, setFromRect] = useState<Rect | null>(null);
  const [toRect, setToRect] = useState<Rect | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const openAlbum = useCallback(() => {
    const el = avatarRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(reduce);
    const r = el.getBoundingClientRect();
    setFromRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    setToRect(centeredRect());
    setIndex(0);
    setOpen(true);
    setExpanded(reduce); // skip the fly-out under reduced motion
  }, []);

  const close = useCallback(() => {
    if (reducedMotion) {
      setOpen(false);
      return;
    }
    setExpanded(false); // animate back to the avatar…
    window.setTimeout(() => setOpen(false), DURATION); // …then unmount
  }, [reducedMotion]);

  // fly out one frame after mount so the initial (avatar) rect paints first
  useEffect(() => {
    if (!open || expanded || reducedMotion) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)));
    return () => cancelAnimationFrame(raf);
  }, [open, expanded, reducedMotion]);

  // escape to close + scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, close]);

  if (!photos.length) return null;
  const photo = photos[Math.min(index, photos.length - 1)];
  const rect = expanded ? toRect : fromRect;

  return (
    <>
      <button
        ref={avatarRef}
        onClick={openAlbum}
        aria-label="Open photo album"
        title="Photos"
        className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-neutral-300 transition-transform hover:scale-110 dark:border-neutral-700"
      >
        <Image
          src={photos[0].url}
          alt="Ajay Ganesh"
          fill
          sizes="28px"
          className="object-cover"
          priority
        />
      </button>

      {open && rect && (
        <div role="dialog" aria-modal="true" aria-label="Photo album" className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            onClick={close}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            style={{
              opacity: expanded ? 1 : 0,
              transition: `opacity ${DURATION}ms ${EASE}`,
            }}
          />

          {/* the photo, flying between the avatar rect and center */}
          <div
            className="fixed overflow-hidden shadow-2xl"
            style={{
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: expanded ? 12 : 9999,
              transition: reducedMotion
                ? undefined
                : `top ${DURATION}ms ${EASE}, left ${DURATION}ms ${EASE}, width ${DURATION}ms ${EASE}, height ${DURATION}ms ${EASE}, border-radius ${DURATION}ms ${EASE}`,
            }}
          >
            <Image
              key={photo.pathname}
              src={photo.url}
              alt="Photo album image"
              fill
              sizes="85vw"
              className="object-cover"
            />
          </div>

          {/* chrome: fades in once expanded */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: expanded ? 1 : 0,
              transition: `opacity ${DURATION}ms ${EASE} ${expanded ? DURATION / 2 : 0}ms`,
            }}
          >
            <button
              onClick={close}
              aria-label="Close album"
              className="pointer-events-auto absolute top-4 right-4 font-mono text-2xl text-white/80 transition-colors hover:text-white"
            >
              ✕
            </button>
            {photos.length > 1 && (
              <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex items-center justify-center gap-6 font-mono text-sm text-white/80">
                <button
                  onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
                  aria-label="Previous photo"
                  className="px-2 transition-colors hover:text-white"
                >
                  ←
                </button>
                <span>
                  {index + 1} / {photos.length}
                </span>
                <button
                  onClick={() => setIndex((i) => (i + 1) % photos.length)}
                  aria-label="Next photo"
                  className="px-2 transition-colors hover:text-white"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
