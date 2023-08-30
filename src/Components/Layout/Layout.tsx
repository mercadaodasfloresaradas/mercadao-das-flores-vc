import React from "react";
import { Outlet } from "react-router";

import styles from "./Layout.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <div className={styles.scroll}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
