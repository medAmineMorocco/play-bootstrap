import About from "@/components/About";
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

const detailedFeatures1 = [
  {
    position: "left",
    title: "Managing Worktrees",
    image: "worktrees",
    description: "Effortlessly manage worktrees with actions like : ",
    features: ["List worktrees", "Create worktree", "Edit worktree", "Move worktree", "Delete worktree", "Lock/Unlock worktree", "Prune worktrees", "Hooks triggered when creating a new worktree"]
  },
  {
    position: "right",
    title: "Opening worktree in terminal",
    image: "terminal",
    description: "Quickly open a worktree in your terminal, providing instant access for command-line operations and scripting.",
    features: []
  },
  {
    position: "left",
    title: "Workflow Automation",
    image: "workflow",
    description: "Define and execute a series of commands across multiple worktrees, automating complex tasks for enhanced productivity.",
    features: ["List, create, edit, delete, and duplicate workflows", "Import Existing Workflows from Other Repositories", "Run Workflow in Sequence/Parallel Across All/Selected Worktrees", "Visualize Execution and Log of the Workflow"]
  }
];

const detailedFeatures2 = [
  {
    position: "left",
    title: "Integration with your favourite IDE",
    image: "editors",
    description: "Open and manage your worktrees directly within your preferred integrated development environment (IDE), enhancing collaboration and efficiency.",
    features: ["Intellij", "Webstorm", "PhpStorm", "Rider", "PyCharm", "CLion", "RubyMine", "GoLand", "Visual Studio", "Eclipse", "Brackets", "Android Studio", "Sublime Text"]
  },
  {
    position: "right",
    title: "Git Tools",
    image: "git-diff",
    description: "Access git logs and perform detailed comparisons between worktrees, branches, tags, and commits for robust version control.",
    features: ["View Git Log", "Git Diff Between Worktrees/Branches/Tags/Commits"]
  },
  {
    position: "left",
    title: "Generate code across worktrees",
    image: "run-generator",
    description: "Speed up your development process by generating code with the built-in code generator.",
    features: ["generate new code snippets, templates, or entire modules to kickstart your development projects.", "import existing code generators from various repositories, integrating it into your current worktrees for streamlined development.", "Execute your predefined generator on a specific worktree to automate code generation and streamline your development process."]
  }
];

export default function Home() {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />
      <Hero />
      <Features />
      <About features={detailedFeatures1} />
      <CallToAction />
      <About features={detailedFeatures2}/>
      <UseCases/>
      <Pricing />
      {/*<Testimonials />*/}
      <Faq />
      <HomeBlogSection posts={posts} />
      {/*<Contact />*/}
    </main>
  );
}
