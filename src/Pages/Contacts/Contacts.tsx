import styles from "./Contacts.module.scss";

export default function Contacts() {
  return (
    <div>
      <pre className={styles.data}>
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
          `}
      </pre>
    </div>
  );
}
