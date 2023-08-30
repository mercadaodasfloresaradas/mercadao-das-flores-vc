import { EProductCard } from "../Enums/ProductCard";
import { IProductCard } from "./ProductCard";

export interface IProductsContainer {
  products: IProductCard[];
  maxHeight?: string;
  productsActionHandler?: (id: string) => {};
  productsActionVisual?: EProductCard;
  hasProductsAction?: boolean;
}
