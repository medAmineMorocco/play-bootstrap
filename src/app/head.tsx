import Script from "next/script";

const CHAT_BOT_ID = process.env.CHAT_BOT_ID;

export default function Head() {

  return (
    <>
      <title>
        WorktreeWise | Powerful Git Worktrees Manager & GUI
      </title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description"
            content="Effortlessly manage your Git worktrees with WorktreeWise. Including features to add and remove git worktrees, open them in your favorite editor, change their locations, and more. All these capabilities work together to enhance your productivity and streamline your development process." />
      <meta name="keywords"
            content="worktreewise, git worktree, git diff, git worktree add, git-worktree, git worktree remove, git worktree example, git worktree tutorial, how to use git worktree, what is git worktree" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="preconnect" href="https://static.hotjar.com" />
      <link rel="preconnect" href="https://script.hotjar.com" />
      <link rel="dns-prefetch" href="https://static.hotjar.com" />
      <link rel="dns-prefetch" href="https://script.hotjar.com" />
      <Script src="/js/accordion.js" strategy="afterInteractive" />
      <base target="_blank"></base>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QW2VLL0LDE');
          `}
      </Script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "WorktreeWise",
                alternateName: [
                  "Git Worktree Manager",
                  "Worktree Wise",
                  "Work Tree Wise",
                  "WorktreeWise App",
                  "WorktreeWise Tool",
                  "WorktreeWise Saas",
                  "WTW",
                  "WTWise",
                  "worktreewise",
                  "worktree wise",
                  "WorktreWise",
                  "WorktTreeWise"
                ],
                url: "https://www.worktreewise.com/",
                logo: "https://www.worktreewise.com/images/logo/favicon.ico",
                description: "WorktreeWise is a Git worktrees manager and GUI that lets developers work on multiple branches at the same time, run workflows across worktrees, and open them in their favorite IDE to boost productivity.",
                email: "contact@worktreewise.com",
                foundingDate: "2025-11-01",
                founder: {
                  "@type": "Person",
                  name: "Mohamed Amine Ammach"
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "contact@worktreewise.com",
                  url: "https://www.worktreewise.com/contact"
                },
                sameAs: [
                  "https://x.com/worktreewise",
                  "https://www.linkedin.com/company/worktreewise",
                  "https://www.youtube.com/channel/UCGerIbGUUoxoTraUVkXs7DA",
                  "https://docs.worktreewise.com/"
                ]
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.worktreewise.com/#software",
                name: "WorktreeWise",
                applicationCategory: "DeveloperTools",
                operatingSystem: "Windows, macOS, Linux",
                url: "https://www.worktreewise.com/",
                description: "WorktreeWise helps you easily manage Git worktrees.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "ratingCount": "1200"
                },

                "offers": {
                  "@type": "Offer",
                  "price": "46",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                sameAs: [
                  "https://x.com/worktreewise",
                  "https://www.linkedin.com/company/worktreewise",
                  "https://www.youtube.com/channel/UCGerIbGUUoxoTraUVkXs7DA",
                  "https://docs.worktreewise.com/"
                ],
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://www.worktreewise.com/"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is WorktreeWise?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "WorktreeWise is a powerful Git worktree manager that helps developers create, manage, and automate multiple Git worktrees with ease. It simplifies workflows across repositories, allowing you to work on multiple branches without repeated cloning or setup."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Why should I use WorktreeWise instead of managing worktrees manually?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Managing worktrees manually through the Git CLI can be time-consuming and error-prone. WorktreeWise provides a visual interface to create, rename, move, delete, and automate worktrees in just a few clicks—saving time and reducing mistakes."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is the best Git worktree manager for developers?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "WorktreeWise is one of the best Git worktree managers for developers who use multiple branches or repositories. It provides a visual interface to create, switch, and manage worktrees without using complex Git commands, helping you work faster and more efficiently."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I automate Git commands across worktrees?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. WorktreeWise lets you automate Git commands and scripts across selected or all worktrees. You can create reusable workflows, run them sequentially or in parallel, and monitor their execution logs in real time."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is WorktreeWise compatible with all operating systems?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. WorktreeWise works on Windows, macOS, and Linux, offering the same seamless experience across all platforms."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does WorktreeWise support workflows across multiple worktrees?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. WorktreeWise allows you to run workflows sequentially or in parallel across multiple worktrees, visualize execution logs, and import or duplicate workflows from other repositories."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How is WorktreeWise different from using the Git CLI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unlike the Git CLI, which requires manual setup for each branch, WorktreeWise manages multiple branches and repositories visually. It saves configuration, bookmarks, and editor settings automatically, reducing setup time and improving productivity."
                    }
                  }
                ]
              }
            ]
          }),
        }}
      />

      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" />
      <script
        async
        src="https://app.fastbots.ai/embed.js"
        data-bot-id={CHAT_BOT_ID}
      />
    </>
  );
}
