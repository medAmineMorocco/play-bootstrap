import { remark } from "remark";
import matter from "gray-matter";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const { content } = matter(markdown);
  const file = await remark()
    .use(() => (tree: any) => {
      // The page template owns the single article H1. Keep author-entered
      // top-level sections in a valid, accessible heading hierarchy.
      tree.children.forEach((node: any) => {
        if (node.type === "heading" && node.depth === 1) node.depth = 2;
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true }) // convert remark AST -> rehype AST
    .use(rehypeRaw)                                     // parse raw HTML found in markdown
    .use(rehypeStringify)                               // stringify to HTML
    .process(content);

  return String(file);
}
