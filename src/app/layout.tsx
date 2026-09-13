"use client";

import { hotjar } from "react-hotjar";
import Clarity from "@microsoft/clarity";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import ToasterContext from "./api/contex/ToasetContex";
import { useEffect } from "react";
import Head from "@/app/head";

const HOTJAR_ID = Number(process.env.NEXT_PUBLIC_HOTJAR_ID);
const HOTJAR_SV = Number(process.env.NEXT_PUBLIC_HOTJAR_SV);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Clarity.init("vvb5odkvib");
    if (HOTJAR_ID && HOTJAR_SV) hotjar.initialize({ id: HOTJAR_ID, sv: HOTJAR_SV });
  }, []);

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <head>
        <Head />
      </head>

      <body>
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="light"
          >
            <ToasterContext />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
      </body>
    </html>
  );
}
