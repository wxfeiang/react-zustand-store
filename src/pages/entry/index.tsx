import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

function Entry() {
  return (
    <Layout>
      <div className="h-80px font-size-16px">Header {Math.random()}</div>
      <Outlet />
    </Layout>
  );
}

export default Entry;
