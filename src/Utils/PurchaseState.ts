class PurchaseState {
  states: { [id: string]: string } = {
    toPay: "Aguarda Pagamento",
    payed: "Pago verifique nos comentarios a data de entrega",
    finalized: "Pago e entregue",
    old: "Should not be here",
  };

  val(inKey: string) {
    return (this.states[inKey] || "") as string;
  }

  warning(inKey: string) {
    let finalVal: string = "";

    switch (this.states[inKey]) {
      case this.states.toPay:
        finalVal = "Devolvemos o dinheiro, até ao dia antes da entrega.";
        break;
      case this.states.payed:
        finalVal =
          "Se não defeniu a sua morada como verdadeiramente queria, por favor envie uma mensagem a vendedora com a nova morada.";
        break;
      case this.states.finalized:
        finalVal = "Concluio a sua compra com sucesso!";
        break;
      case this.states.old:
        finalVal = "Should not be here";
        break;
      default:
        break;
    }

    return finalVal;
  }
}

export const purchaseState = new PurchaseState();
