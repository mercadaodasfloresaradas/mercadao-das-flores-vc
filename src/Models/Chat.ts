import { EChatSender } from "../Enums/Chat";

export interface IChat {
  messages: IChatMessages[];
  extraClasses?: string;
  clickedNewMessage: () => void;
}

export interface IChatMessages {
  user: EChatSender;
  message: string;
}
