import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "WorktreeWise Contact | Get in Touch with Our Team",
  description: "Get in touch with the WorktreeWise team through our contact page. Whether you have questions, need support, or want to provide feedback, we’re here to help. Reach out to us for any inquiries or assistance to enhance your experience with WorktreeWise.",
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
