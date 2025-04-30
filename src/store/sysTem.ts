import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


export interface SysTemState {
  type: string
  url: string
}
export interface GolobalParamsProps {
  key: React.Key;
  name: string;
  value: string;
  position: string;
  status: boolean;
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
      position: 'Header',
      status: true,

    },
    skin: {
      key: 'skin',
      name: 'skin',
      value: 'skin',
      position: 'Header',
      status: true,

    }

  }


}

const updateSysTem = (data: SysTemState) => useSysTemStore.setState((state) => {
  if (data.type === 'dev') {
    return { ...state, env: { ...state.env, dev: { ...state.env.dev, ...data } } }
  }
  if (data.type === 'prod') {
    return { ...state, env: { ...state.env, prod: { ...state.env.prod, ...data } } }
  }

})
const updateGlobalParams = (data: GolobalParamsProps[]) => useSysTemStore.setState((state) => {
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
