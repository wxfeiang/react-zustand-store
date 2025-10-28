import { Button, Input, Select, Space, Tooltip } from 'antd';
import { useSysTemStore } from '@/store/sysTem';
import { toArray } from 'lodash-es';
import React, { useContext, useEffect, useState } from 'react';
import { QueryContext } from './queryContext';
import { method } from './types';

interface Props {
  update: () => void;
}
const options = [
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'PUT',
    label: 'PUT',
    disabled: true,
  },
  {
    value: 'DELETE',
    label: 'DELETE',
    disabled: true,
  },
];

const ActionForm: React.FC<Props> = (props) => {
  const env = useSysTemStore((state) => state.env);
  const envList = toArray(env);
  const queryContext = useContext(QueryContext); // 使用上下文

  const [url, setUrl] = useState(''); // 修改url的类型声明
  const [method, setMethod] = useState<method>('POST');

  const sendParams = () => {
    props.update();
  };

  useEffect(() => {
    queryContext.setParamsAllData({
      ...queryContext.paramsAllData,
      url,
      method, // 添加类型断言
    });
  }, [url, method]);

  return (
    <>
      <div className="flex gap-[10px] items-center">
        <Space.Compact>
          <Select
            defaultValue={method}
            options={options}
            className="w-[160px]"
            onChange={(value) => setMethod(value)}
          />
          <Input
            value={url}
            className="min-w-[700px]"
            onChange={(e) => setUrl(e.target.value)}
            prefix={<Tooltip title={envList[0].name}>{envList[0].url}</Tooltip>}
          />
        </Space.Compact>
        <Button
          type="primary"
          onClick={sendParams}
          disabled={url?.length === 0}
        >
          {' '}
          发送
        </Button>
      </div>
    </>
  );
};
export default ActionForm;
