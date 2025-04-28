import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import ApiFox from '../Apifox';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

const contentStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#f5f5f5',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const layoutStyle = {
  height: "100vh",
  overflow: 'hidden',
  width: 'calc(100% - 0px)',
  maxWidth: 'calc(100% - 0px)',
};
function Entryfox() {

  return (
    <Layout style={layoutStyle}>
      <Sider style={siderStyle} className='max-w-80px! min-w-80px!'>
        <ApiFox />
      </Sider>
      <Content style={contentStyle}>  <Outlet /></Content>
    </Layout>
  );
}

export default Entryfox;
