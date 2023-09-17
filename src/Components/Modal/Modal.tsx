import styles from "./Modal.module.scss";
import { IModal } from "../../Models/Modal";

export default function Modal(props: IModal) {
  const { children, isShowing, setIsShowing, extraClasses = "" } = props;
  return (
    <>
      {isShowing ? (
        <div className={`${styles.cover} ${extraClasses}`}>
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
