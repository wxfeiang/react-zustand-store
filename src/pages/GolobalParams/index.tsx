import React from 'react';
import { Card } from 'antd';
import { useSysTemStore, updateGlobalParams } from '@/store/sysTem';
import List from './list';

const GolobalParams: React.FC = () => {
  const { globalParams } = useSysTemStore();
  const data = globalParams; // 将对象转换为数组
  return (
    <>
      <Card title="全局参数" className="my-[10px]">
        <List data={data} update={(val) => updateGlobalParams(val)} />
      </Card>
    </>
  );
};
export default GolobalParams;
