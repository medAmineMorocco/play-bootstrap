"use client";
import SectionTitle from "../Common/SectionTitle";
import PricingBox from "./PricingBox";
import { pricingData } from "@/stripe/pricingData";

const TdStyle = {
  ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  TdButton: `inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium`,
}

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
                <div>Pay once. Get updates for a year.</div>
                <div>Keep your last supported version — forever.</div>
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

        <div className="-mx-4 flex flex-wrap justify-center mb-[100px]">
          {pricingData.map((product, i) => (
            <PricingBox key={i} product={product} />
          ))}
        </div>

        <SectionTitle
          title="See How Much Time You Could Save with WorktreeWise!"
          paragraph={
            <div>
              Here&apos;s how much time you can save by switching to worktrees instead of using git stash. It&apos;s not just
              about saving time—it&apos;s about boosting your productivity.
            </div>
          }
          center
        />
        <section className='bg-white dark:bg-dark pt-20'>
          <div className='container'>
            <div className='flex flex-wrap -mx-4'>
              <div className='w-full '>
                <div className='max-w-full overflow-x-auto'>
                  <table className='w-full table-auto'>
                    <thead className='text-center bg-primary'>
                    <tr>
                      <th className={TdStyle.ThStyle}> Scenario</th>
                      <th className={TdStyle.ThStyle}> Using Git Stash</th>
                      <th className={TdStyle.ThStyle}> Using WorktreeWise</th>
                      <th className={TdStyle.ThStyle}> Time Saved</th>
                      <th className={TdStyle.ThStyle}> Time Saved/Month</th>
                      <th className={TdStyle.ThStyle}> Time Saved/Year</th>
                      <th className={TdStyle.ThStyle}> Monetary Value Saved/Year (@$20/hr)</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                      <td className={TdStyle.TdStyle}>Single Switch</td>
                      <td className={TdStyle.TdStyle2}>4 - 20+ seconds</td>
                      <td className={TdStyle.TdStyle}>2 - 10 seconds (initially)</td>
                      <td className={TdStyle.TdStyle2}>Up to 10+ seconds</td>
                      <td className={TdStyle.TdStyle}>Up to 3.67 minutes/month</td>
                      <td className={TdStyle.TdStyle2}>Up to 44 minutes/year</td>
                      <td className={TdStyle.TdStyle}>$14.6/year</td>
                    </tr>

                    <tr>
                      <td className={TdStyle.TdStyle}>2 Switches/Day</td>
                      <td className={TdStyle.TdStyle2}>8 - 40+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>2 - 4 seconds/day</td>
                      <td className={TdStyle.TdStyle2}>Up to 36+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>Up to 12 minutes/month</td>
                      <td className={TdStyle.TdStyle2}>Up to 2.7 hours/year</td>
                      <td className={TdStyle.TdStyle}>$54/year</td>
                    </tr>

                    <tr>
                      <td className={TdStyle.TdStyle}>4 Switches/Day</td>
                      <td className={TdStyle.TdStyle2}>16 - 80+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>4 - 8 seconds/day</td>
                      <td className={TdStyle.TdStyle2}>Up to 72+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>Up to 24 minutes/month</td>
                      <td className={TdStyle.TdStyle2}>Up to 4.8 hours/year</td>
                      <td className={TdStyle.TdStyle}>$96/year</td>
                    </tr>

                    <tr>
                      <td className={TdStyle.TdStyle}>6 Switches/Day</td>
                      <td className={TdStyle.TdStyle2}>24 - 120+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>6 - 12 seconds/day</td>
                      <td className={TdStyle.TdStyle2}>Up to 108+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>Up to 36 minutes/month</td>
                      <td className={TdStyle.TdStyle2}>Up to 7.2 hours/year</td>
                      <td className={TdStyle.TdStyle}>$144/year</td>
                    </tr>

                    <tr>
                      <td className={TdStyle.TdStyle}>8 Switches/Day</td>
                      <td className={TdStyle.TdStyle2}>32 - 160+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>8 - 16 seconds/day</td>
                      <td className={TdStyle.TdStyle2}>Up to 144+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>Up to 48 minutes/month</td>
                      <td className={TdStyle.TdStyle2}>Up to 9.6 hours/year</td>
                      <td className={TdStyle.TdStyle}>$192/year</td>
                    </tr>

                    <tr>
                      <td className={TdStyle.TdStyle}>10 Switches/Day</td>
                      <td className={TdStyle.TdStyle2}>40 - 200+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>10 - 20 seconds/day</td>
                      <td className={TdStyle.TdStyle2}>Up to 180+ seconds/day</td>
                      <td className={TdStyle.TdStyle}>Up to 60 minutes/month</td>
                      <td className={TdStyle.TdStyle2}>Up to 12 hours/year</td>
                      <td className={TdStyle.TdStyle}>$240/year</td>
                    </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Pricing;
