import { Card, List, Typography } from 'antd';
import React from 'react'
interface listType {
  id: number,
  name: string,
  url: string,
}
const list: listType[] = [
  {
    id: 1,
    name: '获取系统配置',
    url: '/captcha/config',
  },
  {
    id: 2,
    name: '获取getDot',
    url: '/captcha/getDot',
  },
  {
    id: 3,
    name: '获取响应配置',
    url: '/captcha/getResponseConfig',
  },

]
const SysInit: React.FC = () => {


  return (
    <>
      <Card title="系统初始化接口">
        <List
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text type='danger'>{item.name}</Typography.Text> {item.url}
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};
export default SysInit;