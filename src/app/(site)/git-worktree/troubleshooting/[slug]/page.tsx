import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentArticlePage from "@/components/ContentHub/ContentArticlePage";
import { contentHubs, findArticle } from "@/data/contentHubs";

const hub = contentHubs.troubleshooting;
export function generateStaticParams() { return hub.articles.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = findArticle(hub, params.slug); if (!article) return {};
  return { title: `${article.title} | WorktreeWise`, description: `${article.title}: causes, safe diagnostic steps, Git commands, recovery options, and prevention guidance.`, keywords: [article.keyword], alternates: { canonical: `https://www.worktreewise.com${article.href}` } };
}
export default function Page({ params }: { params: { slug: string } }) { const article = findArticle(hub, params.slug); if (!article) notFound(); return <ContentArticlePage hub={hub} article={article} />; }
