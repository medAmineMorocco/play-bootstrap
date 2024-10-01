import About, { Feature } from "@/components/About";
import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
import ScrollUp from "@/components/Common/ScrollUp";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import UseCases from "@/components/UseCases";

export const metadata: Metadata = {
  title: "WorktreeWise | Efficient Git Worktree Solution",
  description: "Effortlessly manage your Git worktrees with WorktreeWise. Including features to add and remove git worktrees, open them in your favorite editor, change their locations, and more. All these capabilities work together to enhance your productivity and streamline your development process.",
  openGraph: {
    title: "WorktreeWise | Efficient Git Worktree Solution",
    description:
      "Effortlessly manage your Git worktrees with WorktreeWise. Including features to add and remove git worktrees, open them in your favorite editor, change their locations, and more. All these capabilities work together to enhance your productivity and streamline your development process.",
    url: "https://worktreewise.com",
    siteName: "WorktreeWise",
    images: [
      {
        url: "/images/home/dashboard.avif",
        width: 1200,
        height: 630,
        alt: "WorktreeWise Git worktree dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorktreeWise | Efficient Git Worktree Solution",
    description:
      "Effortlessly manage your Git worktrees with WorktreeWise. Including features to add and remove git worktrees, open them in your favorite editor, change their locations, and more. All these capabilities work together to enhance your productivity and streamline your development process.",
    images: ["/images/home/dashboard.avif"],
  },
};

const detailedFeatures1: Feature[] = [
  {
    title: "Managing Git Worktrees",
    image: "worktrees-management",
    description: "",
    features: ["List Git Worktrees", "Create Git Worktree", "Edit Git Worktree", "Move Git Worktree", "Delete Git Worktree", "Lock/Unlock Git Worktree", "Prune Git Worktrees", "Hooks Triggered When Creating a New Git Worktree"],
    alt: "Menu options displayed after selecting a Git worktree, including actions to add, remove, rename, and manage Git worktrees",
  },
  {
    title: "Opening Git Worktree in Terminal",
    image: "terminal",
    description: "Quickly open a Git worktree in your terminal for instant access to command-line operations and scripting.",
    features: [],
    alt: "WorktreeWise terminal opened in a Git worktree",
  },
  {
    title: "Workflow Automation",
    image: "workflow",
    description: "Define and execute a series of commands across multiple Git worktrees, automating complex tasks to boost productivity.",
    features: ["List, create, edit, delete, and duplicate workflows", "Import Existing Workflows from Other Repositories", "Run Workflows in Sequence or Parallel Across All or Selected Git Worktrees", "Visualize Execution and Log of the Workflow"],
    alt: "WorktreeWise executing workflows across multiple Git worktrees",
  }
];

const detailedFeatures2 : Feature[] = [
  {
    title: "Integration with your favourite IDE",
    image: "editors",
    description: "Open Git worktrees directly within your preferred integrated development environment (IDE), enhancing collaboration and efficiency.",
    features: [],
    alt: "WorktreeWise displaying supported editors after clicking 'Open In' on a Git worktree, including options like WebStorm, VS Code, and more",
  },
  {
    title: "Git Tools",
    image: "diff",
    description: "Access Git logs and perform detailed comparisons between Git worktrees, branches, tags, and commits for robust version control.",
    features: ["View Git Log", "Git Diff Between Git Worktrees, Branches, Tags, and Commits"],
    alt: "WorktreeWise showing a Git diff comparison between two Git worktrees, highlighting differences in files and changes",
  },
  {
    title: "Generate Code Across Git Worktrees",
    image: "generator",
    description: "",
    features: ["Generate new code snippets, templates, or entire modules across Git worktrees to kickstart your development projects.", "Import existing code generators from various repositories and integrate them into your current project’s Git worktrees for streamlined development.", "Execute your predefined code generator on a specific Git worktree to automate code generation and streamline your development process."],
    alt: "WorktreeWise showing how to run a code generator on a Git worktree",
  }
];

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      <Hero />
      <UseCases/>
      <Features />
      <About features={detailedFeatures1} />
      <CallToAction />
      <About features={detailedFeatures2}/>
      <Pricing />
      <Faq />
      <HomeBlogSection posts={posts} />
    </main>
  );
}
