import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    id: "PRO",
    original_amount: Number(process.env.NEXT_PUBLIC_PRO_ORIGINAL_PRICE) || null,
    unit_amount: process.env.NEXT_PUBLIC_PRO_PRICE,
    nickname: "Pro",
    periode: "One time Payment",
    remark: "3 activations / user / lifetime usage",
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
    id: "PRO_PLUS",
    original_amount: Number(process.env.NEXT_PUBLIC_PRO_PLUS_ORIGINAL_PRICE) || null,
    unit_amount: process.env.NEXT_PUBLIC_PRO_PLUS_PRICE,
    nickname: "Pro Plus",
    periode: "One time Payment",
    remark: "3 activations / user / lifetime usage",
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
  {
    id: "ENTERPRISE",
    original_amount: null,
    unit_amount: process.env.NEXT_PUBLIC_ENTERPRISE_PRICE,
    nickname: "On Premise",
    periode: "",
    remark: "N activations / user / lifetime usage",
    paymentLink: process.env.NEXT_PUBLIC_ENTERPRISE_PAYMENT_URL || '',
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
