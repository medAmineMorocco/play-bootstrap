import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentArticlePage from "@/components/ContentHub/ContentArticlePage";
import { contentHubs, findArticle } from "@/data/contentHubs";

const hub = contentHubs["ai-agents"];
export function generateStaticParams() { return hub.articles.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = findArticle(hub, params.slug); if (!article) return {};
  return { title: `${article.title} | WorktreeWise`, description: `${article.title}: isolate branches, run coding agents in parallel, review changes, and avoid shared-directory conflicts.`, keywords: [article.keyword], alternates: { canonical: `https://www.worktreewise.com${article.href}` } };
}
export default function Page({ params }: { params: { slug: string } }) { const article = findArticle(hub, params.slug); if (!article) notFound(); return <ContentArticlePage hub={hub} article={article} />; }
