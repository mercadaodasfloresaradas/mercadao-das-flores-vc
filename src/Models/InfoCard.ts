import { EInfoCardAlign, EInfoCardParagraph } from "../Enums/InfoCard";

export interface IInfoCard {
  topics: IInfoCardTopic[];
  align?: EInfoCardAlign;
  extraClasses?: string;
}

export interface IInfoCardTopic {
  title: string;
  isLittleTitle?: boolean;
  paragraph: string | React.ReactNode;
  type?: EInfoCardParagraph;
  seperator?: string;
  align?: "start" | "end" | "center";
  alignText?: "start-text" | "end-text" | "center-text";
}
