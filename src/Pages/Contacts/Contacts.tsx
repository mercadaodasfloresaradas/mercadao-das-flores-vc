import styles from "./Contacts.module.scss";

export default function Contacts() {
  return (
    <div className={styles.container}>
      <div>
        {`
                Horários
                Seg:
                Ter:
                Qua:
                Qui:
                Sex:
                Contacto
                Rua do buragal nº 218 Aradas-Aveiro
                3810-382
                TLF: 234427229
                TLM:963928334
                hsilva.maria@gmail.com
                `
          .split("\n")
          .map((element, index) => {
            return (
              <p className={styles.data} key={index}>
                {element}
              </p>
            );
          })}
      </div>
      <img
        className={styles.store}
        src="./Contacts/contacts.jpg"
        alt="Store Image"
      />
    </div>
  );
}
