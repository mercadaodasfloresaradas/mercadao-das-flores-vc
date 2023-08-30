import { IServiceRoutes } from "../../Models/ServiceRoutes";

export const baseURL: string =
  "https://redirect-without-cors-and50-mb.vercel.app"; //"http://invius.ddns.net/vc";  //https://redirect-mercadaodasflores.vercel.app';

export const serviceRoutes: IServiceRoutes = {
  productsByCategory: baseURL + "/products/bycategory",
  photo: baseURL + "/products/photo",
  categories: baseURL + "/products/categories",
  newSale: baseURL + "/sales/new",
  showSale: baseURL + "/sales/showpurchase",
  test: baseURL + "/products/UI",
  testPhoto: baseURL + "/products/UI/photo",
  comment: baseURL + "/sales/mycomment",
  home: baseURL + "/",
  configBase: baseURL + "/config",
  config: function () {
    return {
      contacts: this.configBase + "/contacts",
      payMethods: this.configBase + "/payMethods",
      noService: this.configBase + "/noService",
      welcome: this.configBase + "/welcome",
      storeName: this.configBase + "/storeName",
      warnings: this.configBase + "/warnings",
      delivery: this.configBase + "/delivery",
      support: this.configBase + "/support",
      returns: this.configBase + "/returns",
      toPay: this.configBase + "/pay",
      payed: this.configBase + "/payed",
      finalized: this.configBase + "/finalized",
      limitProducts: this.configBase + "/limit",
      facebook: this.configBase + "/facebook",
      instagram: this.configBase + "/instagram",
    };
  },
};
