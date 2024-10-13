import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    id: "price_0NQk5TLtGdPVhGLecVfQ7mn0",
    original_amount: null,
    unit_amount: 0,
    nickname: "Free Trial",
    periode: `${process.env.NEXT_PUBLIC_FREE_TRIAL_PERIOD} Days`,
    paymentLink: process.env.NEXT_PUBLIC_FREE_TRIAL_PAYMENT_URL || '',
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
    id: "price_1NQk5TLtGdPVhGLecVfQ7mn0",
    original_amount: Number(process.env.NEXT_PUBLIC_PRO_ORIGINAL_PRICE) || null,
    unit_amount: Number(process.env.NEXT_PUBLIC_PRO_PRICE),
    nickname: "Pro",
    periode: "One time Payment",
    remark: "2 activations / user / lifetime usage",
    paymentLink: process.env.NEXT_PUBLIC_PRO_PAYMENT_URL || '',
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
    id: "price_1NQk55LtGdPVhGLefU8AHqHr",
    original_amount: Number(process.env.NEXT_PUBLIC_PRO_PLUS_ORIGINAL_PRICE) || null,
    unit_amount: Number(process.env.NEXT_PUBLIC_PRO_PLUS_PRICE),
    nickname: "Pro Plus",
    periode: "One time Payment",
    remark: "2 activations / user / lifetime usage",
    paymentLink: process.env.NEXT_PUBLIC_PRO_PLUS_PAYMENT_URL || '',
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
