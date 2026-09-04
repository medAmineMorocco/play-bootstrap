import React from "react";

export function SharedRepoDiagram() {
  return (
    <div className="my-8 rounded-xl border border-slate-800 bg-slate-900 p-6 text-white shadow-md">
      <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Architecture: Shared Object Database (.git) vs Isolated Working Directories
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-950/60 p-4 text-center">
          <span className="font-mono text-xs text-indigo-300">~/projects/my-app</span>
          <span className="mt-1 font-bold text-white">Main Worktree</span>
          <span className="mt-2 rounded bg-indigo-500/30 px-2 py-0.5 font-mono text-[11px] text-indigo-200">
            branch: [main]
          </span>
          <span className="mt-2 text-[11px] text-slate-300">Has actual .git folder</span>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-950/60 p-4 text-center">
          <span className="font-mono text-xs text-emerald-300">~/projects/feature-auth</span>
          <span className="mt-1 font-bold text-white">Linked Worktree #1</span>
          <span className="mt-2 rounded bg-emerald-500/30 px-2 py-0.5 font-mono text-[11px] text-emerald-200">
            branch: [feature/auth]
          </span>
          <span className="mt-2 text-[11px] text-slate-300">.git is a pointer file</span>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg border border-amber-500/40 bg-amber-950/60 p-4 text-center">
          <span className="font-mono text-xs text-amber-300">~/projects/hotfix-login</span>
          <span className="mt-1 font-bold text-white">Linked Worktree #2</span>
          <span className="mt-2 rounded bg-amber-500/30 px-2 py-0.5 font-mono text-[11px] text-amber-200">
            branch: [hotfix/login]
          </span>
          <span className="mt-2 text-[11px] text-slate-300">.git is a pointer file</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-950 p-4 text-center">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>All linked worktrees share the same central Git storage</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <p className="mt-2 font-mono text-xs text-slate-200">
          .git/objects (commits, trees, blobs) • .git/refs • .git/config
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          Zero duplicate history downloaded. Instant creation. Zero wasted disk space.
        </p>
      </div>
    </div>
  );
}

export function WorkflowComparisonDiagram() {
  return (
    <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Traditional */}
      <div className="rounded-xl border border-rose-500/30 bg-slate-900 p-5 text-white shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="text-sm font-bold text-rose-400">
            Traditional Workflow (git checkout / switch)
          </h4>
          <span className="rounded bg-rose-500/20 px-2 py-0.5 text-xs font-semibold text-rose-300">
            Single Folder
          </span>
        </div>
        <div className="mt-4 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-rose-400 font-bold">1.</span> Working on <strong className="text-white">feature-a</strong>
          </div>
          <div className="text-center text-slate-400 text-xs">↓ Urgent bug reported!</div>
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-rose-400 font-bold">2.</span> <code className="text-amber-300">git stash save</code> or half-baked commit
          </div>
          <div className="text-center text-slate-400 text-xs">↓</div>
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-rose-400 font-bold">3.</span> <code className="text-amber-300">git switch main</code> & wait for IDE re-index
          </div>
          <div className="text-center text-slate-400 text-xs">↓</div>
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-rose-400 font-bold">4.</span> Fix bug, switch back, <code className="text-amber-300">git stash pop</code>
          </div>
        </div>
      </div>

      {/* Git Worktrees */}
      <div className="rounded-xl border border-emerald-500/30 bg-slate-900 p-5 text-white shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h4 className="text-sm font-bold text-emerald-400">
            Git Worktree Workflow (Simultaneous)
          </h4>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
            Parallel Folders
          </span>
        </div>
        <div className="mt-4 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-emerald-400 font-bold">1.</span> <strong className="text-white">Folder A:</strong> feature-a in Editor 1
          </div>
          <div className="text-center text-slate-400 text-xs">↓ Urgent bug reported!</div>
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-emerald-400 font-bold">2.</span> <code className="text-emerald-300">git worktree add ../hotfix main</code>
          </div>
          <div className="text-center text-slate-400 text-xs">↓</div>
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-emerald-400 font-bold">3.</span> <strong className="text-white">Folder B:</strong> Open in Editor 2, fix & commit
          </div>
          <div className="text-center text-slate-400 text-xs">↓</div>
          <div className="flex items-center gap-2 rounded bg-slate-950 border border-slate-800 p-2.5 text-slate-200">
            <span className="text-emerald-400 font-bold">4.</span> Folder A is intact. Zero stashes, zero lost context!
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorktreeStructureDiagram() {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs leading-relaxed text-slate-200 shadow-inner">
      <div className="text-slate-400 mb-2 font-sans font-bold uppercase tracking-wider text-[11px]">
        Recommended Directory Hierarchy
      </div>
      <pre className="text-slate-200 whitespace-pre">
{`projects/
├── my-app/                <-- Primary Worktree (contains full .git/ repository)
│   ├── .git/
│   │   └── worktrees/
│   │       ├── feature-auth/
│   │       └── hotfix-login/
│   └── src/
│
├── my-app-feature-auth/   <-- Linked Worktree 1 (checked out to feature/auth)
│   ├── .git               <-- Text file pointing to ../my-app/.git/worktrees/feature-auth
│   └── src/
│
└── my-app-hotfix-login/   <-- Linked Worktree 2 (checked out to hotfix/login)
    ├── .git               <-- Text file pointing to ../my-app/.git/worktrees/hotfix-login
    └── src/`}
      </pre>
    </div>
  );
}

