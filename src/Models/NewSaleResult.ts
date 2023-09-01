import { IMinimalProduct } from "./MinimalProduct";

export interface INewSaleResult {
  success: string;
  id: string;
  total: number;
  productsToRemove?: IMinimalProduct[];
  error?: string;
}
