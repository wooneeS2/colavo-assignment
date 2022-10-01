export type saleType = {
  name: string;
  rate: number;
};

export type itemType = {
  name: string;
  price: number;
  count: number;
  selectedSales: Array<saleType>;
};
