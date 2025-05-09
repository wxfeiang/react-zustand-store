import { Divider, Tabs } from 'antd';
import React, { useState } from 'react'
import ActionForm from './form';
import { uid } from 'radash';
import ConfigTop from './configTop';
interface Props {
  name: string
}
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

interface QueryContextProp {
  paramsAllData: object
  setParamsAllData: (paramsAllData: object) => void;
}
export const QueryContext = React.createContext<QueryContextProp>({} as QueryContextProp);
const EditCenter: React.FC = () => {
  const [paramsAllData, setParamsAllData] = useState({})

  return <>
    <QueryContext value={{ paramsAllData, setParamsAllData }}>
      <ActionForm />
      <Divider plain orientation="left" orientationMargin="0">请求数据配置</Divider>
      <ConfigTop />
      <Divider plain orientation="left" orientationMargin="0">请求响应数据</Divider>
    </QueryContext>
  </>
}

const ActionTab: React.FC<Props> = ({ name }) => {
  const initialItems = [
    {
      label: name,
      children: <EditCenter />,
      key: uid(8)
    },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);


  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = uid(8)
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      children: <EditCenter />,
      key: newActiveKey
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