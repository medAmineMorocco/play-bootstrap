import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Tutorials from "@/components/Tutorials";

export const metadata: Metadata = {
  title:
    "WorktreeWise Documentation | Learn How to Manage Worktrees Efficiently",
  description: "Explore the WorktreeWise documentation page featuring a curated list of onboarding videos. Learn how to efficiently manage Git worktrees with step-by-step guides and tutorials designed to help new users get started quickly and make the most of WorktreeWise’s features.",
  openGraph: {
    title: "WorktreeWise Documentation | Learn How to Manage Worktrees Efficiently",
    description:
      "Explore the WorktreeWise documentation page featuring a curated list of onboarding videos. Learn how to efficiently manage Git worktrees with step-by-step guides and tutorials designed to help new users get started quickly and make the most of WorktreeWise’s features.",
    url: "https://worktreewise.com/documentation",
    siteName: "WorktreeWise",
    images: [
      {
        url: "/images/home/dashboard.avif",
        width: 1200,
        height: 630,
        alt: "WorktreeWise documentation for Git worktree management",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorktreeWise Documentation | Learn How to Manage Worktrees Efficiently",
    description:
      "Explore the WorktreeWise documentation page featuring a curated list of onboarding videos. Learn how to efficiently manage Git worktrees with step-by-step guides and tutorials designed to help new users get started quickly and make the most of WorktreeWise’s features.",
    images: ["/images/home/dashboard.avif"],
  },
};

const TutorialsPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Documentation" />
      <Tutorials />
    </main>
  );
};

export default TutorialsPage;
