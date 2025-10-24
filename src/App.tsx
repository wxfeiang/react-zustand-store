import { RouterProvider } from 'react-router-dom';
import globalRouter from './router/globalRouter';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zh_CN}>
      <RouterProvider router={globalRouter} />
    </ConfigProvider>
  );
}

export default App;
