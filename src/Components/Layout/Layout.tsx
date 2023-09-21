import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Lightbox from "../Lightbox/Lightbox";
import ProductCounterNotify from "../ProductCounterNotify/ProductCounterNotify";

import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <>
      <div>
        <Header />
        <div className={styles.scroll}>
          <Outlet />
        </div>
        <Footer />
      </div>
      <Lightbox />
      <ProductCounterNotify />
    </>
  );
}
