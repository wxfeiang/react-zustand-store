import React from 'react';
import {

  DesktopOutlined,

  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/api/history', icon: <PieChartOutlined />, label: '历史记录',

  },
  { key: '/api/sysTem', icon: <DesktopOutlined />, label: '系统设置', },
  // { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  // {
  //   key: 'sub2',
  //   label: '系统设置',
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     { key: '9', label: 'Option 9' },
  //     { key: '10', label: 'Option 10' },
  //     {
  //       key: 'sub3',
  //       label: 'Submenu',
  //       children: [
  //         { key: '11', label: 'Option 11' },
  //         { key: '12', label: 'Option 12' },
  //       ],
  //     },
  //   ],
  // },
];


const ApiFox: React.FC = () => {
  const navigate = useNavigate();
  const routeTo = (e) => {
    console.log('🥔[item]:', e);
    navigate(e.key)
  }
  return (
    <>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={true}
        items={items}
        onClick={(e) => routeTo(e)}
      />
    </>

  );
};


export default ApiFox;