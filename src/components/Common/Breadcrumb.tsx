import Link from "next/link";
export default function Breadcrumb({ pageName, pageDescription }: { pageName: string; pageDescription?: string }) {
  return <div className="editorial-intro"><div className="container"><nav aria-label="Breadcrumb"><Link href="/" target="_self">WorktreeWise</Link><span aria-hidden="true">/</span><span>{pageName}</span></nav><h1>{pageName}</h1>{pageDescription && <p>{pageDescription}</p>}<div className="intro-branch" aria-hidden="true"><i /><i /><i /></div></div></div>;
}
