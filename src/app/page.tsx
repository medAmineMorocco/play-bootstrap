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

const WORKTREES_BOOK_LANDING_PAGE_URL = process.env.NEXT_PUBLIC_WORKTREES_BOOK_LANDING_PAGE_URL;


export const metadata: Metadata = {
  title: "WorktreeWise | Powerful Git Worktrees Manager & GUI",
  description: "Manage Git worktrees like a pro — work on multiple branches, run workflows across worktrees, and open them in your favorite IDE. Boost productivity with WorktreeWise.",
  alternates: {
    canonical: "https://www.worktreewise.com/",
  },
  openGraph: {
    title: "WorktreeWise | Powerful Git Worktrees Manager & GUI",
    description:
      "Work smarter and code faster with WorktreeWise — a Git worktree manager that lets you work on multiple branches simultaneously, run workflows, and open worktrees in your IDE.",
    url: "https://www.worktreewise.com/",
    siteName: "WorktreeWise",
    images: [
      {
          url: "https://www.worktreewise.com/images/home/dashboard.avif",
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
    title: "WorktreeWise | Git Worktrees Manager & Productivity Tool",
    description:
      "Manage multiple git worktrees, run workflows, and open worktrees in your favorite IDE — all with WorktreeWise.",
    images: ["https://www.worktreewise.com/images/home/dashboard-preview.png"],
  },
};

const detailedFeatures1: Feature[] = [
  {
    title: "Managing Git Worktrees",
    image: "worktrees-management",
    description: "",
    features: ["List Git Worktrees", "Create Git Worktree", "Rename Git Worktree", "Move Git Worktree", "Delete Git Worktree", "Lock/Unlock Git Worktree", "Prune Git Worktrees", "Hooks Triggered When Creating a New Git Worktree"],
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
    features: ["List, create, edit, delete, and duplicate workflows", "Import Existing Workflows from Other Repositories", "Run Workflows in Sequence or Parallel Across All or Selected Git Worktrees", "Visualize Workflow Execution and Logs"],
    alt: "WorktreeWise executing workflows across multiple Git worktrees",
  }
];

const detailedFeatures2 : Feature[] = [
  {
    title: "Integration with your favourite IDE",
    image: "editors",
    description: "Every time you open a worktree in WorktreeWise, your favourite IDE launches with all your main worktree settings automatically preserved : bookmarks, configs, scripts, everything. No setup, no repetition your perfect environment is instantly ready.",
    features: [],
    alt: "WorktreeWise displaying supported editors after clicking 'Open In' on a Git worktree, including options like WebStorm, VS Code, and more",
  },
  {
    title: "WorktreeWise for JetBrains Plugin",
    image: "worktreewise-for-jetbrains-plugin",
    description: "Switch Git worktrees and open projects in WorktreeWise directly from your IDE. Preserve bookmarks, run configurations, and IDE context while staying fast and productive. Free for PRO / PRO PLUS users.",
    features: [],
    alt: "WorktreeWise for JetBrains plugin interface showing actions to manage Git worktrees while preserving bookmarks and run configurations.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "WorktreeWise",
                alternateName: [
                  "Git Worktree Manager",
                  "Worktree Wise",
                  "Work Tree Wise",
                  "WorktreeWise App",
                  "WorktreeWise Tool",
                  "WorktreeWise Saas",
                  "WTW",
                  "WTWise",
                  "worktreewise",
                  "worktree wise",
                  "WorktreWise",
                  "WorktTreeWise"
                ],
                url: "https://www.worktreewise.com/",
                logo: "https://www.worktreewise.com/images/logo/favicon.ico",
                description: "WorktreeWise is a Git worktrees manager and GUI that lets developers work on multiple branches at the same time, run workflows across worktrees, and open them in their favorite IDE to boost productivity.",
                email: "contact@worktreewise.com",
                foundingDate: "2025-11-01",
                founder: {
                  "@type": "Person",
                  name: "Mohamed Amine Ammach"
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "contact@worktreewise.com",
                  url: "https://www.worktreewise.com/contact"
                },
                sameAs: [
                  "https://x.com/worktreewise",
                  "https://www.linkedin.com/company/worktreewise",
                  "https://www.youtube.com/channel/UCGerIbGUUoxoTraUVkXs7DA",
                  "https://docs.worktreewise.com/"
                ]
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.worktreewise.com/#software",
                name: "WorktreeWise",
                applicationCategory: "DeveloperTools",
                operatingSystem: "Windows, macOS, Linux",
                url: "https://www.worktreewise.com/",
                description: "WorktreeWise helps you easily manage Git worktrees.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "ratingCount": "1200"
                },

                "offers": {
                  "@type": "Offer",
                  "price": "46",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                sameAs: [
                  "https://x.com/worktreewise",
                  "https://www.linkedin.com/company/worktreewise",
                  "https://www.youtube.com/channel/UCGerIbGUUoxoTraUVkXs7DA",
                  "https://docs.worktreewise.com/"
                ],
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://www.worktreewise.com/"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is WorktreeWise?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "WorktreeWise is a powerful Git worktree manager that helps developers create, manage, and automate multiple Git worktrees with ease. It simplifies workflows across repositories, allowing you to work on multiple branches without repeated cloning or setup."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why should I use WorktreeWise instead of managing worktrees manually?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Managing worktrees manually through the Git CLI can be time-consuming and error-prone. WorktreeWise provides a visual interface to create, rename, move, delete, and automate worktrees in just a few clicks—saving time and reducing mistakes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the best Git worktree manager for developers?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "WorktreeWise is one of the best Git worktree managers for developers who use multiple branches or repositories. It provides a visual interface to create, switch, and manage worktrees without using complex Git commands, helping you work faster and more efficiently."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I automate Git commands across worktrees?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. WorktreeWise lets you automate Git commands and scripts across selected or all worktrees. You can create reusable workflows, run them sequentially or in parallel, and monitor their execution logs in real time."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is WorktreeWise compatible with all operating systems?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. WorktreeWise works on Windows, macOS, and Linux, offering the same seamless experience across all platforms."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does WorktreeWise support workflows across multiple worktrees?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. WorktreeWise allows you to run workflows sequentially or in parallel across multiple worktrees, visualize execution logs, and import or duplicate workflows from other repositories."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is WorktreeWise different from using the Git CLI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unlike the Git CLI, which requires manual setup for each branch, WorktreeWise manages multiple branches and repositories visually. It saves configuration, bookmarks, and editor settings automatically, reducing setup time and improving productivity."
                    }
                  }
                ]
              }
            ]
          }),
        }}
      />
      <ScrollUp />
      <Hero />
      <UseCases />
      <Features />
      <About features={detailedFeatures1} />
      <CallToAction />
      <About features={detailedFeatures2} />
      <Pricing WORKTREES_BOOK_LANDING_PAGE_URL={WORKTREES_BOOK_LANDING_PAGE_URL} />
      <Faq />
      <HomeBlogSection posts={posts} />
    </main>
  );
}
