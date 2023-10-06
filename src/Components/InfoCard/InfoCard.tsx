import React from "react";
import { EInfoCardAlign, EInfoCardParagraph } from "../../Enums/InfoCard";
import { IInfoCard, IInfoCardTopic } from "../../Models/InfoCard";

import styles from "./InfoCard.module.scss";

export default function InfoCard(props: IInfoCard) {
  const { topics, align = EInfoCardAlign.left, extraClasses = "" } = props;

  const getTopicsOrDefaults = (topic: IInfoCardTopic): IInfoCardTopic => {
    const {
      paragraph,
      title,
      seperator = ["\n"],
      type = EInfoCardParagraph.text,
      isLittleTitle = false,
      align = "center",
      alignText = "start-text",
    } = topic;

    return {
      paragraph,
      title,
      seperator,
      type,
      isLittleTitle,
      align,
      alignText,
    };
  };

  const paragraphSerated = (
    paragraph: string[],
    seperator: string[],
    index: number = 0
  ): string[] => {
    let result: string[] = [];
    if (!seperator.length || seperator.length <= index) {
      return paragraph;
    }

    paragraph.forEach((line: string) => {
      result = [...result, ...line.split(seperator[index])];
    });

    return paragraphSerated(result, seperator, index + 1);
  };

  const Paragraph = (props: IInfoCardTopic) => {
    const { type, paragraph, seperator } = props;

    switch (type) {
      case EInfoCardParagraph.text:
        return <p>{paragraph}</p>;
      case EInfoCardParagraph.enumeration:
        return (
          <ol className={styles["list-ol"]}>
            {paragraphSerated([paragraph as string], seperator!).map(
              (line, index) =>
                line ? (
                  <li key={index}>{line}</li>
                ) : (
                  <React.Fragment key={index} />
                )
            )}
          </ol>
        );
      case EInfoCardParagraph.points:
        return (
          <ul className={styles["list-ul"]}>
            {paragraphSerated([paragraph as string], seperator!).map(
              (line, index) =>
                line ? (
                  <li key={index}>{line}</li>
                ) : (
                  <React.Fragment key={index} />
                )
            )}
          </ul>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={`${styles.container} ${styles[align]} ${extraClasses}`}>
      {topics.map((topic, index) => {
        const topicFinal = getTopicsOrDefaults(topic);
        return (
          <div
            className={`${styles.topic} ${styles[topicFinal.align!]} ${
              styles[topicFinal.alignText!]
            }`}
            key={index}
          >
            {topicFinal.title ? (
              <h3
                className={`${styles.title} ${
                  topicFinal.isLittleTitle ? styles["title-little"] : ""
                }`}
              >
                {topicFinal.title}
              </h3>
            ) : (
              <></>
            )}
            <div className={`${styles.paragraph}`}>
              {typeof topicFinal.paragraph === "string" ? (
                <Paragraph {...topicFinal} />
              ) : (
                topicFinal.paragraph
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
