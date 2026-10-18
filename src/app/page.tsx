import { Metadata } from "next";
import LandingHome from "@/components/landing/Home";
import { faqs } from "@/components/landing/content";
import { pricingData } from "@/stripe/pricingData";
import { getAllPosts } from "@/utils/markdown";

const title = "WorktreeWise | Git Worktree Manager for Parallel Development";
const description = "Stop switching branches. Manage Git worktrees, terminals, IDEs, workflows, and parallel AI coding agents in one desktop workspace for Windows, macOS, and Linux.";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.worktreewise.com"),
  title, description,
  alternates: { canonical: "https://www.worktreewise.com/" },
  openGraph: { title, description, url: "https://www.worktreewise.com/", siteName: "WorktreeWise", type: "website", locale: "en_US", images: [{ url: "https://www.worktreewise.com/images/v1.2.0/dashboard.png", width: 1746, height: 901, alt: "WorktreeWise 1.2 Git worktree manager and commit graph" }] },
  twitter: { card: "summary_large_image", title, description, images: ["https://www.worktreewise.com/images/v1.2.0/dashboard.png"] },
};

export default function Home() {
  const posts = getAllPosts(["title", "excerpt", "slug"]);
  const pro = pricingData.find(plan => plan.id === "PRO");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "WorktreeWise", url: "https://www.worktreewise.com/", logo: "https://www.worktreewise.com/images/logo/logo.svg", email: "contact@worktreewise.com", sameAs: ["https://x.com/worktreewise"] },
      { "@type": "SoftwareApplication", "@id": "https://www.worktreewise.com/#software", name: "WorktreeWise", applicationCategory: "DeveloperApplication", operatingSystem: "Windows, macOS, Linux", url: "https://www.worktreewise.com/", description, ...(pro?.unit_amount ? { offers: { "@type": "Offer", price: pro.unit_amount, priceCurrency: "USD", availability: "https://schema.org/InStock", url: "https://www.worktreewise.com/pricing" } } : {}) },
      { "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };
  return <main id="main-content"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><LandingHome posts={posts} /></main>;
}

