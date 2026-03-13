import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contact WorktreeWise | Support & Feedback",
  description: "Need help or have feedback? Contact the WorktreeWise team — we’re here to help you manage Git worktrees efficiently and improve your workflow.",
  alternates: {
    canonical: "https://www.worktreewise.com/contact",
  },
  openGraph: {
    title: "Contact WorktreeWise | Support & Feedback",
    description:
      "Reach out to the WorktreeWise team for help, support, or feedback about managing Git worktrees efficiently.",
    url: "https://www.worktreewise.com/contact",
    siteName: "WorktreeWise",
    images: [
      {
        url: "https://www.worktreewise.com/images/home/dashboard.avif",
        width: 1200,
        height: 630,
        alt: "Contact WorktreeWise - Git worktree management solution",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact WorktreeWise | Support & Feedback",
    description:
      "Have questions or feedback? Contact WorktreeWise — your Git worktree productivity partner.",
    images: ["https://www.worktreewise.com/images/home/dashboard.avif"],
  },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb pageName="Contact Us" />

      <Contact />
    </>
  );
};

export default ContactPage;
