import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
const { Content, Sider } = Layout

function Entry() {
  return (
    <Layout >
      <div className='h-70px  bg-blue-500'>Header</div>
      <Layout>
        <Sider />
        <Layout>
          <div className="bg-red-500">
            <Content style={{ minWidth: 800 }}>
              {/* Outlet用来放置二级路由页面 */}
              <Outlet />
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Entry
