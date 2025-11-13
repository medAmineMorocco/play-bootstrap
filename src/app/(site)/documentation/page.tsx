import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Tutorials from "@/components/Tutorials";

export const metadata: Metadata = {
  title:
    "WorktreeWise Documentation | Learn How to Manage Git Worktrees Efficiently",
  description: "Get started with WorktreeWise — detailed docs on creating, managing, and automating Git worktrees, workflows, and IDE integrations.",
  openGraph: {
    title: "WorktreeWise Documentation | Manage Git Worktrees Efficiently",
    description:
      "Comprehensive documentation for WorktreeWise — learn how to manage and automate Git worktrees with ease.",
    url: "https://www.worktreewise.com/documentation",
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
    title: "WorktreeWise Docs | Git Worktree Management Guide",
    description:
      "Learn everything about WorktreeWise — your Git worktree manager for productivity and automation.",
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
