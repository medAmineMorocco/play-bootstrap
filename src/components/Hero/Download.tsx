import React, { useEffect, useRef, useState } from "react";
import { AppleOutlined, LinuxOutlined, WindowsOutlined } from "@ant-design/icons";

let useClickOutside = (handler: any) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event: any) => {
      const current = domNode.current as any;
      if (!current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Download = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  }) as any;

  return (
    <>
      <section>
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div ref={domNode} className="w-full px-4 sm:w-1/2 lg:w-1/4">
              <div className="text-center">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`bg-white flex items-center rounded-[5px] px-5 py-[13px] text-base font-medium text-dark`}
                  >
                    Download
                    <span className="pl-4">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-current"
                      >
                        <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`shadow-1 dark:shadow-box-dark absolute left-0 z-40 mt-2 w-full rounded-md bg-white py-[10px] transition-all ${
                      dropdownOpen
                        ? "top-full opacity-100 visible"
                        : "top-[110%] invisible opacity-0"
                    }`}
                  >
                    <DropdownItem newTab={false} label={<span><WindowsOutlined  style={{ fontSize: '24px'}}/> Windows</span>} href={process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_EXE_URL || ""} />
                    <DropdownItem newTab={false} label={<span><AppleOutlined  style={{ fontSize: '24px'}}/> Mac (Intel)</span>} href={process.env.NEXT_PUBLIC_DOWNLOAD_MAC_INTEL_URL || ""} />
                    <DropdownItem newTab={false} label={<span><AppleOutlined  style={{ fontSize: '24px'}}/> Mac (Apple Silicon)</span>} href={process.env.NEXT_PUBLIC_DOWNLOAD_MAC_SILICON_URL || ""} />
                    <DropdownItem newTab={false} label={<span><LinuxOutlined  style={{ fontSize: '24px'}}/> (.deb)</span>} href={process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_DEB_URL || ""} />
                    <DropdownItem newTab={false} label={<span><LinuxOutlined  style={{ fontSize: '24px'}}/> (.rpm)</span>} href={process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_RPM_URL || ""} />
                    {process.env.NEXT_PUBLIC_DOWNLOAD_OLDER_VERSION_URL && <DropdownItem newTab={true} label="Older versions" href={process.env.NEXT_PUBLIC_DOWNLOAD_OLDER_VERSION_URL} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Download;

const DropdownItem = ({ label, href, newTab} : { label: any, href: string, newTab: boolean }) => {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : "_self"}
      className="text-body-color dark:text-dark-6 hover:bg-[#F5F7FD] dark:hover:bg-primary/5 hover:text-primary block px-5 py-2 text-base"
    >
      {label}
    </a>
  );
};
