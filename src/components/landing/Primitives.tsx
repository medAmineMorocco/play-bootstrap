"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./landing.module.css";

export function BranchIcon({ className = "" }: { className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="6" cy="5" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="6" cy="19" r="2.5" /><path d="M6 7.5v9M18 8.5v1a5 5 0 0 1-5 5H11a5 5 0 0 0-5 5" /></svg>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className={styles.eyebrow}><span aria-hidden="true" />{children}</p>;
}

export function TrialLink({ children = "Try WorktreeWise Free", secondary = false }: { children?: ReactNode; secondary?: boolean }) {
  return <a href="#download" target="_self" className={secondary ? styles.secondaryButton : styles.primaryButton}>{children}<span aria-hidden="true">↗</span></a>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} target="_self" className={styles.textLink}>{children}<span aria-hidden="true">↗</span></Link>;
}

export function ProductImage({
  file,
  alt,
  width = 1800,
  height = 980,
  priority = false,
}: {
  file: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={styles.imageTrigger}
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        title="Click to view full size"
      >
        <Image
          src={`/images/v1.2.0/${file}`}
          alt={alt}
          width={width}
          height={height}
          quality={95}
          sizes="(max-width: 767px) 100vw, (max-width: 1400px) 95vw, 1600px"
          priority={priority}
          className={styles.productImage}
        />
        <span className={styles.expandHint} aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          Enlarge
        </span>
      </button>

      {open && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.lightboxHeader}>
              <span>{alt}</span>
              <button
                type="button"
                className={styles.lightboxClose}
                onClick={() => setOpen(false)}
                aria-label="Close enlarged view"
              >
                ✕ Close
              </button>
            </div>
            <div className={styles.lightboxImageWrap}>
              <Image
                src={`/images/v1.2.0/${file}`}
                alt={alt}
                width={width}
                height={height}
                quality={100}
                className={styles.lightboxImage}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function BranchPaths() {
  return <svg className={styles.branchPaths} viewBox="0 0 1440 760" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><path d="M-30 120H150Q190 120 190 160V350Q190 390 230 390H1210Q1250 390 1250 430V720" /><path d="M-30 180H90Q130 180 130 220V470Q130 510 170 510H1280Q1320 510 1320 470V80" /><path d="M-30 640H260Q300 640 300 600V580Q300 540 340 540H1110Q1150 540 1150 500V280Q1150 240 1190 240H1470" /><circle cx="190" cy="210" r="5" /><circle cx="1320" cy="150" r="5" /><circle cx="1150" cy="350" r="5" /><circle cx="130" cy="430" r="5" /></svg>;
}
