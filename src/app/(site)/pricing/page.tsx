import Breadcrumb from "@/components/Common/Breadcrumb";
import Faq from "@/components/Faq";
import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "WorktreeWise Pricing Plans | Choose the Right Plan for You",
  description: "Discover the pricing options for WorktreeWise and find the perfect plan for your needs. Explore our flexible subscription tiers, features included in each plan, and choose the best fit for managing your Git worktrees efficiently. Get started with WorktreeWise today and enhance your development workflow.",
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb pageName="Plans & Pricing" />
      <Pricing />
      <Faq />
    </>
  );
};

export default PricingPage;
