"use client";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";

const Pricing = ({WORKTREES_BOOK_LANDING_PAGE_URL}: any) => {
  return (
    <section
      id="pricing"
      className="relative z-20 overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[80px]"
    >
      <div className="container">
        <div className="mb-[50px]">
          <SectionTitle
            subtitle="One-Time Purchase"
            title="Our Pricing Plan"
            paragraph={
            <div>
              Try Any Plan Free for <strong className="dark:text-white">{process.env.NEXT_PUBLIC_FREE_TRIAL_PERIOD} Days</strong> and Explore All Features.
            </div>
          }
            center
          />
        </div>
        <div
          className="mb-4 flex items-center space-x-2 p-3 rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
          <span className="text-blue-600 dark:text-blue-400 text-xl">🎁</span>
          <span className="font-semibold">Free eBook:</span>
          <span>Get <strong className="font-bold"><i><a
            href={WORKTREES_BOOK_LANDING_PAGE_URL}
            target="_blank"
          >Git Worktrees for Maximum Productivity</a></i></strong> book with every paid package!</span>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {pricingData.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
