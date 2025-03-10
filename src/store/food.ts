import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 中间件顺序
//  immer ----> devtools ----> subscribeWithSelector ----> persist

interface FoodsStore {
  fish: number;
  meat: number;
  addOneFish: () => void;
  removeOnefilsh: () => void;
  removeAllFish: () => void;
}
// export const useFoodsStore = create<FoodsStore>()(
//     immer(
//         persist(
//           (set) => ({
//             fish: 0,
//             meat: 0,
//             addOneFish: () => set((state) => ({ fish: state.fish + 1 })),
//             removeOnefilsh: () => set((state) => ({ fish: state.fish - 1 })),
//             removeAllFish: () => set({ fish: 0 }),
//           }),
//           {
//             name: 'foods',
//           },
//         ),
//       ),
//   );

export const useFoodsStore = create<FoodsStore>()(
  immer(
    subscribeWithSelector(
      persist(
        (set) => ({
          fish: 0,
          meat: 0,
          addOneFish: () => set((state) => ({ fish: state.fish + 1 })),
          removeOnefilsh: () => set((state) => ({ fish: state.fish - 1 })),
          removeAllFish: () => set({ fish: 0 }),
        }),
        {
          name: 'foods',
        },
      ),
    ),
  ),
);
