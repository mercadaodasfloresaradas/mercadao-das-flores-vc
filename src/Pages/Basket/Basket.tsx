import React, { useEffect, useState } from "react";
import { GiPresent } from "react-icons/gi";
import { DayPicker } from "react-day-picker";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";

import ProductsContainer from "../../Components/ProductsContainer/ProductsContainer";
import { EProductCard } from "../../Enums/ProductCard";
import Input from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import InfoCard from "../../Components/InfoCard/InfoCard";
import GiftMessageForm from "../../Components/GiftMessageForm/GiftMessageForm";
import { useProductsStore } from "../../Store/Products.store";
import { saleService } from "../../Services/Sale.service";
import { INewSaleResult } from "../../Models/NewSaleResult";
import Modal from "../../Components/Modal/Modal";
import { useSalesStore } from "../../Store/Sales.store";
import { assertRouteKey } from "../../Assets/Constants/Routes";

import styles from "./Basket.module.scss";

export default function Basket() {
  const [isShowingGiftMessage, setIsShowingGiftMessage] = useState(false);
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [NIF, setNIF] = useState<string>("");
  const [destName, setDestName] = useState<string>("");
  const [destPhone, setDestPhone] = useState<string>("");
  const productsStore = useProductsStore((state) => state.produts);
  const removeProduct = useProductsStore((state) => state.removeProduct);
  const emptyProducts = useProductsStore((state) => state.emptyProducts);
  const setLastSale = useSalesStore((state) => state.setLastSale);
  const [giftMessage, setGiftMessage] = useState<string | null>(null);
  const [actionsModal, setActionsModal] = useState<React.ReactNode | null>(
    null
  );
  const [messagesModal, setMessagesModal] = useState<React.ReactNode | null>(
    null
  );
  const [deliverDate, setDeliverDate] = useState<Date>();
  const [isInChangeDeliverDate, setIsInChangeDeliverDate] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const confirmPurchaseMessage: string = `Tem a certeza que quer avançar com o pedido?

  Anote o código na proxima página para poder acompanhar a sua encomenda.
  O valor total é apenas para os produtos, a vendedora irá informar-lhe do valor do transporte.`;

  let headerDeliverDate = (
    <Button
      extraClasses={styles["deliver-btn"]}
      onClick={() => {
        setIsInChangeDeliverDate(true);
      }}
    >
      Data de Entrega
      {deliverDate ? (
        <p>
          {`${deliverDate.getDate()}-${
            deliverDate.getMonth() + 1
          }-${deliverDate.getFullYear()}`}
        </p>
      ) : (
        ""
      )}
    </Button>
  );

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["pord"],
    queryFn: (): Promise<INewSaleResult> =>
      saleService.newSale(
        "*",
        "*",
        "*",
        "*",
        "*",
        "*",
        "*",
        new Date().getTime(),
        productsStore.map((product) => ({
          category: product.category,
          id: product.id,
        })),
        false
      ),
  });

  useEffect(() => {
    if (!!data && !!data.productsToRemove && !!data.productsToRemove.length) {
      data.productsToRemove.forEach((product) => removeProduct(product.id));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [productsStore]);

  const transformWithAllowedCharacters = (val: string) =>
    val
      .replaceAll(" ", "")
      .replaceAll("*", "")
      .replaceAll("\\", "")
      .replaceAll("/", "")
      .replaceAll("_", "");

  const finishPurchase = () =>
    saleService
      .newSale(
        name,
        phone,
        address,
        NIF,
        destName,
        destPhone,
        giftMessage || "",
        deliverDate!.getTime(),
        productsStore.map((product) => ({
          category: product.category,
          id: product.id,
        })),
        true
      )
      .then((newSale) => {
        setLastSale(newSale);
        navigate(`/${assertRouteKey("finishedPurchase")}`);
        emptyProducts();
      });

  const makePurchase = () => {
    if (!productsStore.length) {
      setMessagesModal(
        warningErrorMessages([
          "Nenhum produto foi selecionado, por favor faça as suas escolhas!",
        ])
      );
      setActionsModal(warningErrorActions());
      setIsShowingAlert(true);
      return;
    }

    const finalName: string = transformWithAllowedCharacters(name);
    const finalDestName: string = transformWithAllowedCharacters(name);
    const finalAddress: string = transformWithAllowedCharacters(name);

    const currentDayPlusOne: Date = new Date();
    currentDayPlusOne.setDate(currentDayPlusOne.getDate() + 1);
    currentDayPlusOne.setHours(0);
    currentDayPlusOne.setMinutes(0);
    currentDayPlusOne.setSeconds(0);

    const hasName: boolean =
      !!finalName && finalName.length > 6 && finalName.length < 200;
    const hasPhone: boolean = phone.length === 9 || phone.length === 13;
    const hasNIF: boolean = NIF.length === 9;
    const hasDestName: boolean =
      !!finalDestName && finalDestName.length > 6 && finalDestName.length < 200;
    const hasDestPhone: boolean =
      destPhone.length === 9 || destPhone.length === 13;
    const hasAddress: boolean =
      !!finalAddress && finalAddress.length > 10 && finalAddress.length < 200;
    const hasDate: boolean = !!deliverDate && !!deliverDate.getTime();
    const isDateGreaterThanCurrent: boolean =
      hasDate && currentDayPlusOne.getTime() < deliverDate!.getTime();

    if (
      hasAddress &&
      hasDestName &&
      hasDestPhone &&
      hasNIF &&
      hasName &&
      hasPhone &&
      hasDate &&
      isDateGreaterThanCurrent
    ) {
      setMessagesModal(<div>{confirmPurchaseMessage}</div>);
      setActionsModal(warningConfirmActions());
      setIsShowingAlert(true);
    } else {
      let alertMessages: string[] = [];
      !hasName &&
        alertMessages.push(
          "Preencha um nome com caracteres válidos e com mais de 6 letras!"
        );
      !hasPhone &&
        alertMessages.push(
          "Preencha telefone com 9 ou 12 números(com 12 deverá incluir o sinal do indicativo)!"
        );
      !hasNIF && alertMessages.push("Preencha NIF com 9 números!");
      !hasDestName &&
        alertMessages.push(
          "Preencha um nome do destinatário com caracteres válidos e com mais de 6 letras!"
        );
      !hasDestPhone &&
        alertMessages.push(
          "Preencha telefone do destinatário com 9 ou 12 números(com 12 deverá incluir o sinal do indicativo)!"
        );
      !hasAddress &&
        alertMessages.push(
          "Preencha um a morada do destinatário com caracteres válidos e com mais de 10 letras!"
        );
      if (!hasDate) {
        alertMessages.push("Deve selecionar uma data de entrega!");
      } else {
        !isDateGreaterThanCurrent &&
          alertMessages.push(
            "Deve selecionar uma data superior a currente data!"
          );
      }

      setMessagesModal(warningErrorMessages(alertMessages));
      setActionsModal(warningErrorActions());
      setIsShowingAlert(true);
    }
  };

  const warningErrorMessages = (alert: string[]) => (
    <>
      {alert.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </>
  );

  const warningErrorActions = () => (
    <Button
      onClick={() => {
        setIsShowingAlert(false);
      }}
    >
      Ok
    </Button>
  );

  const warningConfirmActions = () => (
    <>
      <Button
        onClick={() => {
          finishPurchase();
          setIsShowingAlert(false);
        }}
      >
        Sim
      </Button>
      <Button
        onClick={() => {
          setIsShowingAlert(false);
        }}
      >
        Não
      </Button>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <ProductsContainer
          products={((!!data &&
            !!data.productsToRemove &&
            !!data.productsToRemove.length) ||
          isLoading
            ? []
            : productsStore
          ).map((product) => ({
            product,
            actionVisual: EProductCard.remove,
            handleAction: (id, product) => {
              removeProduct(id);
            },
          }))}
        />
      </div>
      <div className={styles.form}>
        <h3>Cliente</h3>
        <Input
          id="client-name"
          label="Nome Completo"
          value={name}
          setValue={setName}
          extraClasses={styles.input}
        />
        <Input
          id="client-phone"
          label="Telemóvel"
          value={phone}
          setValue={(val) => {
            const regex = /^[+]*[0-9]*$/g;
            if (val === "" || regex.test(val as string)) {
              setPhone(val);
            }
          }}
          extraClasses={styles.input}
        />
        <Input
          id="client-nif"
          label="NIF"
          value={NIF}
          setValue={(val) => {
            const regex = /^[0-9]*$/g;
            if (val === "" || regex.test(val as string)) {
              setNIF(val);
            }
          }}
          extraClasses={styles.input}
        />
        <h3>Destinatário</h3>
        <Input
          id="dest-name"
          label="Nome Completo"
          value={destName}
          setValue={setDestName}
          extraClasses={styles.input}
        />
        <Input
          id="dest-phone"
          label="Telemóvel"
          value={destPhone}
          setValue={(val) => {
            const regex = /^[+]*[0-9]*$/g;
            if (val === "" || regex.test(val as string)) {
              setDestPhone(val);
            }
          }}
          extraClasses={styles.input}
        />
        <Input
          id="dest-address"
          label="Morada"
          value={address}
          setValue={setAddress}
          extraClasses={styles.input}
        />
      </div>
      <div className={styles.actions}>
        {isInChangeDeliverDate ? (
          <></>
        ) : (
          <>
            <Button
              extraClasses={`${styles["gift-btn"]} `}
              onClick={() => {
                setIsShowingGiftMessage(true);
              }}
            >
              <GiPresent className={styles["gift-icon"]} />
              Mensagem Presente
            </Button>
            <InfoCard
              topics={[
                {
                  title: `Total: ${data?.total || 0}€`,
                  paragraph: "",
                },
              ]}
              extraClasses={styles.total}
            />
            <Button
              extraClasses={styles["finish-btn"]}
              onClick={() => makePurchase()}
            >
              Fazer Pedido
            </Button>
          </>
        )}

        <div className={styles.date}>
          {isInChangeDeliverDate ? (
            <DayPicker
              mode="single"
              selected={deliverDate}
              onSelect={(date) => {
                if (!!date) {
                  date.setSeconds(date.getSeconds() + 1);
                  setDeliverDate(date);
                }
                setIsInChangeDeliverDate(false);
              }}
            />
          ) : (
            headerDeliverDate
          )}
        </div>
      </div>
      <GiftMessageForm
        isShowing={isShowingGiftMessage}
        setIsShowing={setIsShowingGiftMessage}
        setNewMessage={(message) => setGiftMessage(message)}
      />

      <Modal isShowing={isShowingAlert} setIsShowing={setIsShowingAlert}>
        <div className={styles.alert}>
          <h2 className={styles["alert-title"]}>Aviso</h2>
          <div className={styles.messages}>{messagesModal}</div>
          <div className={styles.actions}>{actionsModal}</div>
        </div>
      </Modal>
    </div>
  );
}
