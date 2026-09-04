"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import menuData from "./menuData";
import StickyBar from "@/components/StickyBar/StickyBar";

const STICKY_BAR_ANNOUNCEMENT = process.env.NEXT_PUBLIC_STICKY_BAR_ANNOUNCEMENT;
const EVALUATE_SHOW_ABOUT_PAGE = process.env.NEXT_PUBLIC_EVALUATE_SHOW_ABOUT_PAGE;


const Header = () => {

  const pathUrl = usePathname();
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    handleStickyNavbar();

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  // submenu handler for mobile
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openNestedIndex, setOpenNestedIndex] = useState<number | null>(null);

  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
      setOpenNestedIndex(null);
    } else {
      setOpenIndex(index);
      setOpenNestedIndex(null);
    }
  };

  const handleNestedSubmenu = (subIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openNestedIndex === subIndex) {
      setOpenNestedIndex(null);
    } else {
      setOpenNestedIndex(subIndex);
    }
  };

  const isTutorialsActive =
    pathUrl === "/git-worktree" ||
    pathUrl?.startsWith("/git-worktree/") ||
    pathUrl?.startsWith("/ai-agents/");

  const { theme, setTheme } = useTheme();

  return (
    <>
      <header
        className={`ud-header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "shadow-nav fixed z-[999] border-b border-stroke bg-white/80 backdrop-blur-[5px] dark:border-dark-3/20 dark:bg-dark/10"
            : "absolute bg-transparent"
        }`}
      >
        <div className="w-full">
          {STICKY_BAR_ANNOUNCEMENT && !sticky && (
            <StickyBar text={STICKY_BAR_ANNOUNCEMENT} />
          )}
          <div className="container">
            <div className="relative -mx-4 flex items-center justify-between">
              <div className="w-60 max-w-full px-4">
                <Link
                  href="/"
                  className={`navbar-logo block w-full ${
                    sticky ? "py-2" : "py-5"
                  } `}
                >
                  {pathUrl !== "/" ? (
                    <>
                      <img
                        src={`/images/logo/logo.svg`}
                        alt="logo"
                        width={240}
                        height={30}
                        className="header-logo w-full dark:hidden"
                      />
                      <img
                        src={`/images/logo/logo-white.svg`}
                        alt="logo"
                        width={240}
                        height={30}
                        className="header-logo hidden w-full dark:block"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={`${
                          sticky
                            ? "/images/logo/logo.svg"
                            : "/images/logo/logo-white.svg"
                        }`}
                        alt="logo"
                        width={140}
                        height={30}
                        className="header-logo w-full dark:hidden"
                      />
                      <img
                        src={"/images/logo/logo-white.svg"}
                        alt="logo"
                        width={140}
                        height={30}
                        className="header-logo hidden w-full dark:block"
                      />
                    </>
                  )}
                </Link>
              </div>
              <div className="flex w-full items-center justify-between px-4">
                <div>
                  <button
                    onClick={navbarToggleHandler}
                    id="navbarToggler"
                    aria-label="Mobile Menu"
                    aria-expanded={navbarOpen}
                    className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                  >
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                        navbarOpen ? " top-[7px] rotate-45" : " "
                      } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
                        pathUrl === "/" && sticky
                          ? "bg-dark dark:bg-white"
                          : "bg-white"
                      }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                        navbarOpen ? "opacity-0 " : " "
                      } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
                        pathUrl === "/" && sticky
                          ? "bg-dark dark:bg-white"
                          : "bg-white"
                      }`}
                    />
                    <span
                      className={`relative my-1.5 block h-0.5 w-[30px] transition-all duration-300 ${
                        navbarOpen ? " top-[-8px] -rotate-45" : " "
                      } ${pathUrl !== "/" && "!bg-dark dark:!bg-white"} ${
                        pathUrl === "/" && sticky
                          ? "bg-dark dark:bg-white"
                          : "bg-white"
                      }`}
                    />
                  </button>
                  <nav
                    id="navbarCollapse"
                    className={`navbar absolute right-0 z-30 max-h-[85vh] overflow-y-auto w-[290px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 shadow-xl duration-300 dark:border-body-color/20 dark:bg-dark-2 lg:visible lg:static lg:max-h-none lg:overflow-visible lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:dark:bg-transparent ${
                      navbarOpen
                        ? "visibility top-full opacity-100"
                        : "invisible top-[120%] opacity-0"
                    }`}
                  >
                    <ul className="block lg:ml-8 lg:flex lg:items-center lg:gap-x-6 xl:ml-12 xl:gap-x-8">
                      {menuData
                        .filter((menuItem) => {
                          if (EVALUATE_SHOW_ABOUT_PAGE === "true") {
                            return menuItem.title !== "About";
                          }
                          return true;
                        })
                        .map((menuItem, index) => {
                          const isItemActive =
                            menuItem.path === pathUrl ||
                            (menuItem.title === "Tutorials" && isTutorialsActive);

                          return menuItem.path ? (
                            <li key={index} className="group relative">
                              {pathUrl !== "/" ? (
                                <Link
                                  onClick={navbarToggleHandler}
                                  scroll={false}
                                  href={menuItem.path}
                                  className={`ud-menu-scroll flex py-2 text-base text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary lg:inline-flex lg:px-0 lg:py-6 ${
                                    isItemActive ? "text-primary !font-semibold" : ""
                                  }`}
                                  target={menuItem.newTab ? "_blank" : "_self"}
                                >
                                  {menuItem.title}
                                </Link>
                              ) : (
                                <Link
                                  scroll={false}
                                  href={menuItem.path}
                                  className={`ud-menu-scroll flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                                    sticky
                                      ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                                      : "text-body-color dark:text-white lg:text-white"
                                  } ${
                                    isItemActive && sticky ? "!text-primary" : ""
                                  }`}
                                  target={menuItem.newTab ? "_blank" : "_self"}
                                >
                                  {menuItem.title}
                                </Link>
                              )}
                            </li>
                          ) : (
                            <li
                              className="submenu-item group relative"
                              key={index}
                            >
                              <button
                                onClick={() => handleSubmenu(index)}
                                aria-haspopup="true"
                                aria-expanded={openIndex === index}
                                className={`ud-menu-scroll flex w-full items-center justify-between py-2 text-base lg:inline-flex lg:w-auto lg:px-0 lg:py-6 ${
                                  pathUrl !== "/"
                                    ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                                    : sticky
                                    ? "text-dark group-hover:text-primary dark:text-white dark:group-hover:text-primary"
                                    : "text-body-color dark:text-white lg:text-white"
                                } ${
                                  isItemActive
                                    ? "!text-primary font-semibold"
                                    : ""
                                }`}
                              >
                                <span>{menuItem.title}</span>
                                <span className="pl-1">
                                  <svg
                                    className={`duration-300 lg:group-hover:rotate-180 ${
                                      openIndex === index ? "rotate-180" : ""
                                    }`}
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.00039 11.9C7.85039 11.9 7.72539 11.85 7.60039 11.75L1.85039 6.10005C1.62539 5.87505 1.62539 5.52505 1.85039 5.30005C2.07539 5.07505 2.42539 5.07505 2.65039 5.30005L8.00039 10.525L13.3504 5.25005C13.5754 5.02505 13.9254 5.02505 14.1504 5.25005C14.3754 5.47505 14.3754 5.82505 14.1504 6.05005L8.40039 11.7C8.27539 11.825 8.15039 11.9 8.00039 11.9Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </span>
                              </button>

                              {/* Desktop & Mobile Dropdown */}
                              <div
                                className={`submenu relative left-0 top-full w-full rounded-md bg-white p-2.5 shadow-lg dark:bg-dark-2 lg:invisible lg:absolute lg:top-[110%] lg:w-[260px] lg:opacity-0 lg:transition-[top,opacity] lg:duration-300 lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100 ${
                                  openIndex === index ? "block" : "hidden lg:block"
                                }`}
                              >
                                {menuItem?.submenu?.map((subItem, subIdx) => {
                                  if (subItem.submenu) {
                                    // Nested Submenu (e.g. Commands -> Add, List, etc.)
                                    return (
                                      <div
                                        key={subIdx}
                                        className="group/nested relative rounded-md"
                                      >
                                        <button
                                          type="button"
                                          onClick={(e) =>
                                            handleNestedSubmenu(subIdx, e)
                                          }
                                          className="flex w-full items-center justify-between rounded px-3 py-2 text-sm font-medium text-dark hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/5 dark:hover:text-primary"
                                        >
                                          <span>{subItem.title}</span>
                                          <svg
                                            className={`h-4 w-4 transition-transform duration-200 lg:-rotate-90 lg:group-hover/nested:rotate-0 ${
                                              openNestedIndex === subIdx
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </button>

                                        {/* Nested Dropdown menu */}
                                        <div
                                          className={`relative left-0 top-0 mt-1 w-full rounded-md border border-stroke/50 bg-gray-1/80 p-1.5 dark:border-dark-3/30 dark:bg-dark/40 lg:invisible lg:absolute lg:-top-2 lg:left-full lg:mt-0 lg:w-[240px] lg:border-stroke/80 lg:bg-white lg:p-2 lg:shadow-xl lg:opacity-0 lg:backdrop-blur-sm lg:dark:border-dark-3 lg:dark:bg-dark-2 lg:group-hover/nested:visible lg:group-hover/nested:opacity-100 ${
                                            openNestedIndex === subIdx
                                              ? "block"
                                              : "hidden lg:block"
                                          }`}
                                        >
                                          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-body-color/70 dark:text-dark-6">
                                            Git Worktree Commands
                                          </div>
                                          {subItem.submenu.map(
                                            (nestedItem, nestedIdx) => (
                                              <Link
                                                key={nestedIdx}
                                                href={nestedItem.path || "#"}
                                                onClick={() => {
                                                  setNavbarOpen(false);
                                                  setOpenIndex(null);
                                                  setOpenNestedIndex(null);
                                                }}
                                                className={`flex items-center justify-between rounded px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                                  pathUrl === nestedItem.path
                                                    ? "bg-primary text-white"
                                                    : "text-body-color hover:bg-primary/10 hover:text-primary dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-primary"
                                                }`}
                                              >
                                                <span>{nestedItem.title}</span>
                                                {nestedItem.title ===
                                                  "Overview" && (
                                                  <span className="text-[10px] opacity-75">
                                                    Hub
                                                  </span>
                                                )}
                                              </Link>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }

                                  if (subItem.isSoon) {
                                    // Soon badge item (disabled / non-clickable)
                                    return (
                                      <div
                                        key={subIdx}
                                        aria-disabled="true"
                                        className="flex items-center justify-between rounded px-3 py-2 text-sm text-body-color/60 cursor-not-allowed select-none dark:text-dark-6/60"
                                      >
                                        <span className="font-medium">
                                          {subItem.title}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 border border-amber-500/20 dark:bg-amber-400/10 dark:text-amber-400">
                                          Soon
                                        </span>
                                      </div>
                                    );
                                  }

                                  return (
                                    <Link
                                      key={subIdx}
                                      href={subItem.path || "#"}
                                      onClick={() => {
                                        setNavbarOpen(false);
                                        setOpenIndex(null);
                                      }}
                                      className={`flex items-center justify-between rounded px-3 py-2 text-sm font-medium transition-colors ${
                                        pathUrl === subItem.path
                                          ? "text-primary bg-primary/10"
                                          : "text-body-color hover:bg-primary/10 hover:text-primary dark:text-dark-6 dark:hover:bg-white/5 dark:hover:text-primary"
                                      }`}
                                    >
                                      <span>{subItem.title}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </nav>
                </div>
                <div className="hidden items-center justify-end pr-16 sm:flex lg:pr-0">
                  {/* theme toggler */}
                  <button
                    aria-label="theme toggler"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
                  >
                    <span>
                      <svg
                        viewBox="0 0 16 16"
                        className="hidden h-[22px] w-[22px] fill-current dark:block"
                      >
                        <path d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z" />
                      </svg>

                      <svg
                        viewBox="0 0 23 23"
                        className={`h-[30px] w-[30px] fill-current text-dark dark:hidden ${
                          !sticky && pathUrl === "/" && "text-white"
                        }`}
                      >
                        <g clipPath="url(#clip0_40_125)">
                          <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
