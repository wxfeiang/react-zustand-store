import React from 'react';
import { Card } from 'antd';
import { useSysTemStore, updateGlobalParams } from '@/store/sysTem';
import List from './list';
import { listify } from 'radash';


const GolobalParams: React.FC = () => {
  const { goloabaParams } = useSysTemStore();
  const data = listify(goloabaParams, (key, value) => ({ ...value })); // 将对象转换为数组
  return <>
    <Card title='全局参数' className='my-[10px]'>
      <List data={data} update={(val) => updateGlobalParams(val)} />

    </Card>

  </>
}
export default GolobalParams;