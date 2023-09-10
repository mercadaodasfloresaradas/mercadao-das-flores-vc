const routes: { [id: string]: string } = {
  "/": "Inicio",
  contacts: "Contactos",
  followPurchase: "Minha Encomenda",
  basket: "Cesto",
  products: "Produtos",
  finishedPurchase: "Pedido Feito",
};

export const assertRouteKey = (key: string) => {
  const result = Object.keys(routes)[Object.keys(routes).indexOf(key)];
  return result;
};

export const nonHeaderRoutes: string[] = [
  assertRouteKey("finishedPurchase"),
  assertRouteKey("basket"),
];

export const exceptionsHeaderRoutes: { [id: string]: string } = {
  [assertRouteKey("finishedPurchase")]: assertRouteKey("products"),
  [assertRouteKey("basket")]: assertRouteKey("contacts"),
};

export default routes;
