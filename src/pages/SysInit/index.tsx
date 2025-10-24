import { sysinitInfo } from '@/api/system';
import { useRequest } from 'alova/client';
import { Button, Card, Space, TableColumnType } from 'antd';
import { Table } from 'antd';
import React, { useState } from 'react';
import { getContCode } from '@/pages/utils';
import {
  updateDot,
  updateFilterData,
  updateResstrppd,
  useHttpconfigStore,
  initHttpconfigInfo,
} from '@/store/httpConfig';
interface listType {
  id: number;
  name: string;
  url: string;
  result: string;
}

const SysInit: React.FC = () => {
  const { filterData, dot, resstrppd } = useHttpconfigStore();
  const [list, setList] = useState<listType[]>([
    {
      id: 1,
      name: '获取系统配置',
      url: '/captcha/config',
      result: JSON.stringify(filterData),
    },
    {
      id: 2,
      name: '获取getDot',
      url: '/captcha/getDot',
      result: JSON.stringify(dot),
    },
    {
      id: 3,
      name: '获取响应配置',
      url: '/captcha/getResponseConfig',
      result: JSON.stringify(resstrppd),
    },
  ]);
  const { send: sendSysinitInfo, loading } = useRequest(
    (data) => sysinitInfo(data),
    {
      immediate: false,
    },
  );
  const ActionsArr = () => {
    return <div>系统初始化{initHttpconfigInfo() ? '完成' : '未完成'}</div>;
  };
  const columns: TableColumnType<listType>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '接口地址',
      dataIndex: 'url',
      key: 'url',
      width: 200,
    },
    {
      title: '接口结果',
      dataIndex: 'result',
      key: 'result',
      width: 500,
      render: (_, record) => (
        <div className="max-w-500px truncate-2">{record.result}</div>
      ),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="edit"
            type="primary"
            key="edit"
            onClick={() => sendSysinitItemInfo(record.url)}
          >
            {record.result ? '刷新' : '获取'}
          </Button>
        </Space>
      ),
    },
  ];
  const sendSysinitItemInfo = async (url: string) => {
    const newList = JSON.parse(JSON.stringify(list));
    const res = (await sendSysinitInfo(url)) as any;
    const index = newList.findIndex((item: listType) => item.url === url);
    const count = res?.headers?.count;
    if (index === 0) {
      const code = res.data.data.paramId;
      const filterdata = {
        ...res.data.data,
        paramId: getContCode(count, code),
      };
      newList[index].result = JSON.stringify(filterdata);
      updateFilterData(filterdata);
    }
    if (index === 1) {
      const code = res.data.data;
      const dot = getContCode(count, code);
      newList[index].result = JSON.stringify(dot);
      updateDot(dot);
    }
    if (index === 2) {
      const code = res.data.data.pubK;
      const resstrppd = getContCode(count, code);
      newList[index].result = JSON.stringify(resstrppd);
      updateResstrppd(resstrppd);
    }

    setList(
      newList.map((item: listType) => {
        if (item.url === url) {
          item.result = JSON.stringify(res.data);
        }
        return item;
      }),
    );
  };

  return (
    <>
      <Card title="系统初始化接口" actions={[<ActionsArr />]}>
        <Table<listType>
          dataSource={list}
          columns={columns}
          pagination={false}
          loading={loading}
          rowKey={(record) => record.id}
        />
      </Card>
    </>
  );
};

export default SysInit;
