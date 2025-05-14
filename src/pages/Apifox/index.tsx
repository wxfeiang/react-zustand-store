import React from 'react';
import {
  AppstoreOutlined,
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
  {
    key: 'sub2',
    label: '系统设置',
    icon: <AppstoreOutlined />,
    children: [
      { key: '/api/sysTem', label: '环境变量' },
      {
        key: '/api/sysinit',
        label: '系统初始化',
      },
      { key: '/api/globalParams', label: '全局参数' },
      {
        key: '/api/about',
        label: '关于我们',
      },
      {
        key: '/api/action',
        label: '接口开发',
      },
    ],
  },
];


const ApiFox: React.FC = () => {
  const navigate = useNavigate();
  const routeTo: MenuProps['onClick'] = (e) => {
    console.log('🥔[item]:', e);
    navigate(e.key)
  }
  return (
    <>
      <Menu
        defaultSelectedKeys={['/api/sysTem']}
        openKeys={['sub2']}
        mode="inline"
        theme="dark"
        inlineCollapsed={false}
        items={items}
        onClick={routeTo}
      />
    </>

  );
};


export default ApiFox;