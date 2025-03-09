import { create } from 'zustand'


type BaseStore = {
  base: number
  increasePopulation: () => void
  decreasePopulation: () => void
  removeAllBears: () => void
}

export const useBaseStore = create<BaseStore>()((set) => ({
  base: 0,
  increasePopulation: () => set((state) => ({ base: state.base + 1 })),
  decreasePopulation: () => set((state) => ({ base: state.base - 1 })),
  removeAllBears: () => set({ base: 0 }),
}))