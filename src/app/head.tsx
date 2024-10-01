import Script from "next/script";

export default function Head() {

  return (
    <>
      <title>
        WorktreeWise | Efficient Git Worktree Solution
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description"
            content="Effortlessly manage your Git worktrees with WorktreeWise. Including features to add and remove git worktrees, open them in your favorite editor, change their locations, and more. All these capabilities work together to enhance your productivity and streamline your development process." />
      <link rel="icon" href="/images/favicon.ico" />
      <link rel="preconnect" href="https://static.hotjar.com" />
      <link rel="preconnect" href="https://script.hotjar.com" />
      <link rel="dns-prefetch" href="https://static.hotjar.com" />
      <link rel="dns-prefetch" href="https://script.hotjar.com" />
      <Script src="/js/accordion.js" strategy="afterInteractive" />
    </>
  );
}
