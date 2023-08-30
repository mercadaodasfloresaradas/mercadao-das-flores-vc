import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IProduct } from "../Models/Product";

export interface ProductsState {
  produts: IProduct[];
  addProduct: (product: IProduct) => void;
  removeProduct: (id: string) => void;
  emptyProducts: () => void;
}

export const useProductsStore = create<ProductsState>()(
  devtools(
    persist(
      (set) => ({
        produts: [],
        addProduct: (product: IProduct) =>
          set((state) => ({ produts: [...state.produts, product] })),
        removeProduct: (id: string) =>
          set((state) => {
            let hasCaughtOne: boolean = false;
            return {
              produts: state.produts.filter((product) => {
                if (!hasCaughtOne) {
                  hasCaughtOne = product.id === id;
                  return product.id !== id;
                } else {
                  return true;
                }
              }),
            };
          }),
        emptyProducts: () => set((state) => ({ produts: [] })),
      }),
      {
        name: "products-storage",
      }
    )
  )
);
