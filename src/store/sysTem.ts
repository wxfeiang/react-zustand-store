import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


interface IEnvConfig {
  name: string;
  type: 'dev' | 'prod' | string; // 明确可选类型，保留扩展性
  url: string;
}

interface IGlobalParam {
  name: string;
  value: string;
  position: 'Header' | 'Query' | 'Body'; // 常用的参数位置
  status: boolean;
}

interface IConfig {
  env: {
    [envName: string]: IEnvConfig; // 动态环境键名（如 dev/prod）
  };
  globalParams: {  // 修正拼写：goloabaParams -> globalParams
    [paramKey: string]: IGlobalParam;
  };
}

const initialState: IConfig = {
  env: {
    dev: {

      name: '开发环境',
      type: 'dev',
      url: 'http://localhost:3000',
    },
    prod: {

      name: '生产环境',
      type: 'prod',
      url: 'http://localhost:8888',
    },
  },
  globalParams: {
    Authorization: {

      name: 'Authorization',
      value: "qingqiutoken",
      position: 'Header',
      status: true,
    },
    skin: {

      name: 'skin',
      value: 'skin',
      position: 'Header',
      status: true,
    }
  }
};


const updateSysTem = (data: IEnvConfig) => useSysTemStore.setState((state) => {
  if (data.type === 'dev') {
    return { ...state, env: { ...state.env, dev: { ...state.env.dev, ...data } } }
  }
  if (data.type === 'prod') {
    return { ...state, env: { ...state.env, prod: { ...state.env.prod, ...data } } }
  }

})
const updateGlobalParams = (data: IGlobalParam[]) => useSysTemStore.setState((state) => {
  return { ...state, globalParams: { ...data } }
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
