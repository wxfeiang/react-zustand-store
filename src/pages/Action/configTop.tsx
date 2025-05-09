import React, { useContext, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;
import List from './list';
import { useSysTemStore } from '@/store/sysTem';

import { QueryContext } from './tab';
import OutherList from './outheList';

const onChange = (key: string) => {
  console.log(key);
};

interface curentTextProps {
  update: (value: string) => void
}
interface outherDataType {
  key: string
  name: string
  desc: string
  status: boolean
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

  const data = globalParams.filter((item) => item.position === 'Header')
  const [headerData, setHeaderData] = useState<typeof data>(data)
  const [bodyData, setBodyData] = useState<string>("")
  const [paramsData, setParamsData] = useState<string>("")
  const [outherData, setOutherData] = useState<outherDataType[]>(
    [
      {
        key: '1',
        name: 'ignoreSign',
        desc: '忽略签名',
        status: false
      },
      {
        key: '2',
        name: 'ignorEencrypt',
        desc: '忽略加密',
        status: false
      },
      {
        key: '3',
        name: 'ignorToken',
        desc: '忽略token',
        status: false
      },
      {
        key: '4',
        name: 'initParams',
        desc: '初始化参数',
        status: false
      }
    ]
  )
  const queryContext = useContext(QueryContext); // 使用上下文
  const HeadersDataParams = (value: typeof data) => {
    setHeaderData(value)
  }
  const updatePrams = (value: string) => {
    setParamsData(value)
  }
  const updateBody = (value: string) => {
    setBodyData(value)
  }
  const upOutherData = (value: outherDataType[]) => {
    setOutherData(value)
  }
  useEffect(() => {
    console.log(headerData, paramsData, bodyData); // 此时可以安全地使用最新的count值
    queryContext.setParamsAllData({ headerData, paramsData, bodyData, outherData })
  }, [headerData, bodyData, paramsData, outherData]); // 依赖项数组包含count，确保每次count变化时都运行此effect

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
    {
      key: '4',
      label: '请求额外配置',
      children: <OutherList data={outherData} update={upOutherData} />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};

export default ConfigTop;