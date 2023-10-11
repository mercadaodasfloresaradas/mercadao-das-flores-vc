import { useQuery } from "@tanstack/react-query";
import { IConfigResult } from "../../Models/ConfigResult";
import { configService } from "../../Services/Config.service";
import styles from "./Contacts.module.scss";
import Loading from "../../Components/Loading/Loading";

export default function Contacts() {
  const { data, isLoading } = useQuery({
    queryKey: ["pord"],
    queryFn: (): Promise<IConfigResult> => configService.contactsPage(),
  });

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data?.config.split("\n").map((element, index) => {
            return (
              <p className={styles.data} key={index}>
                {element}
              </p>
            );
          })}
        </div>
      )}
      <img
        className={styles.store}
        src="./Contacts/contacts.jpg"
        alt="Store Image"
      />
    </div>
  );
}
