import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


export interface SysTemState {
  type: string
  url: string
}
const initialState = {
  env: {
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
  },
  goloabaParams: {
    Authorization: {
      key: 'Authorization',
      name: 'Authorization',
      value: "qingqiutoken",
      position: 'header',
      status: true,

    },
    skin: {
      key: 'skin',
      name: 'skin',
      value: "skin",
      position: 'header',
      status: true,

    }

  }


}

const updateSysTem = (data: SysTemState) => useSysTemStore.setState((state) => {
  if (data.type === 'dev') {
    return { ...state, dev: { ...state.env.dev, ...data } }
  }
  if (data.type === 'prod') {
    return { ...state, prod: { ...state.env.prod, ...data } }
  }
})
const updateGlobalParams = (data: SysTemState) => useSysTemStore.setState((state) => {
  return { ...state, goloabaParams: { ...data } }
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

export { useSysTemStore, updateSysTem, updateGlobalParams }
