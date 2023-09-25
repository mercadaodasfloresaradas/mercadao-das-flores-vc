import { baseURL, serviceRoutes } from "../Assets/Constants/ServiceRoutes";
import { EConfigRoute } from "../Enums/ConfigRoute";
import { EPurchaseState } from "../Enums/PurchaseState";
import { IConfigResult } from "../Models/ConfigResult";
import { IServiceRoutes } from "../Models/ServiceRoutes";
import { network } from "./Network.service";
class ConfigService {
  home(): Promise<string> {
    return network.get(baseURL);
  }

  private config(route: EConfigRoute): Promise<IConfigResult> {
    return network.get(route.toString());
  }

  contacts() {
    return this.config(EConfigRoute.contacts);
  }

  payMethods() {
    return this.config(EConfigRoute.payMethods);
  }

  noService() {
    return this.config(EConfigRoute.noService);
  }

  welcome() {
    return this.config(EConfigRoute.welcome);
  }

  storeName() {
    return this.config(EConfigRoute.storeName);
  }

  warnings() {
    return this.config(EConfigRoute.warnings);
  }

  delivery() {
    return this.config(EConfigRoute.delivery);
  }

  support() {
    return this.config(EConfigRoute.support);
  }

  returns() {
    return this.config(EConfigRoute.returns);
  }

  toPay() {
    return this.config(EConfigRoute.toPay);
  }

  payed() {
    return this.config(EConfigRoute.payed);
  }

  finalized() {
    return this.config(EConfigRoute.finalized);
  }

  limitProducts() {
    return this.config(EConfigRoute.limitProducts);
  }

  facebook() {
    return this.config(EConfigRoute.facebook);
  }

  instagram() {
    return this.config(EConfigRoute.instagram);
  }

  contactsPage() {
    return this.config(EConfigRoute.contactsPage);
  }

  stateConfig(state: EPurchaseState) {
    switch (state) {
      case EPurchaseState.pay:
        return this.toPay();
      case EPurchaseState.payed:
        return this.payed();
      case EPurchaseState.finish:
        return this.finalized();
    }
  }
}

export const configService = new ConfigService();
