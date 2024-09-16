import { Price } from "@/types/price";

const TWITTER_PAGE_URL = process.env.NEXT_PUBLIC_TWITTER_PAGE_URL;
const LINKEDIN_PAGE_URL = process.env.NEXT_PUBLIC_LINKEDIN_PAGE_URL;
const YOUTUBE_PAGE_URL = process.env.NEXT_PUBLIC_YOUTUBE_PAGE_URL;

export const pricingData: Price[] = [
  {
    id: "price_0NQk5TLtGdPVhGLecVfQ7mn0",
    original_amount: null,
    unit_amount: 0,
    nickname: "Free Trial",
    periode: `${process.env.NEXT_PUBLIC_FREE_TRIAL_PERIOD} Days`,
    paymentLink: process.env.NEXT_PUBLIC_FREE_TRIAL_PAYMENT_URL,
    offers: [
      "Managing Worktrees",
      "Terminal Integration",
      "IDEs Integration",
      "Workflow Automation",
      "Git Tools",
      "Code Generator",
    ],
  },
  {
    id: "price_1NQk5TLtGdPVhGLecVfQ7mn0",
    original_amount: process.env.NEXT_PUBLIC_PRO_ORIGINAL_PRICE,
    unit_amount: process.env.NEXT_PUBLIC_PRO_PRICE,
    nickname: "Pro",
    periode: "Lifetime Usage",
    paymentLink: process.env.NEXT_PUBLIC_PRO_PAYMENT_URL,
    offers: [
      "Managing Worktrees",
      "Terminal Integration",
      "IDEs Integration",
      "Workflow Automation",
      "Git Tools",
    ],
    notIncluded: ["Code Generator"]
  },
  {
    id: "price_1NQk55LtGdPVhGLefU8AHqHr",
    original_amount: process.env.NEXT_PUBLIC_PRO_PLUS_ORIGINAL_PRICE,
    unit_amount: process.env.NEXT_PUBLIC_PRO_PLUS_PRICE,
    nickname: "Pro Plus",
    periode: "Lifetime Usage",
    paymentLink: process.env.NEXT_PUBLIC_PRO_PLUS_PAYMENT_URL,
    offers: [
      "Managing Worktrees",
      "Terminal Integration",
      "IDEs Integration",
      "Workflow Automation",
      "Git Tools",
      "Code Generator"
    ],
  },
];
