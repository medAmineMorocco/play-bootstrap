"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Pricing/Modal";
import PaddleCheckout from "@/components/Pricing/PaddleCheckout";
import { pricingData } from "@/stripe/pricingData";
import { workspaceViews } from "./content";
import { BranchIcon, Eyebrow, ProductImage, TextLink } from "./Primitives";
import styles from "./landing.module.css";

export function WorkspaceExplorer() {
  const [active, setActive] = useState(0);
  const view = workspaceViews[active];
  return <div className={styles.workspaceExplorer}>
    <div className={styles.tabs} role="tablist" aria-label="Explore the worktree workspace">
      {workspaceViews.map((item, index) => <button key={item.name} id={`workspace-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls="workspace-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % workspaceViews.length;
        else if (event.key === "ArrowLeft") next = (index + workspaceViews.length - 1) % workspaceViews.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = workspaceViews.length - 1;
        else return;
        event.preventDefault(); setActive(next); document.getElementById(`workspace-tab-${next}`)?.focus();
      }}><span aria-hidden="true">{["⑂", ">_", "✳", "▤", "◎"][index]}</span>{item.name}</button>)}
    </div>
    <div id="workspace-panel" role="tabpanel" aria-labelledby={`workspace-tab-${active}`} tabIndex={0} className={styles.workspacePanel}>
      <div className={styles.workspaceCaption}><strong>{view.title}</strong><p>{view.text}</p></div>
      {view.image ? <div className={`${styles.workspaceImage} ${view.height >= 800 ? styles.fullWorkspaceImage : styles.detailWorkspaceImage}`}><Image src={`/images/v1.2.0/${view.image}`} alt={view.alt} width={view.width} height={view.height} sizes="(max-width: 767px) 90vw, 1100px" /></div> : <div className={styles.workspaceConcept}><BranchIcon /><span>One worktree</span><i aria-hidden="true" /><strong>{view.name === "Files" ? "File explorer + terminal + agent" : "Development page + terminal + agent"}</strong><p>Part of the same development workspace.</p><a href="https://docs.worktreewise.com/" target="_blank" rel="noreferrer">Explore the documentation ↗</a></div>}
    </div>
  </div>;
}

export function SavingsCalculator() {
  const [switches, setSwitches] = useState(10);
  // Same upper-bound scenario as the previous page: 20s vs 2s, 240 working days.
  const hours = switches * 18 * 240 / 3600;
  return <section className={`${styles.section} ${styles.roi}`} aria-labelledby="roi-title"><div className={`${styles.container} ${styles.roiGrid}`}>
    <div><Eyebrow>Less setup. More headspace.</Eyebrow><h2 id="roi-title">Small interruptions.<br />A real cost.</h2><p className={styles.body}>Stash, switch, restore, repeat. See how the seconds spent changing context can add up.</p><label className={styles.rangeLabel} htmlFor="switches">Branch switches per day <strong>{switches}</strong></label><input id="switches" type="range" min="0" max="10" value={switches} onChange={event => setSwitches(Number(event.target.value))} /><div className={styles.rangeEnds}><span>0 switches</span><span>10 switches</span></div></div>
    <div className={styles.savingsResult}><p className={styles.mono}>ILLUSTRATIVE TIME SAVED / YEAR</p><output htmlFor="switches" aria-live="polite"><strong>{Number(hours.toFixed(1))}</strong><span>hours</span></output><div className={styles.savingsBars}><div><span>Switching branches</span><b>{switches * 20}s / day</b><i style={{ width: `${switches * 10}%` }} /></div><div><span>Opening ready worktrees</span><b>{switches * 2}s / day</b><i style={{ width: `${switches}%` }} /></div></div><p className={styles.small}>An estimate, not a benchmark. Assumes 20 seconds per branch switch, 2 seconds per ready worktree, and 240 working days. Setup time and results vary.</p></div>
  </div></section>;
}

export function TrialButton() {
  return <div className={styles.trialButton}><Modal SUBSCRIPTION_URL={process.env.NEXT_PUBLIC_SUBSCRIPTIONS_URL || ""} label="Start Free Trial" /></div>;
}

export function ProCheckout() {
  const pro = pricingData.find(plan => plan.id === "PRO");
  return <div className={styles.trialButton}>{pro?.productIds ? <PaddleCheckout productIds={pro.productIds} paddleToken={process.env.NEXT_PUBLIC_PADDLE_TOKEN} /> : <a className={styles.primaryButton} href="/contact" target="_self">Ask about Pro ↗</a>}</div>;
}

export function TerminalStoryVisual() {
  const [activeTab, setActiveTab] = useState<"terminals" | "shells">("terminals");

  return (
    <div className={styles.storyProductVisual}>
      <div className={styles.storyProductHeader}>
        <span>
          <span aria-hidden="true">&gt;_ </span>
          {activeTab === "terminals" ? "PARALLEL TERMINALS" : "SHELL & ENVIRONMENT"}
        </span>
        <div className={styles.visualTabGroup} role="tablist" aria-label="Terminal views">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "terminals"}
            className={`${styles.visualTabBtn} ${activeTab === "terminals" ? styles.visualTabBtnActive : ""}`}
            onClick={() => setActiveTab("terminals")}
          >
            Multi-Pane
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "shells"}
            className={`${styles.visualTabBtn} ${activeTab === "shells" ? styles.visualTabBtnActive : ""}`}
            onClick={() => setActiveTab("shells")}
          >
            Shell Settings
          </button>
        </div>
      </div>
      <div className={styles.storyProductImage}>
        {activeTab === "terminals" ? (
          <ProductImage
            file="open-in-terminal.png"
            alt="WorktreeWise terminal workspace showing multiple terminal panes arranged in parallel worktrees"
            width={1920}
            height={991}
          />
        ) : (
          <ProductImage
            file="shell-configuration.png"
            alt="WorktreeWise shell and terminal environment settings with auto-detected shells: PowerShell, Git Bash, CMD, WSL, POSIX sh, PowerShell 7, Fish, Zsh, Bash, and Nushell"
            width={1920}
            height={989}
          />
        )}
      </div>
    </div>
  );
}

export const actionTabs = [
  {
    id: "rename",
    label: "Rename",
    icon: "✎",
    badge: "FOLDER & BRANCH SYNC",
    file: "rename-worktree.png",
    alt: "Rename Git worktree folder and associated branch in WorktreeWise",
    summary: "Rename worktree directories and their linked Git branches simultaneously without desynchronization.",
    guideLink: "/git-worktree/move",
  },
  {
    id: "move",
    label: "Move",
    icon: "📁",
    badge: "RELOCATE DIRECTORY",
    file: "move-worktree.png",
    alt: "Move Git worktree to a new folder destination in WorktreeWise",
    summary: "Relocate a worktree folder anywhere on your disk while automatically re-pointing internal Git pointers.",
    guideLink: "/git-worktree/move",
  },
  {
    id: "delete",
    label: "Delete",
    icon: "✕",
    badge: "SAFE DELETION",
    file: "delete-worktree.png",
    alt: "Safely delete Git worktree with branch retention options in WorktreeWise",
    summary: "Safely remove worktrees with protections against uncommitted changes, or delete both worktree and local branch.",
    guideLink: "/git-worktree/remove",
  },
  {
    id: "lock",
    label: "Lock",
    icon: "🔒",
    badge: "PROTECT WORKTREE",
    file: "lock-worktree-reason.png",
    alt: "Lock Git worktree with optional reason to prevent pruning in WorktreeWise",
    summary: "Lock a worktree with an optional explanation string to protect it from automatic pruning during builds or cleanup.",
    guideLink: "/git-worktree/lock",
  },
  {
    id: "unlock",
    label: "Unlock",
    icon: "🔓",
    badge: "RELEASE SHIELD",
    file: "unlock-worktree.png",
    alt: "Unlock protected Git worktree in WorktreeWise",
    summary: "Release locks on completed branches so they can be pruned, relocated, or safely deleted.",
    guideLink: "/git-worktree/unlock",
  },
];

export function WorktreeLifecycleStory() {
  const [activeId, setActiveId] = useState("rename");
  const current = actionTabs.find((t) => t.id === activeId) || actionTabs[0];

  return (
    <article id="actions" className={styles.story}>
      <div>
        <Eyebrow>04 / Full worktree lifecycle</Eyebrow>
        <h2>Rename, move, delete,<br />lock &amp; unlock.</h2>
        <p className={styles.body}>
          Manage every phase of your worktree visually. Move directories across drives, synchronize folder and branch renames, and shield worktrees against accidental pruning.
        </p>

        <div className={styles.actionPills} role="tablist" aria-label="Worktree everyday actions">
          {actionTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeId === tab.id}
              className={`${styles.actionPill} ${activeId === tab.id ? styles.actionPillActive : ""}`}
              onClick={() => setActiveId(tab.id)}
            >
              <span aria-hidden="true">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.actionDetailBox}>
          <div className={styles.actionDetailHeader}>
            <span className={styles.mono}>{current.badge}</span>
            <span className={styles.actionDetailCmd}>git worktree {current.id === "rename" ? "move" : current.id}</span>
          </div>
          <p>{current.summary}</p>
        </div>

        <ul className={styles.benefits}>
          <li>Automatic updating of internal <code className={styles.inlineCode}>.git</code> pointers</li>
          <li>Protects against data loss when uncommitted changes exist</li>
          <li>1-click actions from the worktree sidebar context menu</li>
        </ul>

        <TextLink href={current.guideLink}>Read the {current.label.toLowerCase()} guide</TextLink>
      </div>

      <div className={styles.storyProductVisual}>
        <div className={styles.storyProductHeader}>
          <span>
            <span aria-hidden="true">{current.icon} </span>
            {current.label.toUpperCase()} WORKTREE
          </span>
          <div className={styles.visualTabGroup} role="tablist" aria-label="Worktree action tabs">
            {actionTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeId === tab.id}
                className={`${styles.visualTabBtn} ${activeId === tab.id ? styles.visualTabBtnActive : ""}`}
                onClick={() => setActiveId(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.storyProductImage}>
          <ProductImage
            file={current.file}
            alt={current.alt}
            width={1746}
            height={901}
          />
        </div>
      </div>
    </article>
  );
}
