import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import ProductsContainer from "../../Components/ProductsContainer/ProductsContainer";
import InfoCard from "../../Components/InfoCard/InfoCard";
import { EInfoCardParagraph } from "../../Enums/InfoCard";
import Button from "../../Components/Button/Button";
import { EButton } from "../../Enums/Button";
import { productsService } from "../../Services/Product.service";
import { ICategories } from "../../Models/Categories";
import { useQuery } from "@tanstack/react-query";
import { IProducts } from "../../Models/Products";
import { useProductsStore } from "../../Store/Products.store";
import { IConfigResult } from "../../Models/ConfigResult";
import { configService } from "../../Services/Config.service";

export default function Products() {
  const addProduct = useProductsStore((state) => state.addProduct);

  const [categorySelected, setCategorySelected] = useState<string>("");

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: (): Promise<ICategories> => productsService.categories(),
  });

  const { data: delivery } = useQuery({
    queryKey: ["delivery"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.delivery();
    },
  });

  const { data: support } = useQuery({
    queryKey: ["support"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.support();
    },
  });

  const { data: returns } = useQuery({
    queryKey: ["returns"],
    queryFn: (): Promise<IConfigResult> => {
      return configService.returns();
    },
  });

  const { data: productsData } = useQuery({
    queryKey: ["products", categorySelected],
    queryFn: (): Promise<IProducts> =>
      productsService.products(categorySelected),
    enabled: !!categorySelected,
  });

  useEffect(() => {
    if (categoriesData?.categories && categoriesData.categories.length) {
      setCategorySelected(categoriesData.categories[0]);
    }
  }, [categoriesData]);

  const categories: { id: string; value: string }[] = (
    categoriesData?.categories || []
  ).map((category) => {
    return { id: category, value: category };
  });

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <InfoCard
          extraClasses={styles.constrained}
          topics={[
            {
              title: "Categorias:",
              paragraph: (
                <>
                  {categories.map((category, index) => {
                    return (
                      <div key={index}>
                        <Button
                          onClick={() => {
                            setCategorySelected(category.id);
                            console.log(category.id);
                          }}
                          type={EButton.transparentLeftSmall}
                        >
                          {category.value}
                        </Button>
                      </div>
                    );
                  })}
                </>
              ),
              type: EInfoCardParagraph.enumeration,
            },
          ]}
        />
        <InfoCard
          topics={[
            {
              title: "Apoio Ao Cliente",
              paragraph: ``,
            },
            {
              title: "Entrega",
              paragraph: delivery?.config,
              type: EInfoCardParagraph.text,
              isLittleTitle: true,
            },
            {
              title: "Suporte",
              paragraph: support?.config,
              type: EInfoCardParagraph.text,
              isLittleTitle: true,
            },
            {
              title: "Devolução",
              paragraph: returns?.config,
              type: EInfoCardParagraph.text,
              isLittleTitle: true,
            },
          ]}
        />
      </div>
      <ProductsContainer
        products={
          productsData
            ? productsData.products.map((product) => ({
                product,
                handleAction(id, product) {
                  addProduct(product);
                },
              }))
            : []
        }
      />
      <div></div>
    </div>
  );
}
