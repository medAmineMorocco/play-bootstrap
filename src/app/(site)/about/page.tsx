import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import AboutMe from "@/components/AboutMe";

export const metadata: Metadata = {
  title:
    "WorktreeWise About | Discover the Story Behind the Creator and the Product",
  description: "Discover the story behind WorktreeWise, a Git worktree management tool built by a solo developer. Learn why WorktreeWise was created, meet the creator, and explore the mission to simplify development workflows.",
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
