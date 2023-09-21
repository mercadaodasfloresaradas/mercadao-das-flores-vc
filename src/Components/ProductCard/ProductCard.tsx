import { BsFillCartPlusFill, BsCartDashFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler } from "react";

import { IProductCard } from "../../Models/ProductCard";
import Button from "../Button/Button";
import { EPorductCardItemType, EProductCard } from "../../Enums/ProductCard";
import { EButton } from "../../Enums/Button";
import { productsService } from "../../Services/Product.service";
import { IPhoto } from "../../Models/Photo";
import { useLightboxStore } from "../../Store/Lightbox.store";

import styles from "./ProductCard.module.scss";
import Loading from "../Loading/Loading";

export default function ProductCard(props: IProductCard) {
  const {
    product,
    isBase64 = true,
    isTest = false,
    hasAction = true,
    actionVisual = EProductCard.purchase,
    handleAction = () => {},
  } = props;
  const { img64 = "", name, description, id, price, category } = product;

  const setProductImg64 = useLightboxStore((state) => state.setProductImg64);

  const { data: imageData, isLoading } = useQuery({
    queryKey: ["productImage", id],
    queryFn: (): Promise<IPhoto> => productsService.photo(id, category),
    enabled: isBase64 && !!category,
  });

  const finalImg64 =
    !!imageData && !!imageData.productPhoto
      ? imageData.productPhoto.img64
      : img64;

  const getImageSRC = isBase64 ? `data:image/jpeg;base64,${finalImg64}` : img64;

  const CardItem = (props: {
    children: React.ReactNode;
    type: EPorductCardItemType;
    onClick?: MouseEventHandler<HTMLDivElement>;
  }) => (
    <div
      className={`${styles.item} ${styles[props.type]}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );

  const ActionIcon = (): JSX.Element => {
    switch (actionVisual) {
      case EProductCard.purchase:
        return <BsFillCartPlusFill />;
      case EProductCard.remove:
        return <BsCartDashFill />;
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content} ${!hasAction ? styles["no-action"] : ""}`}
      >
        <CardItem
          type={EPorductCardItemType.r}
          onClick={() => setProductImg64(isBase64 ? finalImg64 : "")}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <img className={styles.image} src={getImageSRC}></img>
          )}
        </CardItem>
        <CardItem type={EPorductCardItemType.n}>
          <div className={styles.details}>
            <h4 className={styles.title}>{name}</h4>
            <p className={styles.text}>{description}</p>
          </div>
        </CardItem>
        {hasAction ? (
          <CardItem type={EPorductCardItemType.l}>
            <div className={styles.action}>
              {actionVisual === EProductCard.purchase ? (
                <p className={styles.price}>{`${price}€`}</p>
              ) : (
                <></>
              )}
              <Button
                onClick={() =>
                  isTest ? console.log(id) : handleAction(id, product)
                }
                type={EButton.transparent}
                extraClasses={styles["action-input"]}
              >
                <ActionIcon />
              </Button>
            </div>
          </CardItem>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
