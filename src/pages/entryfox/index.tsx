import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import ApiFox from '../Apifox';

function Entryfox() {
  return (
    <Layout>
      <div className='flex '>
        <ApiFox />
        <Outlet />
      </div>


    </Layout>
  );
}

export default Entryfox;
