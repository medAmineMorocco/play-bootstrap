import { Menu } from "@/types/menu";

const DOCUMENTATION_URL = process.env.NEXT_PUBLIC_DOCUMENTATION_URL;

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 9,
    title: "Tutorials",
    newTab: false,
    submenu: [
      {
        id: 91,
        title: "Commands",
        newTab: false,
        submenu: [
          {
            id: 910,
            title: "Overview",
            path: "/git-worktree",
            newTab: false,
          },
          {
            id: 911,
            title: "Add",
            path: "/git-worktree/add",
            newTab: false,
          },
          {
            id: 912,
            title: "List",
            path: "/git-worktree/list",
            newTab: false,
          },
          {
            id: 913,
            title: "Remove",
            path: "/git-worktree/remove",
            newTab: false,
          },
          {
            id: 914,
            title: "Move",
            path: "/git-worktree/move",
            newTab: false,
          },
          {
            id: 915,
            title: "Lock",
            path: "/git-worktree/lock",
            newTab: false,
          },
          {
            id: 916,
            title: "Unlock",
            path: "/git-worktree/unlock",
            newTab: false,
          },
          {
            id: 917,
            title: "Prune",
            path: "/git-worktree/prune",
            newTab: false,
          },
          {
            id: 918,
            title: "Repair",
            path: "/git-worktree/repair",
            newTab: false,
          },
        ],
      },
      {
        id: 92,
        title: "Troubleshooting",
        path: "/git-worktree/troubleshooting",
        newTab: false,
      },
      {
        id: 93,
        title: "AI Agent",
        path: "/ai-agents/git-worktrees",
        newTab: false,
      },
      {
        id: 94,
        title: "Isolation",
        path: "/git-worktree/environment-isolation",
        newTab: false,
      },
      {
        id: 95,
        title: "Comparisons",
        path: "/git-worktree/comparisons",
        newTab: false,
      },
    ],
  },
  {
    id: 2,
    title: "Documentation",
    path: DOCUMENTATION_URL,
    newTab: true,
  },
  {
    id: 3,
    title: "Pricing",
    path: "/pricing",
    newTab: false,
  },
  {
    id: 6,
    title: "Cheat Sheet",
    path: "/git-worktree-cheat-sheet",
    newTab: false,
  },
  {
    id: 7,
    title: "Generator",
    path: "/git-worktree-command-generator",
    newTab: false,
  },
  {
    id: 5,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 4,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 8,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
