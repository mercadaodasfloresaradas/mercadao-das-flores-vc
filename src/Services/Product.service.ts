import { serviceRoutes } from "../Assets/Constants/ServiceRoutes";
import { ICategories } from "../Models/Categories";
import { IPhoto } from "../Models/Photo";
import { IProduct } from "../Models/Product";
import { IProducts } from "../Models/Products";
import { network } from "./Network.service";

class ProductsService {
  /**
       {
           "category": "Cat1"
        }
        {
          products
        }
      */
  products(category: string): Promise<IProducts> {
    return network.post(serviceRoutes.productsByCategory as string, {
      category,
    });
  }

  /**
            {
                 "id": "product1"
                 "category": "Cat1"
            }
            
            {
              "productPhoto": "img 64"
             }
           */
  photo(id: string, category: string): Promise<IPhoto> {
    return network.post(serviceRoutes.photo as string, {
      id,
      category,
    });
  }

  /**
           {
          }
          
          {
              categories: []
          }
          */
  categories(): Promise<ICategories> {
    return network.get(serviceRoutes.categories as string);
  }

  /**
      {
      }
  
      {
        "id": "",
        "name": "",
        "price": 0,
        "category": "",
        "description": ""
      }
    */
  test(): Promise<IProduct> {
    return network.get(serviceRoutes.test as string);
  }

  /**
          {
          }
      
          {
            "productPhoto": "img 64"
          }
        */
  testPhoto(): Promise<IPhoto> {
    return network.get(serviceRoutes.testPhoto as string);
  }
}

export const productsService = new ProductsService();
