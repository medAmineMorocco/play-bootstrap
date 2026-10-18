import Link from "next/link";
import { pricingData } from "@/stripe/pricingData";
import { BranchIcon, BranchPaths, Eyebrow, ProductImage, TextLink, TrialLink } from "./Primitives";
import { ProCheckout, SavingsCalculator, TerminalStoryVisual, TrialButton, WorktreeLifecycleStory } from "./Interactions";
import { faqs } from "./content";
import styles from "./landing.module.css";

function Hero() {
  return <section id="home" className={styles.hero}><BranchPaths /><div className={styles.container}>
    <div className={styles.heroCopy}><a href="#product" target="_self" className={styles.release}><span />A little more room for every branch<span aria-hidden="true">↗</span></a><Eyebrow>The workspace for parallel development</Eyebrow><h1>Stop switching branches.<br /><em>Work in parallel.</em></h1><p>A Git worktree manager for everything you’re building.<br className={styles.desktopBreak} /> Create, organize, and open your branches. Keep every task in its own workspace.</p><div className={styles.actions}><TrialLink /><a className={styles.secondaryButton} href="#how-it-works" target="_self"><span aria-hidden="true">↓</span>See how it works</a></div><p className={styles.reassurance}>5-day free trial <span>·</span> No credit card <span>·</span> Windows, macOS & Linux</p></div>
    <div className={styles.heroProduct}><div className={styles.productLabel}><span><BranchIcon />ONE REPOSITORY. EVERY BRANCH IN REACH.</span><span>WORKTREEWISE / 1.2</span></div><div className={styles.heroImage}><ProductImage file="dashboard.png" alt="WorktreeWise dashboard showing the repository worktrees and commit graph" priority /></div><div className={styles.floatingDetail}><span className={styles.detailDot} /><div><strong>Your work stays right here.</strong><span>Separate branches. Separate working directories.</span></div><BranchIcon /></div></div>
    <ul className={styles.trustBar}><li><BranchIcon />Native Git</li><li>Windows · macOS · Linux</li><li>Your IDE, your choice</li><li>Parallel workspaces</li><li>No repository migration</li></ul>
  </div></section>;
}

function ParallelDevelopment() {
  return <section id="how-it-works" className={styles.section}><div className={`${styles.container} ${styles.split}`}><div><Eyebrow>01 / A different way to branch</Eyebrow><h2>Development is parallel.<br /><span className={styles.mutedHeading}>Your workspace<br />should be, too.</span></h2><p className={styles.body}>A feature in progress. A bug that can’t wait. A pull request to review. Git worktrees give each one a separate directory, sharing the same repository.</p><p className={styles.body}>WorktreeWise keeps them all within reach. Pick up where you left off.</p><TextLink href="/git-worktree">Get to know Git worktrees</TextLink></div><div className={styles.comparison}><div className={styles.before}><p className={styles.mono}>ONE DIRECTORY / ONE THING AT A TIME</p><div className={styles.commandLoop}><span>stash</span>→<span>checkout</span>→<span>restore</span>↺</div><p>Put one task down to pick another up.</p></div><div className={styles.after}><p className={styles.mono}>WITH WORKTREEWISE / ROOM FOR EVERY TASK</p><div className={styles.branchRoot}><BranchIcon /><strong>your-repository</strong></div><ul className={styles.parallelRows}>{[["feature/auth", "Build the feature"], ["fix/payment", "Fix the bug"], ["review/pr-128", "Review the changes"], ["experiment/ui", "Try another approach"]].map(([branch, task]) => <li key={branch}><span className={styles.node} /><code>{branch}</code><span>{task}</span></li>)}</ul><div className={styles.diagramNote}><span />Separate directories. Open at the same time.</div></div></div></div></section>;
}

