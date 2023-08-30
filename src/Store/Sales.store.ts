import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { INewSaleResult } from "../Models/NewSaleResult";

export interface SalesState {
  lastSale: INewSaleResult | null;
  lastSaleSearchID: string;
  setLastSaleSearchID: (val: string) => void;
  setLastSale: (newSale: INewSaleResult) => void;
}

export const useSalesStore = create<SalesState>()(
  devtools(
    persist(
      (set) => ({
        lastSale: null,
        lastSaleSearchID: "",
        setLastSaleSearchID: (val) =>
          set((state) => ({ lastSaleSearchID: val })),
        setLastSale: (newSale: INewSaleResult) =>
          set((state) => ({ lastSale: newSale })),
      }),
      {
        name: "sales-storage",
      }
    )
  )
);
