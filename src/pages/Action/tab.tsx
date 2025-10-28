import { Divider, Spin, Splitter, Tabs } from 'antd';
import React, { useState } from 'react';
import ActionForm from './form';
import { v4 as uuidv4 } from 'uuid';
import ConfigTop from './configTop';
import { paramsAllData } from './types';
import { QueryContext } from './queryContext';
import { useRequest } from 'alova/client';
import { actionInfo } from './acitonApi';
import Resalt from './resalt';
interface Props {
  name: string;
}
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const EditCenter: React.FC = () => {
  const [paramsAllData, setParamsAllData] = useState<paramsAllData>(
    {} as paramsAllData,
  );

  // 获取所有的数据分发

  const { send, loading, data } = useRequest((data) => actionInfo(data)!, {
    immediate: false,
  });
  return (
    <>
      <Spin spinning={loading} tip="加载中...">
        <Splitter layout="vertical">
          <Splitter.Panel defaultSize={300}>
            <QueryContext value={{ paramsAllData, setParamsAllData }}>
              <ActionForm update={() => send(paramsAllData)} />
              <Divider plain orientation="left" orientationMargin="0">
                请求数据配置
              </Divider>
              <ConfigTop />
            </QueryContext>
          </Splitter.Panel>
          <Splitter.Panel defaultSize={500}>
            <Divider plain orientation="left" orientationMargin="0">
              请求响应数据
            </Divider>
            <Resalt data={data} />
          </Splitter.Panel>
        </Splitter>
      </Spin>
    </>
  );
};

const ActionTab: React.FC<Props> = ({ name }) => {
  const initialItems = [
    {
      label: name,
      children: <EditCenter />,
      key: uuidv4(),
    },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = uuidv4();
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      children: <EditCenter />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </>
  );
};
export default ActionTab;
