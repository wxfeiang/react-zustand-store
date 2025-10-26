import { Suspense, lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Zustand from '@/pages/Zustand';
import Main from '@/pages/Main';
import System from '@/pages/system'
import History from '@/pages/History';

import Entryfox from '@/pages/entryfox';
import ApiSysTem from '@/pages/ApiSysTem';
import About from '@/pages/About';
import GolobalParams from '@/pages/GolobalParams';
import Action from '@/pages/Action';
import SysInit from '@/pages/SysInit';

// 全局路由
function globalRoute() {
  // 二级路由框架页面采用懒加载方式
  const Entry = lazy(() => import('@/pages/entry'));
  return createHashRouter([
    {
      // 精确匹配"/login"，跳转Login页面
      path: '/login',
      element: <Login />,
    },
    {
      // 精确匹配"/main"，跳转Main页面
      path: '/main',
      element: <Main />,
    },
    {
      // 未匹配以上路径，则进入到Entry页面
      path: '/',
      element: (
        // 懒加载过程中先使用Spin组件占位
        <Suspense fallback={<Spin />}>
          <Entry />
        </Suspense>
      ),
      // 定义Entry二级路由
      children: [
        {
          // 精确匹配"/home"，跳转Home页面
          path: 'home',  // 使用相对路径
          element: <Home />,
        },
        {
          path: 'zustand',  // 使用相对路径
          element: <Zustand />,
        },
        {
          // 未匹配，跳转Login页面
          path: '*',
          element: <Navigate to="/login" />,
        },
      ],
    },
    {
      path: '/api',
      element: (
        // 懒加载过程中先使用Spin组件占位
        <Suspense fallback={
          <div className='size-full flex justify-center align-center'>
            <Spin />
          </div>
        } >
          <Entryfox />
        </Suspense>
      ),
      children: [
        {
          index: true,  // 默认子路由
          element: <Navigate to="globalParams" />,
        },
        {
          path: 'history',
          element: <History />,
        },
        {
          path: 'sysTem',
          element: <ApiSysTem />,
        },
        {
          path: 'globalParams',
          element: <GolobalParams />,
        },
        {
          path: 'about',
          element: <About />,
        },
        {
          path: 'sysinit',
          element: <SysInit />,
        },
        {
          path: 'action',
          element: <Action />,
        }
      ]
    },
    {
      path: 'system',
      element: <System />,
    },
  ]);
}

const globalRouter = globalRoute();

export default globalRouter;
