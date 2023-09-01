import { useNavigate } from "react-router-dom";

import LBFlowersHome from "../../Assets/Welcome/LBFlowersHome";
import LTFlowersHome from "../../Assets/Welcome/LTFlowersHome";
import RBFlowersHome from "../../Assets/Welcome/RBFlowersHome";
import RTFlowersHome from "../../Assets/Welcome/RTFlowersHome";
import Button from "../../Components/Button/Button";
import LogoName from "../../Components/LogoName/LogoName";
import { assertRouteKey } from "../../Assets/Constants/Routes";

import styles from "./Welcome.module.scss";

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={`${styles["flower"]} ${styles["flower-lt"]}`}>
        <LTFlowersHome />
      </div>
      <div className={`${styles["flower"]} ${styles["flower-rt"]}`}>
        <RTFlowersHome />
      </div>
      <div className={`${styles["flower"]} ${styles["flower-lb"]}`}>
        <LBFlowersHome />
      </div>
      <div className={`${styles["flower"]} ${styles["flower-rb"]}`}>
        <RBFlowersHome />
      </div>
      <div className={`${styles.content}`}>
        <LogoName headerType="h1" headerClasses={styles.title} />
        <div className={styles.actions}>
          <Button
            extraClasses={styles.action}
            onClick={() => {
              navigate(`/${assertRouteKey("followPurchase")}`);
            }}
          >
            Minha Encomenda
          </Button>
          <Button
            extraClasses={styles.action}
            onClick={() => {
              navigate(`/${assertRouteKey("products")}`);
            }}
          >
            Artigos
          </Button>
        </div>
        <a
          className={styles.link}
          onClick={() => {
            navigate("/contacts");
          }}
        >
          <p className={styles.contacts}>Contactos</p>
        </a>
      </div>
    </div>
  );
}
