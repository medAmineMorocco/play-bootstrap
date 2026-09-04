import Link from "next/link";
import type { ContentHub } from "@/data/contentHubs";

export default function ContentHubPage({ hub }: { hub: ContentHub }) {
  return (
    <main className="pb-20 pt-28 sm:pt-32">
      <section className="container">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{hub.eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">{hub.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-body-color dark:text-dark-6">{hub.description}</p>
      </section>
      <section className="container mt-12" aria-labelledby={`${hub.key}-articles`}>
        <h2 id={`${hub.key}-articles`} className="text-2xl font-bold text-dark dark:text-white">Explore {hub.label}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hub.articles.map((article) => (
            <Link key={article.href} href={article.href} className="group rounded-2xl border border-stroke bg-white p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl dark:border-dark-3 dark:bg-dark-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">{article.keyword}</p>
              <h3 className="mt-3 text-xl font-bold text-dark group-hover:text-primary dark:text-white">{article.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body-color dark:text-dark-6">Learn the practical workflow, common pitfalls, and the safest way to handle this Git worktree scenario.</p>
              <span className="mt-5 inline-flex font-semibold text-primary">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
