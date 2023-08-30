import { ECommentSender } from "../Enums/Comment";

export interface IComment {
  sender: ECommentSender;
  message: string;
}
