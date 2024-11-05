import { create } from "zustand";

const date = new Date

export const useOrderStore = create((set) => ({
    date: date.toLocaleDateString(),
    jam: [],
    isOrder: false,
    imgPos: 0,

    setImgPos: (pos) => set({ imgPos: pos }),

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
