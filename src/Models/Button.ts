import { EButton } from "../Enums/Button";

export interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
  extraClasses?: string;
  type?: EButton;
}
