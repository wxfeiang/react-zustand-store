import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;
import List from './list';
import { useSysTemStore } from '@/store/sysTem';
import { listify } from 'radash';

const onChange = (key: string) => {
  console.log(key);
};

interface curentTextProps {
  update: (value: string) => void
}

const CurrentText: React.FC<curentTextProps> = (props) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    saveVale(value);
    props.update(value);
  }, [value]);
  return <>
    <TextArea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="输入JSON格式字符串即可"
      autoSize={{ minRows: 4, maxRows: 6 }}
    />
  </>
}
const saveVale = (value: string) => {
  console.log('value===>>>', value);
}

const ConfigTop: React.FC = () => {
  const { globalParams } = useSysTemStore();

  const data = listify(globalParams, (_key, value) => ({ ...value, key: _key + '' })).filter((item) => item.position === 'Header')
  const [headerData, setHeaderData] = useState<typeof data>(data)
  const [bodyData, setBodyData] = useState<string>("")
  const [paramsData, setParamsData] = useState<string>("")

  const HeadersDataParams = (value: typeof data) => {
    setHeaderData(value)
  }
  const updatePrams = (value: string) => {
    setParamsData(value)
  }
  const updateBody = (value: string) => {
    setBodyData(value)
  }
  useEffect(() => {
    console.log(headerData, paramsData, bodyData,); // 此时可以安全地使用最新的count值
  }, [headerData, bodyData, paramsData]); // 依赖项数组包含count，确保每次count变化时都运行此effect

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Params',
      children: <CurrentText update={updatePrams} />,
    },
    {
      key: '2',
      label: 'Body',
      children: <CurrentText update={updateBody} />,
    },
    {
      key: '3',
      label: 'Headers',
      children: <List data={data} update={HeadersDataParams} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};

export default ConfigTop;