import { IComment } from "./Comment";

export interface ICommentResult {
  success: string;
  conversations: IComment[];
  error?: string;
}
