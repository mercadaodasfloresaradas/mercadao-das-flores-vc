import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { EProductCard } from "../../Enums/ProductCard";
import { IProduct } from "../../Models/Product";
import { IProductCard } from "../../Models/ProductCard";
import ProductsContainer from "../../Components/ProductsContainer/ProductsContainer";
import Button from "../../Components/Button/Button";
import { productsService } from "../../Services/Product.service";

import styles from "./UI.module.scss";

export default function UI() {
  const { data: productsData } = useQuery({
    queryKey: ["ui"],
    queryFn: (): Promise<IProduct> => productsService.test(),
  });

  const products: IProductCard[] = !!productsData
    ? [
        {
          product: productsData,
          isTest: true,
        },
        {
          product: productsData,
          actionVisual: EProductCard.remove,
          isTest: true,
        },
        {
          product: productsData,
          hasAction: false,
          isTest: true,
        },
      ]
    : [];

  const [isContainerContained, setIsContainerContained] =
    useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles["container-products"]}>
        <Button onClick={() => setIsContainerContained((prev) => !prev)}>
          {isContainerContained ? "Maximize" : "Minimize"}
        </Button>
        <br />
        <br />
        <ProductsContainer
          products={products}
          maxHeight={isContainerContained ? "25rem" : ""}
        />
      </div>
    </div>
  );
}
