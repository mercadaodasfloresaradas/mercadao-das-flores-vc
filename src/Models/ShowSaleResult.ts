import { EPurchaseState } from "../Enums/PurchaseState";
import { IComment } from "./Comment";
import { IProduct } from "./Product";

export interface IShowSaleResult {
  conversations: {
    messages: IComment[];
  };
  details: {
    name: string;
    phone: string;
    address: string;
    NIF: string;
    destName: string;
    destPhone: string;
    giftMessage: string;
    deliverDate: number;
    id: string;
    priceTotal: number;
    date: Date;
    state: EPurchaseState;
    hasNotifications: boolean;
  };
  products: {
    products: IProduct[];
  };
  error?: string;
}
