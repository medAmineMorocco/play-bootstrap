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

export function ProductImage({ file, alt, width = 1600, height = 950, priority = false }: { file: string; alt: string; width?: number; height?: number; priority?: boolean }) {
  return <Image src={`/images/v1.1.0/${file}`} alt={alt} width={width} height={height} sizes="(max-width: 767px) 92vw, (max-width: 1199px) 90vw, 1160px" priority={priority} className={styles.productImage} />;
}

export function BranchPaths() {
  return <svg className={styles.branchPaths} viewBox="0 0 1440 760" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><path d="M-30 120H150Q190 120 190 160V350Q190 390 230 390H1210Q1250 390 1250 430V720" /><path d="M-30 180H90Q130 180 130 220V470Q130 510 170 510H1280Q1320 510 1320 470V80" /><path d="M-30 640H260Q300 640 300 600V580Q300 540 340 540H1110Q1150 540 1150 500V280Q1150 240 1190 240H1470" /><circle cx="190" cy="210" r="5" /><circle cx="1320" cy="150" r="5" /><circle cx="1150" cy="350" r="5" /><circle cx="130" cy="430" r="5" /></svg>;
}
