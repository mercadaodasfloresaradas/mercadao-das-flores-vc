export interface INewSaleResult {
  success: string;
  id: string;
  total: number;
  productsToRemove: string[];
  error?: string;
}
