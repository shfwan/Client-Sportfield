import { create } from "zustand";

const date = new Date

export const useOrderStore = create((set) => ({
    date: date.getDate(),
    jam: [],
    isOrder: false,
    
    setDate: (date) => set({ date: date }),
    
    setJam: (jam) => set((state) => ({ jam: [...state.jam, jam] })),

    removeJam: (jam) => set((state) => {
        const indexJam = state.jam.findIndex((item) => item.id == jam.id)
        state.jam.splice(indexJam, 1)
        return ({ jam: state.jam })
    }),

    setOrder: (isOrder) => set({isOrder: isOrder}),
}));
