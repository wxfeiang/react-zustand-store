import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


export interface SysTemState {
  type: string
  url: string
}
const initialState = {
  dev: {
    key: 'dev',
    name: '开发环境',
    type: 'dev',
    url: 'http://localhost:3000',
  },
  prod: {
    key: 'prod',
    name: '生产环境',
    type: 'prod',
    url: 'http://localhost:8888',
  },

}

const updateSysTem = (data: SysTemState) => useSysTemStore.setState((state) => {
  if (data.type === 'dev') {
    return { ...state, dev: { ...state.dev, ...data } }
  }
  if (data.type === 'prod') {
    return { ...state, prod: { ...state.prod, ...data } }
  }
})
const useSysTemStore = create<typeof initialState>()(
  immer(
    subscribeWithSelector(
      persist(
        () => ({
          ...initialState,
        }),
        {
          name: 'sysTem',
        },
      ),
    ),
  ),
);

export { useSysTemStore, updateSysTem }
