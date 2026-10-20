import Breadcrumb from "@/components/Common/Breadcrumb";
import { FAQ, Pricing } from "@/components/landing/Home";
import styles from "@/components/landing/landing.module.css";

import { Metadata } from "next";

const WORKTREES_BOOK_LANDING_PAGE_URL = process.env.NEXT_PUBLIC_WORKTREES_BOOK_LANDING_PAGE_URL;


export const metadata: Metadata = {
  title:
    "WorktreeWise Pricing | Free Trial & One-Time Pro",
  description: "Try every WorktreeWise Pro feature free for 5 days with no credit card. Buy once for 12 months of updates and keep your supported version forever.",
  alternates: {
    canonical: "https://www.worktreewise.com/pricing",
  },
  openGraph: {
    title: "WorktreeWise Pricing | Free Trial & One-Time Pro",
    description:
      "Try every WorktreeWise Pro feature free for 5 days. Upgrade with one payment and keep your supported version forever.",
    url: "https://www.worktreewise.com/pricing",
    siteName: "WorktreeWise",
    images: [
      {
        url: "https://www.worktreewise.com/images/v1.2.0/dashboard.png",
        width: 1746,
        height: 901,
        alt: "WorktreeWise pricing for Git worktree management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorktreeWise Pricing | Free Trial & One-Time Pro",
    description:
      "Start a 5-day free trial with no credit card, then upgrade with one payment if WorktreeWise fits your workflow.",
    images: ["https://www.worktreewise.com/images/v1.2.0/dashboard.png"],
  },
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Plans & Pricing" />
      <div className={styles.landing}><Pricing checkout />
      <FAQ /></div>
    </>
  );
};

export default PricingPage;

