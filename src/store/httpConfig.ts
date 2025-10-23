import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface STSCONFIG {
  enable: boolean
  paramList: string[]
  whiteList: string[]
  headerKey: string
  expandMap: { [key: string]: unknown[] }
  type: string
  paramId: string
}
const initialState = {
  resstrppd: '', // 请求返回的字符串
  appSecret: '',
  dot: '',
  filterData: {} as STSCONFIG,
}

const updateResstrppd = (data: string) => useHttpconfigStore.setState((state) => {
  return { ...state, resstrppd: data }
})
const updateAppSecret = (data: string) => useHttpconfigStore.setState((state) => {
  return { ...state, appSecret: data }
})
const updateDot = (data: string) => useHttpconfigStore.setState((state) => {
  return { ...state, dot: data }
})
const updateFilterData = (data: STSCONFIG) => useHttpconfigStore.setState((state) => {
  return { ...state, filterData: data }
})
const initHttpconfigInfo = () => useHttpconfigStore.setState((state) => {
  return !state.resstrppd || state.filterData || !state.dot
})

const useHttpconfigStore = create<typeof initialState>()(
  immer(
    subscribeWithSelector(
      persist(
        () => ({
          ...initialState,
        }),
        {
          name: 'httpConfig',
        },
      ),
    ),
  ),
);

export { useHttpconfigStore, updateResstrppd, updateAppSecret, updateDot, updateFilterData, initHttpconfigInfo }
