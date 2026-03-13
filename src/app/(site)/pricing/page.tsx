import Breadcrumb from "@/components/Common/Breadcrumb";
import Faq from "@/components/Faq";
import Pricing from "@/components/Pricing";
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
        url: "https://www.worktreewise.com/images/home/dashboard.avif",
        width: 1200,
        height: 630,
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
    images: ["https://www.worktreewise.com/images/home/dashboard.avif"],
  },
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Plans & Pricing" />
      <Pricing WORKTREES_BOOK_LANDING_PAGE_URL={WORKTREES_BOOK_LANDING_PAGE_URL} />
      <Faq />
    </>
  );
};

export default PricingPage;
