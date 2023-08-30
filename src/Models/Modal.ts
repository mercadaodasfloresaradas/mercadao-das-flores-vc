export interface IModal {
  children: React.ReactNode;
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}
