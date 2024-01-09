import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { IoCopyOutline } from "react-icons/io5";

import InfoCard from "../../Components/InfoCard/InfoCard";
import { EInfoCardParagraph } from "../../Enums/InfoCard";
import { IConfigResult } from "../../Models/ConfigResult";
import { configService } from "../../Services/Config.service";
import { useSalesStore } from "../../Store/Sales.store";
import Button from "../../Components/Button/Button";
import { EButton } from "../../Enums/Button";

import styles from "./FinishedPurchase.module.scss";

export default function FinishedPurchase() {
  const lastSale = useSalesStore((state) => state.lastSale);
  const textRef = useRef<HTMLSpanElement>(null);

  const { data: warnings } = useQuery({
    queryKey: ["warnings"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.warnings();
    },
  });

  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.payMethods();
    },
  });

  const copyID = () => {
    const id: string = textRef.current?.innerText || "";

    if (!!id) {
      navigator.clipboard.writeText(id);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <InfoCard
          topics={[
            {
              title: "ID de Compra",
              paragraph: (
                <div className={styles["copy-id"]}>
                  <span ref={textRef}>{lastSale?.id}</span>
                  <Button
                    onClick={copyID}
                    type={EButton.transparentLeftSmall}
                    extraClasses={styles["copy-id-btn"]}
                  >
                    <IoCopyOutline />
                  </Button>
                </div>
              ),
              alignText: "center-text",
            },
            {
              title: "Total",
              paragraph: `${lastSale?.total}€`,
              alignText: "center-text",
            },
          ]}
        />
      </div>
      <div>
        <InfoCard
          topics={[
            {
              title: "Modos de Pagamento",
              paragraph: "",
              alignText: "center-text",
            },
            {
              title: "",
              paragraph: warnings?.config || "",
              type: EInfoCardParagraph.enumeration,
              alignText: "start-text",
              seperator: ["\r", "\n"],
            },
            {
              title: "",
              paragraph: payments?.config,
              type: EInfoCardParagraph.points,
              alignText: "start-text",
              seperator: ["\r", "\n"],
            },
          ]}
        />
      </div>
    </div>
  );
}
