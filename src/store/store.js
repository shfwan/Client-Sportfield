import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"

export const useStoreSportField = create(
    persist(
        (set) => ({
            token: {},
            isLogin: false,
            setLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
            setToken: (token) => set(() => ({ token: token })),
        }),
        {
            name: 'auth', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    )
)