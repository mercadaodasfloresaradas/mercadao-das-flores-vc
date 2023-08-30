import { useState } from "react";

import InfoCard from "../../Components/InfoCard/InfoCard";
import { EPorductCardItemType, EProductCard } from "../../Enums/ProductCard";
import { IProduct } from "../../Models/Product";
import { IProductCard } from "../../Models/ProductCard";
import ProductsContainer from "../../Components/ProductsContainer/ProductsContainer";
import { EInfoCardParagraph } from "../../Enums/InfoCard";
import { EInfoCardAlign } from "../../Enums/InfoCard";

import styles from "./UI.module.scss";
import Button from "../../Components/Button/Button";

export default function UI() {
  const [product] = useState<IProduct>({
    img64:
      "https://scontent.fopo2-1.fna.fbcdn.net/v/t39.30808-6/297452543_5123126461131563_8865720470948845599_n.jpg?_nc_cat=111&cb=99be929b-3346023f&ccb=1-7&_nc_sid=e3f864&_nc_ohc=F1Tx2JQR5tEAX_pSl4X&_nc_ht=scontent.fopo2-1.fna&oh=00_AfBhRwp8GDRmyvVwDlCfpOmSO71XtuKOihTLG4UukYdHxQ&oe=64BA2C51",
    id: "uniqueID",
    description: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At eos id
        ut, quasi distinctio est officiis fuga obcaecati blanditiis error,
        accusantium ipsum! Quos, blanditiis! Asperiores minus quo
        repellendus eaque atque! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Dolor incidunt, facere repellat quas nesciunt ab
        officia dolorem ullam totam ratione earum, excepturi velit facilis
        ut molestiae eos consequatur accusamus doloribus.
        `,
    name: "Rosas",
    price: 20,
  });

  const products: IProductCard[] = [
    {
      product,
      isBase64: false,
    },
    {
      product,
      isBase64: false,
      actionVisual: EProductCard.remove,
    },
    {
      product,
      isBase64: false,
      hasAction: false,
    },
  ];

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
        {/* <InfoCard
          topics={[
            {
              title: "Modos de Pagamento",
              paragraph: `Pagar valor do/s producto/s paa dar o seguinto inicial
            Posteriormente será enviada uma mensagem com o custo do envio
            Mensagens são enviadas na página de seguimento de encomenda
            Nos pagamentos deve meter o seu ID de compra ou enviar sms para nr 913555666 ex -'pagamento 123456ABC'`,
              type: EInfoCardParagraph.enumeration,
            },
            {
              title: "",
              paragraph: `MBWAY: 913555666
            Alternativo MBWAY: 963555666
            Paypal: helena@hotmail.com`,
              type: EInfoCardParagraph.points,
            },
          ]}
        /> */}
      </div>
    </div>
  );
}
