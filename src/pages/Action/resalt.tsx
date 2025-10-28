import React from 'react';
import { Table, TabsProps, Tabs } from 'antd';
import ReactJsonView from 'react-json-view';
interface Props {
  data: any;
}

const objToArray = (obj: any) => {
  const arr = [];
  for (const key in obj) {
    arr.push({ key: key, value: obj[key] });
  }
  return arr;
};

const Resalt: React.FC<Props> = (props) => {
  const allData = props?.data ?? {};
  const resposeData = props?.data?.data ?? {};
  const respostKey = Object.keys(props ?? {});
  const responseHeader = objToArray(props?.data?.headers);
  const requestHeader = objToArray(props?.data?.config.headers);
  const columns = [
    {
      title: '名称',
      dataIndex: 'key',
      key: 'key',
      width: '140px',
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'decryptData',
      children: (
        <ReactJsonView
          src={resposeData}
          collapsed={false}
          name={respostKey[0] ?? 'data'}
        />
      ),
    },
    {
      key: '2',
      label: 'RequestHeaders',
      children: (
        <Table
          dataSource={requestHeader}
          columns={columns}
          size="small"
          pagination={false}
        />
      ),
    },
    {
      key: '3',
      label: 'ResponseHeaders',
      children: (
        <Table
          dataSource={responseHeader}
          columns={columns}
          size="small"
          pagination={false}
        />
      ),
    },
    {
      key: '4',
      label: '实际请求',
      children: (
        <ReactJsonView src={allData} collapsed={false} name={'全部请求数据'} />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Resalt;