function ProductStories() {
  return <section id="product" className={styles.section}><div className={`${styles.container} ${styles.storyContainer}`}>
    <article className={styles.story}><div><Eyebrow>02 / Every worktree. One place.</Eyebrow><h2>A clear view.<br />A clean working set.</h2><p className={styles.body}>Create, rename, move, lock, repair, and prune Git worktrees visually. Spot dirty, detached, ahead, or behind worktrees before you dive back in.</p><ul className={styles.benefits}><li>Repository health and disk usage at a glance</li><li>Predictable folders with reusable naming patterns</li><li>Open a branch in your configured IDE or terminal</li></ul><TextLink href="/git-worktree">Explore worktree management</TextLink></div><div className={styles.managementVisual}><div className={styles.healthCrop}><span className={styles.mono}>YOUR REPOSITORY, AT A GLANCE</span><ProductImage file="landing-health.png" alt="WorktreeWise repository-wide worktree totals and status summary" width={1360} height={62} /></div><div className={styles.managementDetail}><div><BranchIcon /><h3>From branch<br />to workspace.</h3><p>All the everyday actions,<br />right where you work.</p></div><ProductImage file="actions.png" alt="WorktreeWise menu for opening, renaming, moving, locking, and repairing a worktree" width={255} height={452} /></div></div></article>
    <article className={`${styles.story} ${styles.storyReverse}`}><div className={styles.workflowVisual}><div className={styles.workflowGraph}><span className={styles.mono}>ANY BRANCH OR COMMIT → READY WORKSPACE</span><div><code>feature/auth</code><span aria-hidden="true">⑂</span><ul><li>pre-hook: git fetch</li><li>post-hook: npm install</li><li>sparse: selected folders</li></ul></div></div><ProductImage file="create-worktree-with-hooks.png" alt="WorktreeWise create worktree dialog with branch sources, hooks, directory patterns, and sparse checkout options" width={948} height={894} /></div><div><Eyebrow>03 / Ready in seconds. Configured your way.</Eyebrow><h2>Create in seconds.<br />Configured your way.</h2><p className={styles.body}>Spin up linked worktrees from HEAD, an existing branch, a tag, or a commit. Automate folder paths, run pre- and post-creation hooks, and check out only the files you need.</p><ul className={styles.benefits}><li>Create from HEAD, branches, tags, or commits</li><li>Pre- and post-creation hooks for repeatable setup</li><li>Predictable folder naming with sparse checkout and isolation</li></ul><TextLink href="/git-worktree/add">Explore worktree creation</TextLink></div></article>

    <WorktreeLifecycleStory />

    <article id="naming-patterns" className={`${styles.story} ${styles.storyReverse}`}>
      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span><BranchIcon />WORKTREE NAMING PATTERNS</span>
          <span className={styles.storyProductBadge}>AUTOMATED PATHS</span>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage file="change-naming-pattern.png" alt="WorktreeWise naming pattern dialog with dynamic placeholders and suggestions" width={1746} height={901} />
        </div>
      </div>
      <div>
        <Eyebrow>05 / Predictable naming patterns</Eyebrow>
        <h2>Automate folder paths.<br />Standardize your workspace.</h2>
        <p className={styles.body}>Define automated folder naming conventions for new worktrees. Use dynamic variables like <code>{`{repo}_wt_{branch}`}</code> or <code>{`{repo}_{branch}`}</code> to ensure consistent, predictable directory structures across your machine without manual path typing.</p>
        <ul className={styles.benefits}>
          <li>Dynamic placeholders for repository name, branch, and worktree id</li>
          <li>Instant dropdown suggestions for common directory standards</li>
          <li>Keep multiple projects organized with zero directory path collisions</li>
        </ul>
        <TextLink href="/git-worktree/add">Explore worktree naming</TextLink>
      </div>
    </article>

    <article id="worktree-config" className={styles.story}>
      <div>
        <Eyebrow>06 / Per-worktree Git config</Eyebrow>
        <h2>Separate identities.<br />One clean repository.</h2>
        <p className={styles.body}>Isolate Git configuration values to individual worktrees without modifying global or repository defaults. Keep work and personal commit emails, custom signing keys, or branch-specific configurations isolated to each workspace.</p>
        <ul className={styles.benefits}>
          <li>Branch-specific <code>user.name</code> and <code>user.email</code> configurations</li>
          <li>Powered natively by Git’s <code>extensions.worktreeConfig</code></li>
          <li>Never accidentally commit to a team repository with the wrong email or identity</li>
        </ul>
        <TextLink href="/git-worktree/environment-isolation">Understand Git isolation</TextLink>
      </div>
      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span><span aria-hidden="true">&#9881; </span>PER-WORKTREE GIT CONFIG</span>
          <span className={styles.storyProductBadge}>CONFIG ISOLATION</span>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage file="per-gitworktree-config.png" alt="WorktreeWise per-worktree Git config dialog for isolated user identity and settings" width={1747} height={900} />
        </div>
      </div>
    </article>

    <article id="repair" className={`${styles.story} ${styles.storyReverse}`}>
      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span><span aria-hidden="true">&#9888; </span>HEALTH &amp; REPAIR</span>
          <span className={styles.storyProductBadge}>SELF-HEALING</span>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage file="repair-worktree.png" alt="WorktreeWise repairing broken Git worktree links from the context menu" width={1744} height={902} />
        </div>
      </div>
      <div>
        <Eyebrow>07 / One-click link repair</Eyebrow>
        <h2>Moved a folder?<br />Heal broken links instantly.</h2>
        <p className={styles.body}>Moving repository or worktree folders on disk breaks Git’s bidirectional administrative pointers. WorktreeWise detects damaged worktrees with visual warnings and reconnects them with a single click.</p>
        <ul className={styles.benefits}>
          <li>Real-time visual detection of broken <code>.git</code> pointers and missing administrative metadata</li>
          <li>1-click <code>git worktree repair</code> reconnects main repository and linked directories</li>
          <li>Context menu action accessible directly from the worktrees sidebar</li>
        </ul>
        <TextLink href="/git-worktree/repair">Read the repair guide</TextLink>
      </div>
    </article>

    <article id="prune" className={styles.story}>
      <div>
        <Eyebrow>08 / Prune stale worktrees</Eyebrow>
        <h2>Clean ghost records.<br />Free locked branches.</h2>
        <p className={styles.body}>Deleting worktree directories manually leaves behind orphaned Git metadata, preventing you from checking out that branch again. Review damaged worktrees and safely prune stale records in batch.</p>
        <ul className={styles.benefits}>
          <li>Diagnostic inspection shows why each orphaned worktree requires attention</li>
          <li>Safely removes stale administrative files without touching active branches</li>
          <li>Immediately release locked branches so you can check them out again</li>
        </ul>
        <TextLink href="/git-worktree/prune">Read the prune guide</TextLink>
      </div>
      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span><span aria-hidden="true">&#10006; </span>STALE METADATA CLEANUP</span>
          <span className={styles.storyProductBadge}>PRUNE WORKTREES</span>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage file="prune-worktrees.png" alt="WorktreeWise dialog for reviewing and pruning damaged or stale worktrees" width={1746} height={901} />
        </div>
      </div>
    </article>
  </div></section>;
}

