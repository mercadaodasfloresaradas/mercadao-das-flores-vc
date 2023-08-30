import { useState } from "react";
import { IModal } from "../../Models/Modal";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { IGiftMessageForm } from "../../Models/GiftMessageForm";

import styles from "./GiftMessageForm.module.scss";

export default function GiftMessageForm(
  props: Partial<IModal> & IGiftMessageForm
) {
  const { isShowing = false, setIsShowing = () => {}, setNewMessage } = props;
  const [message, setMessage] = useState("");

  return (
    <Modal isShowing={isShowing} setIsShowing={setIsShowing}>
      <div className={styles.container}>
        <h3 className={styles.title}>Messagem Presente</h3>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={styles.input}
          onChange={(event) => setMessage(event.currentTarget.value)}
          value={message}
        />
        <div className={styles.actions}>
          <Button
            onClick={() => {
              setNewMessage(message);
              setIsShowing(false);
            }}
          >
            Guardar
          </Button>
          <Button
            onClick={() => {
              setNewMessage(null);
              setMessage("");
              setIsShowing(false);
            }}
          >
            Limpar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
