export type Price = {
  id: string;
  original_amount?: number | null;
  unit_amount: number;
  nickname: string;
  offers: string[];
  notIncluded?: string[];
  periode: string;
  paymentLink: string;
};
