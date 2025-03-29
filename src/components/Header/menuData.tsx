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
    id: 4,
    title: "About",
    path: "/about",
    newTab: false,
  },
  {
    id: 5,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 6,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;
