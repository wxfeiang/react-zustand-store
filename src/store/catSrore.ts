import { create } from 'zustand'

type CatStore = {
  cats:{
    bigCats:number,
    smallCats:number
  }
  addCatBig: () => void
  addCatSmall: () => void
  resetCat: () => void
   getTotalCat: () => number
}

export const useCatStore = create<CatStore>()(
  (set,get) => ({
    cats: {
      bigCats: 0,
      smallCats: 0
    },
    addCatBig: () => set(state => ({
      cats: {
        ...state.cats,
        bigCats: state.cats.bigCats +1
      }
    })),

    addCatSmall: () => set((state) => ({
      cats: {
        ...state.cats,
        smallCats: state.cats.smallCats +1,
       }
     })),
    resetCat: () => set(() => ({ cats: {
        bigCats: 0,
        smallCats: 0
    } })),
     getTotalCat: () =>{
      const {bigCats,smallCats} = get().cats
      return bigCats + smallCats
     },

}))
