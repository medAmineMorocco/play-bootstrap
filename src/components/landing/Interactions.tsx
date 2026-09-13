"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Pricing/Modal";
import PaddleCheckout from "@/components/Pricing/PaddleCheckout";
import { pricingData } from "@/stripe/pricingData";
import { workspaceViews } from "./content";
import { BranchIcon, Eyebrow } from "./Primitives";
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
      {view.image ? <div className={`${styles.workspaceImage} ${active === 0 ? styles.fullWorkspaceImage : styles.detailWorkspaceImage}`}><Image src={`/images/v1.1.0/${view.image}`} alt={view.alt} width={view.width} height={view.height} sizes="(max-width: 767px) 90vw, 1100px" /></div> : <div className={styles.workspaceConcept}><BranchIcon /><span>One worktree</span><i aria-hidden="true" /><strong>{view.name === "Files" ? "File explorer + terminal + agent" : "Development page + terminal + agent"}</strong><p>Part of the same development workspace.</p><a href="https://docs.worktreewise.com/" target="_blank" rel="noreferrer">Explore the documentation ↗</a></div>}
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
