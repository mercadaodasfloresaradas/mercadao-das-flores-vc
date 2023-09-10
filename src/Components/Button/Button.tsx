import styles from "./Button.module.scss";
import { IButton } from "../../Models/Button";
import { EButton } from "../../Enums/Button";

export default function Button(props: IButton) {
  const { onClick, children, extraClasses = "", type = EButton.normal } = props;
  return (
    <button
      className={`${styles.container} ${styles[type]} ${extraClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
