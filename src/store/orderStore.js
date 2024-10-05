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

        if(indexJam != -1) {
            state.jam.splice(indexJam, 1)
        }
        
        return ({ jam: state.jam })
    }),
    clearJam: (jam) => set({ jam: jam }),

    setOrder: (isOrder) => set({ isOrder: isOrder }),
}));
