import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { INewSaleResult } from "../Models/NewSaleResult";

export interface LightboxState {
  productImg64: string | null;
  setProductImg64: (img64: string | null) => void;
}

export const useLightboxStore = create<LightboxState>()(
  devtools(
    persist(
      (set) => ({
        productImg64: null,
        setProductImg64: (img64) => set((state) => ({ productImg64: img64 })),
      }),
      {
        name: "lightbox-storage",
      }
    )
  )
);
