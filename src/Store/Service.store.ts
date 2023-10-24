import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ServiceState {
  hasService: boolean;
  noServiceMessage: string;
  setHasService: (hasService: boolean) => void;
  setNoServiceMessage: (newMessage: string) => void;
}

export const useServiceStore = create<ServiceState>()(
  devtools(
    persist(
      (set) => ({
        hasService: true,
        noServiceMessage: `Lamentamos mas de momento estamos com problemas internos, tente mais tarde...`,
        setHasService: (hasService) => set((state) => ({ hasService })),
        setNoServiceMessage: (newMessage) =>
          set((state) => ({ noServiceMessage: newMessage })),
      }),
      {
        name: "service-storage",
      }
    )
  )
);
