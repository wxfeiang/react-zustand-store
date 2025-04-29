import React from 'react';
import { Card, } from 'antd';
import List, { } from './list';
import { useSysTemStore } from '@/store/sysTem';
import { listify } from "radash";
import { updateSysTem } from "../../store/sysTem";

const ApiSysTem: React.FC = () => {
  const env = useSysTemStore((state) => state);
  const envList = listify(env, (key, value) => ({ ...value })); // 将对象转换为数组
  return <>
    {
      envList.map((item, index: number) => {
        return (
          <Card title={item.name} className='mb-[10px]' key={index}>
            <List type={item.type} url={item.url} index={index} update={(data) => updateSysTem(data)} />
          </Card>
        )
      })
    }
  </>
}
export default ApiSysTem;