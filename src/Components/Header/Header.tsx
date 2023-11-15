import LogoName from "../LogoName/LogoName";
import routes, {
  assertRouteKey,
  exceptionsHeaderRoutes,
  nonHeaderRoutes,
} from "../../Assets/Constants/Routes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { BsFillBasket2Fill } from "react-icons/bs";
import Flowers from "../../Assets/Layout/Flowers";
import { useProductsStore } from "../../Store/Products.store";

import styles from "./Header.module.scss";

export default function Header() {
  const productCount = useProductsStore((state) => state.produts.length);
  const { pathname } = useLocation();
  const activeRedirects = Object.keys(routes).reduce((prev, current) => {
    return current === assertRouteKey("/") ||
      (!pathname.includes(current) &&
        !nonHeaderRoutes.includes(current) &&
        !(exceptionsHeaderRoutes[pathname.replace("/", "")] === current))
      ? [...prev, { [current]: routes[current] }]
      : prev;
  }, [] as { [id: string]: string }[]);

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <LogoName headerType="h4" />
      </div>
      <div className={styles.right}>
        <h2 className={styles["current-title"]}>
          {routes[pathname.substring(1)]}
        </h2>
        <div className={styles.redirects}>
          {activeRedirects.map((redirect, index) => (
            <Link
              className={styles.link}
              key={index}
              to={Object.keys(redirect)[0]}
            >
              {Object.values(redirect)[0]}
            </Link>
          ))}
        </div>
      </div>
      <Button
        onClick={() => {
          navigate(`/${assertRouteKey("basket")}`);
        }}
        extraClasses={styles["basket"]}
      >
        <div className={styles["basket-container"]}>
          <BsFillBasket2Fill />
          <span className={styles["basket-count"]}>{productCount}</span>
        </div>
      </Button>
      <div className={styles.flowers}>
        <Flowers />
      </div>
      <div className={styles["redirects-mobile"]}>
        <div className={styles["redirects-mobile-links"]}>
          {activeRedirects.map((redirect, index) => (
            <Link
              className={styles.link}
              key={index}
              to={Object.keys(redirect)[0]}
            >
              {Object.values(redirect)[0]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
