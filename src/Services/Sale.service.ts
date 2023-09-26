import { serviceRoutes } from "../Assets/Constants/ServiceRoutes";
import { ICommentResult } from "../Models/CommentResult";
import { IMinimalProduct } from "../Models/MinimalProduct";
import { INewSaleResult } from "../Models/NewSaleResult";
import { IShowSaleResult } from "../Models/ShowSaleResult";
import { network } from "./Network.service";

class SaleService {
  /**
    {
    "name": "",
    "phone": "",
    "address": "",
    "NIF": "",
    "destName": "",
    "destPhone": "",
    "giftMessage": "",
    "products": [{"id": "", "category": ""}],
    "hasToSave": true, 
    }

    {
      success: "", 
      id: "", 
      total: 0
      productsToRemove:[]
    }
  */
  newSale = (
    name: string,
    phone: string,
    address: string,
    NIF: string,
    destName: string,
    destPhone: string,
    giftMessage: string,
    products: IMinimalProduct[],
    hasToSave: boolean
  ): Promise<INewSaleResult> => {
    return network.post(serviceRoutes.newSale as string, {
      name,
      phone,
      address,
      products,
      destName,
      destPhone,
      giftMessage,
      NIF,
      hasToSave,
    });
  };

  /**
    {
    "id": ""
    }

    conversations: {
    messages: IComment[]
  }, 
  details: {
    name: string,
    phone: string,
    address: string,
    NIF: string,
    id: string,
    priceTotal: number,
    date: Date,
    state: EPurchaseState,
    hasNotifications: boolean
}, 
  products: {
    products: IProduct[]
  }
  */
  showSale(id: string): Promise<IShowSaleResult> {
    return network.post(serviceRoutes.showSale as string, {
      id,
    });
  }

  /**
    {
      "id": "",
      "comment": ""
    }

    {
      success: "Purchase conversation updated!",
      conversations: data.messages
    }
  */
  comment(id: string, comment: string): Promise<ICommentResult> {
    return network.post(serviceRoutes.comment as string, {
      id,
      comment,
    });
  }
}

export const saleService = new SaleService();
