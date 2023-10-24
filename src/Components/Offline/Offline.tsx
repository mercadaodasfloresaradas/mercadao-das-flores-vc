import { useServiceStore } from "../../Store/Service.store";
import styles from "./Offline.module.scss";

export default function Offline() {
  const hasService = useServiceStore((state) => state.hasService);

  const noServiceMessage = useServiceStore((state) => state.noServiceMessage);

  return (
    <>
      {hasService ? (
        <></>
      ) : (
        <div className={styles.container}>{noServiceMessage}</div>
      )}
    </>
  );
}
