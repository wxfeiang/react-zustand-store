import React from 'react';
import { Card, message } from 'antd';
import List from './list';
import { updateCurrentEnv, useSysTemStore, updateSysTem } from '@/store/sysTem';
import { listify } from 'radash';
import classNames from 'classnames';

const ApiSysTem: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const cINdex = useSysTemStore((state) => state.currentEnv);
  const env = useSysTemStore((state) => state.env);
  const envList = listify(env, (_key, value) => ({ ...value })); // 将对象转换为数组
  const onActive = (e: number) => {
    if (cINdex === e) return;
    updateCurrentEnv(e);
    messageApi.open({
      type: 'success',
      content: '环境变量切换成功',
    });
  };
  return (
    <>
      {contextHolder}
      {envList.map((item, index: number) => {
        return (
          <Card
            title={item.name}
            className={classNames('my-[10px]', {
              'bd-#1890ff': index === cINdex,
            })}
            key={index}
            onClick={() => onActive(index)}
            extra={
              index === cINdex ? (
                <div className="text-[#fff] bg-rose px-[15px] rounded-[10px] ">
                  当前使用环境
                </div>
              ) : null
            }
          >
            <List data={item} update={(data) => updateSysTem(data)} />
          </Card>
        );
      })}
    </>
  );
};
export default ApiSysTem;