const supportedAgents = ["Claude Code", "Cursor", "Codex", "Antigravity", "Qwen", "Kimi", "OpenCode"];
const supportedShells = [
  "Windows PowerShell",
  "Git Bash",
  "Command Prompt (CMD)",
  "WSL Bash",
  "POSIX sh",
  "PowerShell 7",
  "Fish Shell",
  "Zsh",
  "GNU Bash",
  "Nushell",
  "Custom Shell Path",
];

function WorkspaceStories() {
  return <section id="workspace" className={styles.section}><div className={`${styles.container} ${styles.storyContainer}`}>
    <article id="git" className={`${styles.story} ${styles.storyReverse}`}>
      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span><BranchIcon />GIT CONTEXT &amp; LOG</span>
          <span className={styles.storyProductBadge}>WORKTREEWISE / 1.2</span>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage file="git-log-columns.png" alt="WorktreeWise Git Log with commit graph and branch labels" width={1746} height={901} />
        </div>
      </div>
      <div>
        <Eyebrow>09 / Visual Git context</Eyebrow>
        <h2>Your branches,<br />with the full picture.</h2>
        <p className={styles.body}>See the commit graph and keep each worktree’s Git context close to the work. Follow branch topology, compare commits, and inspect history without leaving your active workspace.</p>
        <ul className={styles.benefits}>
          <li>Visual commit graph with branch labels, tags, and HEAD indicators</li>
          <li>Follow branch divergence and inspect commit differences</li>
          <li>Keep Git context close to your working tree</li>
        </ul>
        <TextLink href="/git-worktree/comparisons">Explore Git comparisons</TextLink>
      </div>
    </article>

    <article id="terminal" className={styles.story}>
      <div>
        <Eyebrow>10 / Terminal workspace</Eyebrow>
        <h2>The right directory.<br />Every time.</h2>
        <p className={styles.body}>Open multiple terminal panes rooted in their worktrees. Arrange sessions in a flexible grid, run dev servers, builds, and tests side by side without directory mix-ups.</p>
        <div className={styles.agentTags} aria-label="Supported terminal shells">
          <span className={styles.agentTagsLabel}>Shells:</span>
          {supportedShells.map(shell => <span key={shell} className={styles.agentTag}><span className={styles.agentTagDot} aria-hidden="true" />{shell}</span>)}
        </div>
        <ul className={styles.benefits}>
          <li>Automatically rooted in each worktree’s own directory</li>
          <li>Flexible split panes and customizable multi-terminal layouts</li>
          <li>Auto-detects installed shells: PowerShell, Git Bash, CMD, WSL, POSIX sh, Zsh, Fish, Nushell, or custom shell path</li>
          <li>Run concurrent build steps, test suites, and dev servers</li>
        </ul>
        <TextLink href="/git-worktree">Explore terminal workflows</TextLink>
      </div>
      <TerminalStoryVisual />
    </article>

    <article id="agents" className={`${styles.story} ${styles.storyReverse}`}>
      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span><span aria-hidden="true">✳ </span>PARALLEL AI AGENT SESSIONS</span>
          <span className={styles.storyProductBadge}>MULTI-AGENT</span>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage file="open-in-ai-agent.png" alt="WorktreeWise AI agent workspace showing parallel coding agent sessions across worktrees" width={1920} height={993} />
        </div>
      </div>
      <div>
        <Eyebrow>11 / Worktrees for your coding agents</Eyebrow>
        <h2>Give every agent<br />its own branch.</h2>
        <p className={styles.body}>Run Claude Code, Cursor, Codex, Antigravity, Qwen, Kimi, OpenCode, and other supported coding agents side by side. Each gets its own working directory, so one task’s edits stay separate from another’s.</p>
        <div className={styles.agentTags} aria-label="Supported coding agents">
          <span className={styles.agentTagsLabel}>Compatible:</span>
          {supportedAgents.map(agent => <span key={agent} className={styles.agentTag}><span className={styles.agentTagDot} aria-hidden="true" />{agent}</span>)}
        </div>
        <ul className={styles.benefits}>
          <li>Independent working directories for each agent session</li>
          <li>Prevent merge conflicts and file collisions across tasks</li>
          <li>Compatible with your existing agent installations and accounts</li>
        </ul>
        <TextLink href="/ai-agents/git-worktrees">Build your parallel agent workflow</TextLink>
      </div>
    </article>

    <article id="browser" className={styles.story}>
      <div>
        <Eyebrow>12 / Embedded browser preview</Eyebrow>
        <h2>Keep your preview<br />beside your code.</h2>
        <p className={styles.body}>Open the embedded browser from your terminal workspace to inspect a development page alongside the current worktree. Check live UI updates and responsive behavior without juggling external windows.</p>
        <ul className={styles.benefits}>
          <li>Live localhost preview alongside terminal and code</li>
          <li>Inspect dev server pages and UI updates immediately</li>
          <li>Keep all tools for a branch organized in a single window</li>
        </ul>
        <TextLink href="/git-worktree">Explore workspace workflows</TextLink>
      </div>
      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span><span aria-hidden="true">▤ </span>INTEGRATED PREVIEW</span>
          <span className={styles.storyProductBadge}>EMBEDDED BROWSER</span>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage file="ai-agent-files-terminal-browser.png" alt="WorktreeWise embedded browser showing development preview beside terminal, files, and AI agent" width={1920} height={991} />
        </div>
      </div>
    </article>
  </div></section>;
}

