import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import AboutMe from "@/components/AboutMe";

export const metadata: Metadata = {
  title: "About WorktreeWise",
  description: "Learn the story behind WorktreeWise — a Git worktree manager built to help developers work faster, smarter, and more efficiently across multiple branches.",
  alternates: {
    canonical: "https://www.worktreewise.com/about",
  },
  openGraph: {
    title: "About WorktreeWise",
    description:
      "Learn how WorktreeWise helps developers manage Git worktrees and boost productivity across multiple branches.",
    url: "https://www.worktreewise.com/about",
    siteName: "WorktreeWise",
    images: [
      {
        url: "https://www.worktreewise.com/images/v1.2.0/dashboard.png",
        width: 1746,
        height: 901,
        alt: "About WorktreeWise - Git worktree management solution",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About WorktreeWise",
    description:
      "Learn how WorktreeWise helps developers manage Git worktrees and boost productivity across multiple branches.",
    images: ["https://www.worktreewise.com/images/v1.2.0/dashboard.png"],
  },
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb pageName="About" />
      <AboutMe/>
    </>
  );
};

export default AboutPage;
