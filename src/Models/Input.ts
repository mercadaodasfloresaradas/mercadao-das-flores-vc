import React from "react";

export interface IInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  type?: string;
  label?: string;
  actions?: {
    handler: () => void;
    data: React.ReactNode;
  }[];
}
