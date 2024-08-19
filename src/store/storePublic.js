import { create } from "zustand";

export const useStorePublic = create((set) => ({
    isDisable: false,
    setDisable: () => set((state) => ({ isDisable: !state.isDisable })),
}))