function Capabilities() {
  return <section className={`${styles.section} ${styles.capabilities}`}><div className={styles.container}><div className={styles.sectionTop}><div><Eyebrow>The details make the difference</Eyebrow><h2>Fits the way<br />you already work.</h2></div><p className={styles.body}>Native Git underneath. Thoughtful tools around it. Keep your repository, your editor, and your habits.</p></div><div className={styles.bento}><article className={styles.bentoLarge}><span className={styles.mono}>GIT, IN FOCUS</span><h3>Follow the graph.<br />Compare the changes.</h3><p>Inspect Git history. Compare worktrees, branches, tags, and commits.</p><ProductImage file="dashboard.png" alt="WorktreeWise commit graph with branch labels and the Author column hidden" /><TextLink href="/git-worktree/comparisons">Explore Git comparisons</TextLink></article><article><BranchIcon /><h3>Only the files you need.</h3><p>Use sparse checkout to focus a worktree on selected parts of a repository.</p><TextLink href="/git-worktree/add">Explore worktree setup</TextLink></article><article><span className={styles.codeIcon} aria-hidden="true">{ "{ }" }</span><h3>Make setup repeatable.</h3><p>Environment isolation, shared node_modules where appropriate, and creation hooks for your project’s setup.</p><TextLink href="/git-worktree/environment-isolation">Understand isolation</TextLink></article><article className={styles.bentoWide}><div><span className={styles.mono}>YOUR EDITOR COMES WITH YOU</span><h3>Open a branch.<br />Feel at home.</h3><p>Launch your configured IDE. Use the JetBrains plugin to carry bookmarks, run configurations, and IDE context between worktrees.</p></div><div className={styles.editorNames}><span>VS Code <b>↗</b></span><span>JetBrains IDEs <b>↗</b></span><span>Your terminal <b>↗</b></span></div></article></div></div></section>;
}

