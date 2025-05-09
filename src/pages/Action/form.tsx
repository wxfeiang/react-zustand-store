
import { Button, Input, Select, Space, Tooltip } from 'antd';
import { useSysTemStore } from '@/store/sysTem';
import { listify } from "radash";
import React, { useContext, useEffect, useState } from 'react'
import { QueryContext } from './tab';
interface Props {
  name?: string
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
  }
];

const ActionForm: React.FC<Props> = () => {
  const env = useSysTemStore((state) => state.env);
  const envList = listify(env, (_key, value) => ({ ...value })); // 将对象转换为数组
  const queryContext = useContext(QueryContext); // 使用上下文
  const [url, setUrl] = useState<string>("")
  const [method, setMethod] = useState<string>("POST")
  const sendParams = () => {
    console.log('🥘[queryContext]: ', queryContext.paramsAllData);

  }
  useEffect(() => {
    queryContext.setParamsAllData({ ...queryContext.paramsAllData, url, method });
  }, [url, method])

  return (
    <>
      <div className='flex gap-[10px] items-center'>
        <Space.Compact>
          <Select defaultValue={method}
            options={options}
            className='w-[160px]'
            onChange={(value) => setMethod(value)}
          />
          <Input
            value={url}
            className='min-w-[350px]'
            onChange={(e) => setUrl(e.target.value)}
            prefix={
              <Tooltip title={envList[0].name}>
                {envList[0].url}
              </Tooltip>
            }

          />
        </Space.Compact>
        <Button type="primary" onClick={sendParams} disabled={url?.length === 0} > 发送</Button>
      </div>

    </>
  );
};
export default ActionForm;