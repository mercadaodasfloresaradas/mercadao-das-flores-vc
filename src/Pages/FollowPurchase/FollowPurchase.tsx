import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoSearchCircleSharp } from "react-icons/io5";

import ProductsContainer from "../../Components/ProductsContainer/ProductsContainer";
import InfoCard from "../../Components/InfoCard/InfoCard";
import { EInfoCardParagraph } from "../../Enums/InfoCard";
import Chat from "../../Components/Chat/Chat";
import { EChatSender } from "../../Enums/Chat";
import Input from "../../Components/Input/Input";
import { useSalesStore } from "../../Store/Sales.store";
import { saleService } from "../../Services/Sale.service";
import { IShowSaleResult } from "../../Models/ShowSaleResult";
import { ECommentSender } from "../../Enums/Comment";
import { purchaseState } from "../../Utils/PurchaseState";
import { configService } from "../../Services/Config.service";
import { EPurchaseState } from "../../Enums/PurchaseState";
import { IConfigResult } from "../../Models/ConfigResult";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";

import styles from "./FollowPurchase.module.scss";

const NewMessage = (props: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsShowingNewMessage: React.Dispatch<React.SetStateAction<boolean>>;
  sendMessage: () => void;
}) => {
  const { message, setMessage, setIsShowingNewMessage, sendMessage } = props;

  return (
    <div className={styles.message}>
      <h5 className={styles["modal-title"]}>Nova Mensagem</h5>
      <textarea
        id="message"
        name="message"
        rows={4}
        className={styles["message-input"]}
        onChange={(event) => setMessage(event.currentTarget.value)}
        value={message}
      />
      <div className={styles["message-actions"]}>
        <Button
          onClick={() => {
            sendMessage();
          }}
        >
          Enviar
        </Button>
        <Button
          onClick={() => {
            setIsShowingNewMessage(false);
            setMessage("");
          }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};

const Warnings = (props: {
  setIsShowingNewMessage: React.Dispatch<React.SetStateAction<boolean>>;
  warning: string;
}) => {
  const { setIsShowingNewMessage, warning } = props;
  return (
    <div className={styles.warning}>
      <h5 className={styles["modal-title"]}>Aviso</h5>
      <p className={styles["warning-message"]}>{warning}</p>
      <div className={styles["warning-actions"]}>
        <Button
          onClick={() => {
            setIsShowingNewMessage(true);
          }}
        >
          ok
        </Button>
      </div>
    </div>
  );
};

export default function FollowPurchase() {
  const lastSaleSearchID = useSalesStore((state) => state.lastSaleSearchID);
  const warningMessageNotValid: string =
    "Por favor preencha com uma mensagem valida de mais de 5 characteres!";
  const warningTooManyMessages: string =
    "Envio máximo de mensagens excedido, por favor aguarde resposta do comerciante!";
  const setLastSaleSearchID = useSalesStore(
    (state) => state.setLastSaleSearchID
  );
  const [search, setSearch] = useState<string>(lastSaleSearchID);
  const [message, setMessage] = useState<string>("");
  const [activeWarning, setActiveWarning] = useState<string>(
    warningMessageNotValid
  );
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);
  const [isShowingNewMessage, setIsShowingNewMessage] = useState<boolean>(true);

  const { data, refetch } = useQuery({
    queryKey: ["search-sale", lastSaleSearchID],
    queryFn: (): Promise<IShowSaleResult> => {
      return saleService.showSale(lastSaleSearchID);
    },
    enabled: !!lastSaleSearchID,
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });

  const canRequestWarnings: boolean =
    !!data && !!data.details && !!data.details.state;

  const { data: warnings } = useQuery({
    queryKey: [
      "state-warnings",
      lastSaleSearchID,
      canRequestWarnings ? data?.details.state : "",
    ],
    queryFn: (): Promise<IConfigResult> =>
      configService.stateConfig(data?.details.state || EPurchaseState.pay),
    enabled: !!lastSaleSearchID && canRequestWarnings,
  });

  const isError: boolean = !!data?.error || !lastSaleSearchID;

  const SearchInput = () => (
    <Input
      id="search-order"
      label="ID da compra"
      value={search}
      setValue={setSearch}
      actions={[
        {
          handler: () => {
            setLastSaleSearchID(search.trim().replaceAll(" ", ""));
          },
          data: <IoSearchCircleSharp />,
        },
      ]}
    />
  );

  const sendMessage = () => {
    const messageLength: number = message
      .trim()
      .replaceAll(" ", "")
      .replaceAll("\\", "")
      .replaceAll("/", "")
      .replaceAll("_", "").length;

    if (messageLength <= 5) {
      setIsShowingNewMessage(false);
      setActiveWarning(warningMessageNotValid);
      return;
    }

    saleService
      .comment(data ? data.details.id : "", message)
      .then((response) => {
        if (!!response.error) {
          setActiveWarning(warningTooManyMessages);
          setIsShowingNewMessage(false);
          return;
        }

        setIsShowingModal(false);
        setMessage("");
        refetch();
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.products}>
          <ProductsContainer
            products={
              !!data && !isError
                ? data.products.products.map((product) => ({
                    product,
                    hasAction: false,
                  }))
                : []
            }
          />
        </div>
        <div>
          {isError ? (
            <></>
          ) : (
            <InfoCard
              topics={[
                {
                  title: "Estado da Encomenda:",
                  paragraph: `${purchaseState.val(data?.details.state || "")}`,
                  align: "end",
                },
                {
                  title: "Total Encomenda:",
                  paragraph: `${data?.details.priceTotal || 0}€`,
                  type: EInfoCardParagraph.text,
                  align: "end",
                },
                {
                  title: "Avisos:",
                  paragraph: ` `,
                  type: EInfoCardParagraph.text,
                  align: "end",
                },
                {
                  title:
                    (warnings?.config.includes(":")
                      ? warnings?.config.split(":")[0] + ":"
                      : "") || "",
                  paragraph:
                    (warnings?.config.includes(":")
                      ? warnings?.config
                          .split(":")
                          .filter((t, index) => index !== 0)
                          .join(":")
                          .slice(0, -1)
                      : warnings?.config) || "",
                  seperator: "\r",
                  type: EInfoCardParagraph.points,
                  isLittleTitle: true,
                  align: "start",
                },
              ]}
              extraClasses={styles.info}
            />
          )}
        </div>
        <div className={styles.chat}>
          {isError ? (
            <></>
          ) : (
            <Chat
              extraClasses={styles.messages}
              clickedNewMessage={() => setIsShowingModal(true)}
              messages={[
                {
                  user: EChatSender.Details,
                  message: `Conversa Automática - ${data?.details.date} - ${data?.details.address} - tml: ${data?.details.phone} - NIF: ${data?.details.NIF}`,
                },
                ...(data?.conversations.messages.map((message) => ({
                  user:
                    message.sender === ECommentSender.client
                      ? EChatSender.Client
                      : EChatSender.Seller,
                  message: message.message,
                })) || []),
              ]}
            />
          )}
        </div>
        <div className={styles.search}>{isError ? <></> : <SearchInput />}</div>
      </div>
      {isError ? (
        <div className={styles["chat-only"]}>
          <SearchInput />
        </div>
      ) : (
        <></>
      )}

      <Modal isShowing={isShowingModal} setIsShowing={setIsShowingModal}>
        {isShowingNewMessage ? (
          <NewMessage
            message={message}
            setIsShowingNewMessage={setIsShowingModal}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        ) : (
          <Warnings
            setIsShowingNewMessage={setIsShowingNewMessage}
            warning={activeWarning}
          />
        )}
      </Modal>
    </>
  );
}
