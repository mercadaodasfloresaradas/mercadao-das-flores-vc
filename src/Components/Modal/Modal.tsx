import styles from "./Modal.module.scss";
import { IModal } from "../../Models/Modal";

export default function Modal(props: IModal) {
  const { children, isShowing, setIsShowing } = props;
  return (
    <>
      {isShowing ? (
        <div className={styles.cover}>
          <div className={styles.full} onClick={() => setIsShowing(false)}>
            <div
              className={styles.container}
              onClick={(event) => event.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
