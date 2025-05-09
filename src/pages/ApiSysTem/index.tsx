import React from 'react';
import { Card, } from 'antd';
import List, { } from './list';
import { updateCurrentEnv, useSysTemStore } from '@/store/sysTem';
import { listify } from "radash";
import { updateSysTem } from "../../store/sysTem";
import classNames from 'classnames';

const ApiSysTem: React.FC = () => {
  const cINdex = useSysTemStore((state) => state.currentEnv);
  const env = useSysTemStore((state) => state.env);
  const envList = listify(env, (_key, value) => ({ ...value })); // 将对象转换为数组
  const onActive = (e: number) => {
    updateCurrentEnv(e)
  }
  return <>
    {
      envList.map((item, index: number) => {
        return (
          <Card title={item.name}
            className={classNames('my-[10px]', { 'bd-#1890ff': index === cINdex })}
            key={index}
            onClick={() => onActive(index)}
            extra={index === cINdex ? <div className='text-[#fff] bg-rose px-[15px] rounded-[10px] '>当前使用环境</div> : null}
          >
            <List data={item} update={(data) => updateSysTem(data)} />
          </Card>
        )
      })
    }
  </>
}
export default ApiSysTem;