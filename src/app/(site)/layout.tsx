import type { ReactNode } from "react";
import "@/styles/editorial.css";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <div id="main-content" className="editorial-site">{children}</div>;
}
