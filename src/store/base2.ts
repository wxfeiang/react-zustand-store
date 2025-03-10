import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// 中间件顺序
//  immer ----> devtools ----> persist


type BaseStore = {
  base: number
  name: string,
  size: number,
  count: number,
  increasePopulation: () => void
  decreasePopulation: () => void
  removeAllBears: () => void
  reset: () => void
}

export const useBaseStore = create<BaseStore>()(
  persist((set) => (
    {
      base: 0,
      name: 'basdsde2',
      size: 10,
      count: 100,
      increasePopulation: () => set((state) => ({ base: state.base + 1 })),
      decreasePopulation: () => set((state) => ({ base: state.base - 1 })),
      removeAllBears: () => set({ base: 0 }),
      reset: () => set(() => {
        console.log('reset, 想要实现清除缓存/重置状态')


        return {
          base: 0,
          name: 'base2',
          size: 10,
          count: 100
        }
      })
    }
  ),{
    name: 'base2',
    storage: createJSONStorage(() => sessionStorage), // 可以存在不同的缓存中 // 默认是localStorage
    // partialize: (state) => ({  // 只保存name
    //   name: state.name
    // }),
    partialize: (state) => (
       // 过滤出不保存的key
       Object.fromEntries(
        Object.entries(state).filter(([key]) => !['count'].includes(key))
      )
    ),



  }

))