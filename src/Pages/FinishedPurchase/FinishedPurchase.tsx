import { useQuery } from "@tanstack/react-query";

import InfoCard from "../../Components/InfoCard/InfoCard";
import { EInfoCardParagraph } from "../../Enums/InfoCard";
import { IConfigResult } from "../../Models/ConfigResult";
import { configService } from "../../Services/Config.service";
import { useSalesStore } from "../../Store/Sales.store";

import styles from "./FinishedPurchase.module.scss";

export default function FinishedPurchase() {
  const lastSale = useSalesStore((state) => state.lastSale);

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

  return (
    <div className={styles.container}>
      <div>
        <InfoCard
          topics={[
            {
              title: "ID de Compra",
              paragraph: lastSale?.id,
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
