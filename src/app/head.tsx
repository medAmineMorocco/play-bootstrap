import Script from "next/script";

export default function Head() {

  return (
    <>
      <title>
        WorktreeWise | Efficient Git Worktree Solution
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description"
            content="This SaaS Boilerplate and Starter Kit for Next.js is designed specifically for SaaS startups. It's a free resource complete with all the necessary integrations, pages, and components you require to build and launch a comprehensive SaaS website with robust features." />
      <link rel="icon" href="/images/favicon.ico" />
      <link rel="preconnect" href="https://static.hotjar.com" />
      <link rel="preconnect" href="https://script.hotjar.com" />
      <link rel="dns-prefetch" href="https://static.hotjar.com" />
      <link rel="dns-prefetch" href="https://script.hotjar.com" />
      <Script src="/js/accordion.js" strategy="afterInteractive" />

    </>
  );
}
