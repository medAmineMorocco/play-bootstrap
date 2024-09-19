import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Tutorials from "@/components/Tutorials";

export const metadata: Metadata = {
  title:
    "WorktreeWise Documentation | Learn How to Manage Worktrees Efficiently",
  description: "Explore the WorktreeWise documentation page featuring a curated list of onboarding videos. Learn how to efficiently manage Git worktrees with step-by-step guides and tutorials designed to help new users get started quickly and make the most of WorktreeWise’s features.",
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
