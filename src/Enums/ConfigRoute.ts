import { serviceRoutes } from "../Assets/Constants/ServiceRoutes";
import { IServiceRoutes } from "../Models/ServiceRoutes";

const test: string = "";

export enum EConfigRoute {
  contacts = (serviceRoutes.config as () => IServiceRoutes)().contacts as any,
  payMethods = (serviceRoutes.config as () => IServiceRoutes)()
    .payMethods as any,
  noService = (serviceRoutes.config as () => IServiceRoutes)().noService as any,
  welcome = (serviceRoutes.config as () => IServiceRoutes)().welcome as any,
  storeName = (serviceRoutes.config as () => IServiceRoutes)().storeName as any,
  warnings = (serviceRoutes.config as () => IServiceRoutes)().warnings as any,
  delivery = (serviceRoutes.config as () => IServiceRoutes)().delivery as any,
  support = (serviceRoutes.config as () => IServiceRoutes)().support as any,
  returns = (serviceRoutes.config as () => IServiceRoutes)().returns as any,
  toPay = (serviceRoutes.config as () => IServiceRoutes)().toPay as any,
  payed = (serviceRoutes.config as () => IServiceRoutes)().payed as any,
  finalized = (serviceRoutes.config as () => IServiceRoutes)().finalized as any,
  limitProducts = (serviceRoutes.config as () => IServiceRoutes)()
    .limitProducts as any,
  facebook = (serviceRoutes.config as () => IServiceRoutes)().facebook as any,
  instagram = (serviceRoutes.config as () => IServiceRoutes)().instagram as any,
}
