import { Suspense, lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Zustand from '@/pages/Zustand';
import Main from '@/pages/Main';
import System from '@/pages/system';

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
      // 未匹配"/login"，则进入到Entry页面
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
          path: '/home',
          element: <Home />,
        },
        {
          // 如果URL没有"#路由"，跳转Home页面
          path: '/',
          element: <Navigate to="/home" />,
        },

        {
          path: '/zustand',
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
      path: '/main',
      element: <Main />,
    },
    {
      path: 'system',
      element: <System />,
    },
  ]);
}

const globalRouter = globalRoute();

export default globalRouter;
