import { IInput } from "../../Models/Input";
import Button from "../Button/Button";
import styles from "./Input.module.scss";

export default function Input(props: IInput) {
  const {
    setValue,
    value,
    actions = [],
    type = "text",
    label = "",
    id,
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles["container-input"]}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          className={styles.input}
          onChange={(event) => setValue(event.currentTarget.value)}
          value={value}
        />
      </div>
      {actions.map((action, index) => (
        <Button
          extraClasses={styles.btn}
          onClick={() => action.handler()}
          key={index}
        >
          {action.data}
        </Button>
      ))}
    </div>
  );
}
