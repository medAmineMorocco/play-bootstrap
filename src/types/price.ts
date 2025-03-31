export type Price = {
  id: string;
  productIds: string[] | null;
  original_amount?: number | null;
  unit_amount: number;
  nickname: string;
  offers: string[];
  notIncluded?: string[];
  periode: string;
  remark?: string;
};
