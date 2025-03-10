import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// 中间件顺序
//  immer ----> devtools ----> subscribeWithSelector ----> persist
// 通过setstore / getstore 来操作store 简化抽离
const initialState =  {
  fish: 0,
  // 可以随机拓展字段
}

const addOneFish =()=> useFoodsStore.setState((state)=>({fish:state.fish+1}))
const removeOnefilsh =()=> useFoodsStore.setState((state)=>({fish:state.fish-1}))
const removeAllFish =()=> useFoodsStore.setState(()=>({fish:0}))
const useFoodsStore = create<typeof initialState>()(
  immer(
    subscribeWithSelector(
      persist(
        () => ({
          ...initialState,
        }),
        {
          name: 'foods',
        },
      ),
    ),
  ),
);

export { useFoodsStore, addOneFish, removeOnefilsh, removeAllFish }
