import { FaFacebookSquare } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Button from "../Button/Button";
import { EButton } from "../../Enums/Button";
import { useSalesStore } from "../../Store/Sales.store";
import { assertRouteKey } from "../../Assets/Constants/Routes";
import { IConfigResult } from "../../Models/ConfigResult";
import { configService } from "../../Services/Config.service";

import styles from "./Footer.module.scss";

export default function Footer() {
  const { pathname } = useLocation();
  const lastSale = useSalesStore((state) => state.lastSale);
  const navigate = useNavigate();

  const isInFinishedPurchasedPage: boolean = pathname.includes(
    assertRouteKey("finishedPurchase")
  );

  const { data: contacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.contacts();
    },
  });

  const { data: facebook } = useQuery({
    queryKey: ["facebook"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.facebook();
    },
  });

  const { data: instagram } = useQuery({
    queryKey: ["instagram"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.instagram();
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.contacts}>
        <h2 className={styles["contacts-title"]}>Contactos</h2>
        <div className={styles["contacts-info"]}>
          {contacts?.config.split("\r").map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
      {!!lastSale && !isInFinishedPurchasedPage ? (
        <div className={styles.lastSale}>
          <Button
            type={EButton.small}
            onClick={() => {
              navigate(`/${assertRouteKey("finishedPurchase")}`);
            }}
            extraClasses={styles["lastSale-btn"]}
          >
            Última Encomenda
          </Button>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.social}>
        <a href={instagram?.config} target="_blank">
          <FiInstagram className={styles.icon} />
        </a>
        <a href={facebook?.config} target="_blank">
          <FaFacebookSquare className={styles.icon} />
        </a>
      </div>
    </div>
  );
}