export function RemoveVsPruneDiagram() {
  return (
    <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-blue-500/40 bg-slate-900 p-5 text-white shadow-md">
        <h5 className="font-mono text-sm font-bold text-blue-400">git worktree remove</h5>
        <p className="mt-2 text-xs text-slate-200 leading-relaxed">
          Deletes the <strong className="text-white font-semibold">actual working directory folder</strong> from your hard drive AND unregisters its administrative record in <code className="text-amber-300">.git/worktrees/</code>.
        </p>
        <div className="mt-3 rounded bg-slate-950 border border-slate-800 p-2.5 font-mono text-[11px] text-blue-300">
          Folder deleted + Metadata cleaned
        </div>
      </div>

      <div className="rounded-xl border border-purple-500/40 bg-slate-900 p-5 text-white shadow-md">
        <h5 className="font-mono text-sm font-bold text-purple-400">git worktree prune</h5>
        <p className="mt-2 text-xs text-slate-200 leading-relaxed">
          Cleans up <strong className="text-white font-semibold">orphaned administrative metadata</strong> when a folder was deleted manually via <code className="text-amber-300">rm -rf</code>, Finder, or Explorer.
        </p>
        <div className="mt-3 rounded bg-slate-950 border border-slate-800 p-2.5 font-mono text-[11px] text-purple-300">
          Folder already gone → Cleans metadata only
        </div>
      </div>
    </div>
  );
}

export function LockUnlockDiagram() {
  return (
    <div className="my-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 text-center text-xs text-white shadow-md">
      <div className="flex-1 rounded-lg border border-slate-700 bg-slate-950 p-4">
        <span className="text-2xl">📁</span>
        <div className="mt-1 font-bold text-white">Normal Worktree</div>
        <p className="mt-1 text-[11px] text-slate-300">Pruneable if directory is temporarily unreachable</p>
      </div>

      <div className="flex flex-col items-center">
        <span className="font-mono text-emerald-400 text-xs font-semibold">git worktree lock →</span>
        <span className="mt-1 font-mono text-amber-400 text-xs font-semibold">← git worktree unlock</span>
      </div>

      <div className="flex-1 rounded-lg border border-amber-500/40 bg-amber-950/40 p-4">
        <span className="text-2xl">🔒</span>
        <div className="mt-1 font-bold text-amber-300">Locked Worktree</div>
        <p className="mt-1 text-[11px] text-slate-200">Safe on external SSDs, USB drives, or persistent build caches</p>
      </div>
    </div>
  );
}

export function RepairDiagram() {
  return (
    <div className="my-6 rounded-xl border border-slate-800 bg-slate-900 p-5 text-white shadow-md">
      <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        How git worktree repair Restores Broken Administrative Links
      </div>
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between rounded bg-slate-950 p-3 border border-rose-500/40 text-rose-300">
          <span>❌ Broken: Directory moved manually via Finder / Explorer</span>
          <span className="text-[11px] text-slate-400">.git pointer still references old path</span>
        </div>
        <div className="text-center text-primary font-bold text-xs">
          ↓ Running: git worktree repair
        </div>
        <div className="flex items-center justify-between rounded bg-slate-950 p-3 border border-emerald-500/40 text-emerald-300">
          <span>✓ Restored: Bi-directional link between repository and worktree repaired</span>
          <span className="text-[11px] text-slate-300">Both pointers updated to new location</span>
        </div>
      </div>
    </div>
  );
}
