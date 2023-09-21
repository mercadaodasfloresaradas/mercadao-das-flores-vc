import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.spinner}>
      <div className={styles["double-bounce1"]}></div>
      <div className={styles["double-bounce2"]}></div>
    </div>
  );
}
