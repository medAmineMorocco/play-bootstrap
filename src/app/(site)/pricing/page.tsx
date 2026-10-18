import Breadcrumb from "@/components/Common/Breadcrumb";
import { FAQ, Pricing } from "@/components/landing/Home";
import styles from "@/components/landing/landing.module.css";

import { Metadata } from "next";

const WORKTREES_BOOK_LANDING_PAGE_URL = process.env.NEXT_PUBLIC_WORKTREES_BOOK_LANDING_PAGE_URL;


export const metadata: Metadata = {
  title:
    "WorktreeWise Pricing | Choose Your Plan",
  description: "Discover WorktreeWise pricing for developers. Choose the plan that fits your workflow and start managing Git worktrees faster and smarter.",
  alternates: {
    canonical: "https://www.worktreewise.com/pricing",
  },
  openGraph: {
    title: "WorktreeWise Pricing | Choose Your Plan",
    description:
      "Explore WorktreeWise pricing made for developers. Manage Git worktrees efficiently, run workflows, and open them in your favorite IDE.",
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
    title: "WorktreeWise Pricing | Choose Your Plan",
    description:
      "Check WorktreeWise pricing for developers — manage Git worktrees smarter and boost your productivity.",
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

