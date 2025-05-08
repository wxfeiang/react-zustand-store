
import { Button, Input, Select, Space, Tooltip } from 'antd';
import { useSysTemStore } from '@/store/sysTem';
import { listify } from "radash";
import React from 'react'
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
  return (
    <>
      <div className='flex gap-[10px] items-center'>
        <Space.Compact>
          <Select defaultValue="POST" options={options} className='w-[120px]' />
          <Input className='min-w-[500px]'
            prefix={
              <Tooltip title={envList[0].name}>
                {envList[0].url}
              </Tooltip>
            } />
        </Space.Compact>
        <Button type="primary" > 发送</Button>
      </div>

    </>
  );
};
export default ActionForm;