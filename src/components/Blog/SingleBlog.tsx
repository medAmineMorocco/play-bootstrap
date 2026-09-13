import { Blog } from "@/types/blog";
import { format } from "date-fns";
import Link from "next/link";
export default function SingleBlog({ blog }: { blog: Blog }) {
  const { title, coverImage, excerpt, date, slug } = blog;
  return <article className="editorial-article-card"><Link href={`/blog/${slug}`} target="_self" tabIndex={-1} aria-hidden="true" className="article-cover"><img src={coverImage!} alt="" loading="lazy" width={408} height={272} /></Link><time dateTime={date}>{format(new Date(date), "dd MMM yyyy")}</time><h3><Link href={`/blog/${slug}`} target="_self">{title}</Link></h3><p>{excerpt}</p><Link href={`/blog/${slug}`} target="_self" className="article-read" aria-label={`Read ${title}`}>Read article <span aria-hidden="true">↗</span></Link></article>;
}
