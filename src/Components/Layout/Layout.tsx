import { Outlet, useLocation } from "react-router";
import { useEffect, useRef } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Lightbox from "../Lightbox/Lightbox";
import ProductCounterNotify from "../ProductCounterNotify/ProductCounterNotify";

import styles from "./Layout.module.scss";

export default function Layout() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div>
        <Header />
        <div className={styles.scroll} ref={scrollRef}>
          <Outlet />
        </div>
        <Footer />
      </div>
      <Lightbox />
      <ProductCounterNotify />
    </>
  );
}
