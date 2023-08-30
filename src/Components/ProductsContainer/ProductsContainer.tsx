import { IProductCard } from "../../Models/ProductCard";
import { IProductsContainer } from "../../Models/ProductsContainer";
import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductsContainer.module.scss";

export default function ProductsContainer(props: IProductsContainer) {
  const {
    products,
    maxHeight = "",
    productsActionHandler,
    productsActionVisual,
    hasProductsAction,
  } = props;

  const getContainerStyles = (): React.CSSProperties => {
    let containerStyles: React.CSSProperties = {};

    containerStyles = !!maxHeight
      ? { ...containerStyles, maxHeight }
      : containerStyles;

    return containerStyles;
  };

  const getOptionalProductProps = (): Partial<IProductCard> => {
    let generalProps: Partial<IProductCard> = {};

    generalProps = !!productsActionHandler
      ? { ...generalProps, handleAction: productsActionHandler }
      : generalProps;
    generalProps = !!productsActionVisual
      ? { ...generalProps, actionVisual: productsActionVisual }
      : generalProps;
    generalProps =
      hasProductsAction !== undefined
        ? { ...generalProps, hasAction: hasProductsAction }
        : generalProps;

    return generalProps;
  };

  const generalProductPros: Partial<IProductCard> = getOptionalProductProps();

  return (
    <div className={styles.container} style={getContainerStyles()}>
      {products.map((product, index) => (
        <ProductCard {...product} {...generalProductPros} key={index} />
      ))}
    </div>
  );
}
