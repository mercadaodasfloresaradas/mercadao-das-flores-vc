import Modal from "../Modal/Modal";
import { useLightboxStore } from "../../Store/Lightbox.store";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./Lightbox.module.scss";

export default function Lightbox() {
  const productImg64 = useLightboxStore((state) => state.productImg64);
  const setProductImg64 = useLightboxStore((state) => state.setProductImg64);

  return (
    <Modal
      isShowing={!!productImg64}
      setIsShowing={() => {
        setProductImg64(null);
      }}
    >
      <img
        className={styles.img}
        src={`data:image/jpeg;base64,${productImg64}`}
        alt="Lightbox Product Image"
      />
      <AiOutlineClose
        className={styles.close}
        onClick={() => setProductImg64(null)}
      />
    </Modal>
  );
}
