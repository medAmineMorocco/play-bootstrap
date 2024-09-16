"use client";

import { hotjar } from 'react-hotjar'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ToasterContext from "./api/contex/ToasetContex";
import { useEffect, useState } from "react";
import PreLoader from "@/components/Common/PreLoader";
import Head from "@/app/head";

const HOTJAR_ID = Number(process.env.NEXT_PUBLIC_HOTJAR_ID);
const HOTJAR_SV = Number(process.env.NEXT_PUBLIC_HOTJAR_SV);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    hotjar.initialize({id: HOTJAR_ID, sv: HOTJAR_SV})
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      <Head />

      <body>
        {loading ? (
          <PreLoader />
        ) : (
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
        )}
      </body>
    </html>
  );
}
