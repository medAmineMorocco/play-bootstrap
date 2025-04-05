import { Price } from "@/types/price";


const PRO_PRODUCT_IDS = process.env.NEXT_PUBLIC_PRO_PRODUCT_IDS;
const PRO_PLUS_PRODUCT_IDS = process.env.NEXT_PUBLIC_PRO_PLUS_PRODUCT_IDS;

export const pricingData: Price[] = [
  {
    id: "FREE_TRIAL",
    productIds: null,
    original_amount: null,
    unit_amount: 0,
    nickname: "Free Trial",
    periode: `${process.env.NEXT_PUBLIC_FREE_TRIAL_PERIOD} Days`,
    remark: "No credit card required",
    offers: [
      "Managing Git Worktrees",
      "Terminal Integration",
      "IDEs Integration",
      "Workflow Automation",
      "Git Tools",
      "Code Generator",
    ],
  },
  {
    id: "PRO",
    productIds: PRO_PRODUCT_IDS ? PRO_PRODUCT_IDS.split(",") : null,
    original_amount: Number(process.env.NEXT_PUBLIC_PRO_ORIGINAL_PRICE) || null,
    unit_amount: Number(process.env.NEXT_PUBLIC_PRO_PRICE || 0),
    nickname: "Pro",
    periode: "One time Payment",
    remark: "12 months of free updates",
    offers: [
      "Managing Git Worktrees",
      "Terminal Integration",
      "IDEs Integration",
      "Workflow Automation",
      "Git Tools",
    ],
    notIncluded: ["Code Generator"]
  },
  {
    id: "PRO_PLUS",
    productIds: PRO_PLUS_PRODUCT_IDS ? PRO_PLUS_PRODUCT_IDS.split(",") : null,
    original_amount: Number(process.env.NEXT_PUBLIC_PRO_PLUS_ORIGINAL_PRICE) || null,
    unit_amount: Number(process.env.NEXT_PUBLIC_PRO_PLUS_PRICE || 0),
    nickname: "Pro Plus",
    periode: "One time Payment",
    remark: "12 months of free updates",
    offers: [
      "Managing Git Worktrees",
      "Terminal Integration",
      "IDEs Integration",
      "Workflow Automation",
      "Git Tools",
      "Code Generator"
    ],
  },
];
