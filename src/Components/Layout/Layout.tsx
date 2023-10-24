import { Outlet, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import Header from "../Header/Header";
import Offline from "../Offline/Offline";
import Footer from "../Footer/Footer";
import Lightbox from "../Lightbox/Lightbox";
import ProductCounterNotify from "../ProductCounterNotify/ProductCounterNotify";
import { configService } from "../../Services/Config.service";
import { IConfigResult } from "../../Models/ConfigResult";
import { useServiceStore } from "../../Store/Service.store";
import useServiceCheck from "../../Hooks/useServiceCheck";

import styles from "./Layout.module.scss";

export default function Layout() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useServiceCheck();

  const setNoServiceMessage = useServiceStore(
    (state) => state.setNoServiceMessage
  );

  const { data } = useQuery({
    queryKey: ["noService"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.noService();
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!!data) {
      setNoServiceMessage(data.config);
    }
  }, [data]);

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
      <Offline />
    </>
  );
}
