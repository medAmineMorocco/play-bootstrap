import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Tutorials from "@/components/Tutorials";

export const metadata: Metadata = {
  title:
    "Tutorials | WorktreeWise",
  description: "This is Tutorials page description",
};

const TutorialsPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Documentation Page" />
      <Tutorials />
    </main>
  );
};

export default TutorialsPage;
