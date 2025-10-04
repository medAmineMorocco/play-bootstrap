import { remark } from "remark";
import matter from "gray-matter";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const { content } = matter(markdown);
  const file = await remark()
    .use(remarkRehype, { allowDangerousHtml: true }) // convert remark AST -> rehype AST
    .use(rehypeRaw)                                     // parse raw HTML found in markdown
    .use(rehypeStringify)                               // stringify to HTML
    .process(content);

  return String(file);
}
