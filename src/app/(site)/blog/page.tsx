import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "WorktreeWise Blog | Tips, Updates, and Best Practices for Worktree Management",
  description: "Explore the WorktreeWise blog for the latest insights, tips, and tutorials on managing Git worktrees. Stay updated with expert advice, best practices, and feature updates designed to help you streamline your development workflow and boost productivity.",
  openGraph: {
    title: "WorktreeWise Blog | Tips, Updates, and Best Practices for Worktree Management",
    description:
      "Explore the WorktreeWise blog for the latest insights, tips, and tutorials on managing Git worktrees. Stay updated with expert advice, best practices, and feature updates designed to help you streamline your development workflow and boost productivity.",
    url: "https://worktreewise.com/blog",
    siteName: "WorktreeWise",
    images: [
      {
        url: "/images/home/dashboard.avif",
        width: 1200,
        height: 630,
        alt: "WorktreeWise blog - Git worktree management insights",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorktreeWise Blog | Tips, Updates, and Best Practices for Worktree Management",
    description:
      "Explore the WorktreeWise blog for the latest insights, tips, and tutorials on managing Git worktrees. Stay updated with expert advice, best practices, and feature updates designed to help you streamline your development workflow and boost productivity.",
    images: ["/images/home/dashboard.avif"],
  },
};

const Blog = () => {
  const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <>
      <Breadcrumb pageName="Blog" />

      <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {posts.map((blog, i) => (
              <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <SingleBlog blog={blog} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
