import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentArticlePage from "@/components/ContentHub/ContentArticlePage";
import { contentHubs, gitWorktreeArticles } from "@/data/contentHubs";

export function generateStaticParams() { return gitWorktreeArticles.map(({ slug }) => ({ slug })); }
const resolve = (slug: string) => {
  const hub = contentHubs.isolation.articles.some((item) => item.slug === slug) ? contentHubs.isolation : contentHubs.comparisons;
  return { hub, article: hub.articles.find((item) => item.slug === slug) };
};
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const { article } = resolve(params.slug); if (!article) return {};
  return { title: `${article.title} | WorktreeWise`, description: `A practical guide to ${article.keyword}, including setup, tradeoffs, safe workflows, and WorktreeWise support.`, keywords: [article.keyword], alternates: { canonical: `https://www.worktreewise.com${article.href}` } };
}
export default function Page({ params }: { params: { slug: string } }) { const { hub, article } = resolve(params.slug); if (!article) notFound(); return <ContentArticlePage hub={hub} article={article} />; }