export function Pricing({ checkout = false }: { checkout?: boolean }) {
  const pro = pricingData.find(plan => plan.id === "PRO");
  return <section id="pricing" className={styles.section}><div className={styles.container}><div className={styles.centerHeading}><Eyebrow>Your tools. Your terms.</Eyebrow><h2>Own your workflow.<br /><span className={styles.mutedHeading}>Pay once.</span></h2><p>12 months of updates included.<br />Keep your last supported version forever.</p></div><div className={styles.pricingGrid}><div className={styles.trialPlan}><span className={styles.mono}>TAKE IT FOR A SPIN</span><h3>Free trial</h3><div className={styles.price}>$0<span>/ 5 days</span></div><p>Try the complete workspace with your own repositories.</p><ul className={styles.benefits}><li>Explore the Pro features</li><li>No credit card required</li><li>Windows, macOS, and Linux</li></ul><TrialButton /></div><div className={styles.proPlan}><div className={styles.proPlanHeader}><span className={styles.mono}>MAKE IT YOURS</span><span className={styles.ownershipBadge}>ONE-TIME PURCHASE</span></div><h3>WorktreeWise Pro</h3><div className={styles.price}>{pro?.unit_amount ? `$${pro.unit_amount}` : "See current pricing"}<span>one time</span></div><p>Your complete toolkit for parallel Git development.</p><ul className={styles.proBenefits}>{pro?.offers.map(offer => <li key={offer}>{offer}</li>)}</ul><div className={styles.proPlanBottom}>{checkout ? <ProCheckout /> : <Link href="/pricing" target="_self" className={styles.primaryButton}>Get WorktreeWise Pro <span aria-hidden="true">↗</span></Link>}<span>12 months of updates.<br />Lifetime use of your supported version.</span></div></div></div><p className={styles.pricingNote}>No recurring payment required to keep using your supported version. {!checkout && <Link href="/pricing" target="_self">View full pricing details ↗</Link>}</p>{process.env.NEXT_PUBLIC_WORKTREES_BOOK_LANDING_PAGE_URL && <p className={styles.pricingNote}>Includes the <a href={process.env.NEXT_PUBLIC_WORKTREES_BOOK_LANDING_PAGE_URL}>Git Worktrees for Maximum Productivity</a> eBook with every paid package.</p>}</div></section>;
}

