import React from 'react';
import { Layout } from 'antd';

const Main: React.FC = () => {
  return (
    <>
      <Layout className="w-100vw h-100vh">
        <div className="grid grid-cols-3 gap-20px h-100%">
          <div className="bd-1px_#1890ff h-100%">01</div>
          <div className="bd-1px_#1890ff h-100%">01</div>
          <div className="bd-1px_#1890ff h-100%">01</div>
        </div>
      </Layout>
    </>
  );
};
export default Main;
