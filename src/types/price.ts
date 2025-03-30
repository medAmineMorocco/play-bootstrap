export type Price = {
  id: string;
  productIds: string[] | null;
  original_amount?: number | null;
  unit_amount?: string;
  nickname: string;
  offers: string[];
  notIncluded?: string[];
  periode: string;
  paymentLink: string;
  remark?: string;
};
