import React from 'react';
import { Layout, Button, message } from 'antd';

const Main: React.FC = () => {
  return (
    <>
      <Layout className="w-100vw h-100vh bg-#000 ">
        <div className="grid grid-cols-3 gap-20px h-100%">
          <div className="bd-1px_#1890ff h-100%">
            <Button type='primary' onClick={() => {
              message.info('测试动画弹框')
            }}>测试动画弹框</Button>
            <Button type="primary">Primary Button</Button>
          </div>
          <div className="bd-1px_#1890ff h-100%">01</div>
          <div className="bd-1px_#1890ff h-100%">01</div>
        </div>
      </Layout>
    </>
  );
};
export default Main;