export function FAQ() {
  return <section id="faq" className={`${styles.section} ${styles.faq}`}><div className={`${styles.container} ${styles.faqGrid}`}><div><Eyebrow>A few good questions</Eyebrow><h2>Before you<br />branch out.</h2><p className={styles.body}>New to Git worktrees?<br />You’re in the right place.</p><TextLink href="/contact">Ask us a question</TextLink></div><div>{faqs.map(item => <details className={styles.faqItem} key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>;
}

function Resources({ posts }: { posts: { title: string; slug: string; excerpt?: string }[] }) {
  return <section className={`${styles.section} ${styles.resources}`}><div className={styles.container}><div className={styles.sectionTop}><div><Eyebrow>Keep exploring</Eyebrow><h2>A better way to Git.</h2></div><TextLink href="/blog">From the WorktreeWise blog</TextLink></div><div className={styles.resourceGrid}>{posts.slice(0, 3).map((post, index) => <Link key={post.slug} href={`/blog/${post.slug}`} target="_self"><span className={styles.mono}>FIELD NOTES / 0{index + 1}</span><h3>{post.title}</h3><span className={styles.textLink}>Read article <span aria-hidden="true">↗</span></span></Link>)}</div><div className={styles.guideLinks}><TextLink href="/git-worktree">Git worktree tutorials</TextLink><TextLink href="/git-worktree-cheat-sheet">Command cheat sheet</TextLink><TextLink href="/git-worktree/troubleshooting">Troubleshooting</TextLink></div></div></section>;
}

function FinalCTA() {
  const hasMultipleWindows = Boolean(
    process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_ARM64_EXE_URL ||
    process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_IA32_EXE_URL ||
    process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_32BIT_EXE_URL
  );
  const hasMultipleLinuxDeb = Boolean(process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_ARM64_DEB_URL);
  const hasMultipleLinuxRpm = Boolean(process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_ARM64_RPM_URL);

  const downloads = [
    [
      hasMultipleWindows ? "Windows · x64" : "Windows",
      process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_X64_EXE_URL || process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_EXE_URL,
    ],
    ["Windows · ARM64", process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_ARM64_EXE_URL],
    [
      "Windows · 32-bit",
      process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_IA32_EXE_URL || process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_32BIT_EXE_URL,
    ],
    [
      "macOS · Apple Silicon",
      process.env.NEXT_PUBLIC_DOWNLOAD_MAC_SILICON_URL || process.env.NEXT_PUBLIC_DOWNLOAD_MAC_ARM64_URL,
    ],
    [
      "macOS · Intel",
      process.env.NEXT_PUBLIC_DOWNLOAD_MAC_INTEL_URL || process.env.NEXT_PUBLIC_DOWNLOAD_MAC_X64_URL,
    ],
    [
      hasMultipleLinuxDeb ? "Linux · .deb (x64)" : "Linux · .deb",
      process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_X64_DEB_URL || process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_DEB_URL,
    ],
    ["Linux · .deb (ARM64)", process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_ARM64_DEB_URL],
    [
      hasMultipleLinuxRpm ? "Linux · .rpm (x64)" : "Linux · .rpm",
      process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_X64_RPM_URL || process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_RPM_URL,
    ],
    ["Linux · .rpm (ARM64)", process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_ARM64_RPM_URL],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return <section id="download" className={styles.finalCta}><BranchPaths /><div className={styles.container}><Eyebrow>Make room for what’s next</Eyebrow><h2>Stop switching.<br /><em>Start working in parallel.</em></h2><p>Your next branch deserves its own workspace.</p><TrialButton /><p className={styles.reassurance}>5-day free trial · No credit card required</p><div className={styles.downloadLinks} aria-label="Download WorktreeWise">{downloads.map(([name, href]) => <a href={href} key={name} target="_self">{name}<span aria-hidden="true">↓</span></a>)}</div></div></section>;
}

export default function LandingHome({ posts }: { posts: { title: string; slug: string; excerpt?: string }[] }) {
  return <div className={styles.landing}><Hero /><ParallelDevelopment /><ProductStories /><WorkspaceStories /><Capabilities /><SavingsCalculator /><Pricing /><FAQ /><Resources posts={posts} /><FinalCTA /></div>;
}
