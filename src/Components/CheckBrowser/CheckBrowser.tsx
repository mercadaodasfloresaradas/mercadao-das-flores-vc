import React, { useEffect, useRef, useState } from "react";
import useBrowserCheck from "../../Hooks/useBrowserCheck";
import Modal from "../../Components/Modal/Modal";
import Button from "../../Components/Button/Button";
import { IoCopyOutline } from "react-icons/io5";
import styles from "./CheckBrowser.module.scss";

export default function CheckBrowser() {
  const [isShowingAlert, setIsShowingAlert] = useState<boolean>(false);
  const hasToLaunchMainBrowser = useBrowserCheck();
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasToLaunchMainBrowser) {
      setIsShowingAlert(true);
    }
  }, [hasToLaunchMainBrowser]);

  const copy = () => {
    textRef.current?.select();
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Modal isShowing={isShowingAlert} setIsShowing={setIsShowingAlert}>
      <div className={styles.container}>
        <h3 className={styles.title}>
          Navegador da aplicação não suportado, por favor copie o link a baixo e
          abra no navegador do seu aparelho:
        </h3>
        <div className={styles.copy}>
          <input
            type="text"
            value={window.location.href}
            onFocus={(event) => event.target.select()}
            ref={textRef}
            className={styles.text}
          />
          <Button onClick={copy}>
            <IoCopyOutline />
          </Button>
        </div>
        <Button onClick={() => setIsShowingAlert(false)}>OK</Button>
      </div>
    </Modal>
  );
}
