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
  description: "Free Next.js SaaS Boilerplate and Starter Kit designed and built for SaaS startups. It comes with all necessary integrations, pages, and components you need to launch a feature-rich SaaS websites.",
};

const detailedFeatures1: Feature[] = [
  {
    title: "Managing Worktrees",
    image: "worktrees-management",
    description: "",
    features: ["List worktrees", "Create worktree", "Edit worktree", "Move worktree", "Delete worktree", "Lock/Unlock worktree", "Prune worktrees", "Hooks triggered when creating a new worktree"]
  },
  {
    title: "Opening worktree in terminal",
    image: "terminal",
    description: "Quickly open a worktree in your terminal, providing instant access for command-line operations and scripting.",
    features: []
  },
  {
    title: "Workflow Automation",
    image: "workflow",
    description: "Define and execute a series of commands across multiple worktrees, automating complex tasks for enhanced productivity.",
    features: ["List, create, edit, delete, and duplicate workflows", "Import Existing Workflows from Other Repositories", "Run Workflow in Sequence/Parallel Across All/Selected Worktrees", "Visualize Execution and Log of the Workflow"]
  }
];

const detailedFeatures2 : Feature[] = [
  {
    title: "Integration with your favourite IDE",
    image: "editors",
    description: "Open and manage your worktrees directly within your preferred integrated development environment (IDE), enhancing collaboration and efficiency.",
    features: []
  },
  {
    title: "Git Tools",
    image: "diff",
    description: "Access git logs and perform detailed comparisons between worktrees, branches, tags, and commits for robust version control.",
    features: ["View Git Log", "Git Diff Between Worktrees/Branches/Tags/Commits"]
  },
  {
    title: "Generate code across worktrees",
    image: "generator",
    description: "",
    features: ["Generate new code snippets, templates, or entire modules to kickstart your development projects.", "Import existing code generators from various repositories, integrating it into your current worktrees for streamlined development.", "Execute your predefined generator on a specific worktree to automate code generation and streamline your development process."]
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
