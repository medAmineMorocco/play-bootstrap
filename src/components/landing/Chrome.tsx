"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./landing.module.css";

const navigation = [["Product", "/#product"], ["Tutorials", "/git-worktree"], ["Cheat Sheet", "/git-worktree-cheat-sheet"], ["Generator", "/git-worktree-command-generator"], ["Docs", "https://docs.worktreewise.com/"], ["Blog", "/blog"], ["Pricing", "/pricing"]];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  return <header ref={header} className={styles.header} onKeyDown={event => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}><a className={styles.skipLink} href="#main-content" target="_self">Skip to content</a><div className={styles.navInner}><Link href="/" target="_self" aria-label="WorktreeWise home" className={styles.logo}><Image src="/images/logo/logo.svg" alt="WorktreeWise" width={257} height={70} className={styles.lightLogo} priority /><Image src="/images/logo/logo-white.svg" alt="" width={257} height={70} className={styles.darkLogo} /></Link><nav id="landing-navigation" aria-label="Main navigation" className={`${styles.nav} ${open ? styles.navOpen : ""}`}>{navigation.map(([label, href]) => <Link href={href} key={label} target="_self" aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/git-worktree" target="_self" className={styles.mobileResource} onClick={() => setOpen(false)}>Git worktree tutorials</Link></nav><div className={styles.navActions}><button className={styles.themeButton} aria-label="Toggle color theme" type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><span aria-hidden="true">◐</span></button><a href="/#download" target="_self" className={styles.navCta} onClick={() => setOpen(false)}>Download <span aria-hidden="true">↓</span></a><button type="button" ref={toggle} className={styles.menuToggle} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="landing-navigation" onClick={() => setOpen(value => !value)}>{open ? "×" : "☰"}</button></div></div></header>;
}

export function LandingFooter() {
  const legal = [["Privacy", process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL], ["Terms", process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_URL], ["Legal notice", process.env.NEXT_PUBLIC_LEGAL_NOTICE_URL], ["Refund policy", process.env.NEXT_PUBLIC_REFUND_POLICY_URL]];
  return <footer className={styles.footer}><div className={styles.container}><div className={styles.footerGrid}><div><Link href="/" target="_self"><Image src="/images/logo/logo-white.svg" alt="WorktreeWise" width={205} height={56} /></Link><p>One repository.<br />Room for every branch.</p></div><div><h2>Product</h2><Link href="/#workspace" target="_self">Workspace</Link><Link href="/#agents" target="_self">Parallel agents</Link><Link href="/pricing" target="_self">Pricing</Link><Link href="/#download" target="_self">Download</Link></div><div><h2>Resources</h2><a href="https://docs.worktreewise.com/">Documentation</a><Link href="/git-worktree" target="_self">Git worktree tutorials</Link><Link href="/git-worktree-cheat-sheet" target="_self">Cheat sheet</Link><Link href="/git-worktree-command-generator" target="_self">Command generator</Link><Link href="/blog" target="_self">Blog</Link></div><div><h2>WorktreeWise</h2><Link href="/about" target="_self">About</Link><Link href="/contact" target="_self">Contact</Link><a href="https://x.com/worktreewise">X / Twitter</a></div></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} WorktreeWise</span><div>{legal.filter(([, href]) => href).map(([label, href]) => <a href={href} key={label}>{label}</a>)}</div><span>Built for parallel minds.</span></div></div></footer>;
}

