import { BiConversation } from "react-icons/bi";
import { EChatSender, EChatSenderDisplay } from "../../Enums/Chat";
import { IChat } from "../../Models/Chat";
import Button from "../Button/Button";
import InfoCard from "../InfoCard/InfoCard";

import styles from "./Chat.module.scss";

export default function Chat(props: IChat) {
  const { messages, extraClasses = "", clickedNewMessage } = props;
  const getSenderDisplay = (sender: EChatSender) => {
    switch (sender) {
      case EChatSender.Client:
        return EChatSenderDisplay.Client;
      case EChatSender.Details:
        return EChatSenderDisplay.Details;
      case EChatSender.Seller:
        return EChatSenderDisplay.Seller;
    }
  };
  return (
    <div className={`${styles.container} ${extraClasses}`}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <InfoCard
            topics={[
              {
                title: getSenderDisplay(message.user),
                paragraph: message.message,
              },
            ]}
            key={index}
          />
        ))}
        <span className={styles.space}></span>
      </div>
      <Button
        extraClasses={styles["messages-btn"]}
        onClick={() => clickedNewMessage()}
      >
        <BiConversation className={styles["messages-btn-icon"]} />
      </Button>
    </div>
  );
}
