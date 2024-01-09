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
          {data?.config
            ?.split("\n")
            .reduce(
              (prev, current) => [...prev, ...current.split("\r")],
              [] as string[]
            )
            .map((element, index) => {
              const Container = (props: { children: string }) =>
                element.includes("**++") ? (
                  <strong className={styles["data-strong"]}>
                    {props.children.replace("**++", "")}
                  </strong>
                ) : (
                  <p className={styles.data}>{props.children}</p>
                );
              return <Container key={index}>{element}</Container>;
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
