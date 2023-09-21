import React, { useEffect, useState } from "react";

import { useProductsStore } from "../../Store/Products.store";

import styles from "./ProductCounterNotify.module.scss";

export default function ProductCounterNotify() {
  const productCount = useProductsStore((state) => state.produts.length);
  const [pastCount, setPastCount] = useState<number>(productCount);
  const [IsShowing, setIsShowing] = useState<boolean>(false);

  useEffect(() => {
    if (productCount > pastCount) {
      setIsShowing(true);
      setTimeout(() => {
        setPastCount(productCount);
        setIsShowing(false);
      }, 1400);
    } else if (productCount < pastCount) {
      setPastCount(productCount);
    }
  }, [productCount]);
  return (
    <>
      {IsShowing ? (
        <>
          <div className={styles["container-nnp"]}>{productCount}</div>
          <div className={styles["block-nnp"]}></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
