import { EProductCard } from "../Enums/ProductCard";
import { IProduct } from "./Product";

export interface IProductCard {
  product: IProduct;
  isTest?: boolean;
  isBase64?: boolean;
  hasAction?: boolean;
  actionVisual?: EProductCard;
  handleAction?: (id: string, product: IProduct) => void;
}
