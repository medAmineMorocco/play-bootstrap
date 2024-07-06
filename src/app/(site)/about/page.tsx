import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Team from "@/components/Team";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "About Us | WorktreeWise",
  description: "This is About page description",
};

const AboutPage = () => {
  return (
    <main>
      <Breadcrumb pageName="About Us Page" />
      <About />
    </main>
  );
};

export default AboutPage;
