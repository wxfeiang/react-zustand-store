import { Divider } from 'antd'
import Base from './pages/base'
import Base2 from './pages/base2'
import CatBox from './pages/catBox'
import CatBox2 from './pages/catBox2'
import CatBox3 from './pages/catBox3'
import CatBox4 from './pages/catBox4'
function App() {

  return (
    <>
      <div className='p-4'>
        <div className='bg-red-500 text-center p-4 color-#fff'>
          zustand demo
        </div>
        <div className='flex gap-4'>
          <Base />
          <Base2 />
        </div>
        <Divider>组件渲染比对</Divider>
        <div className='flex gap-4'>
          <CatBox />
          <div className='text-center pt-30px'>
            vs
          </div>
          <CatBox2 />
          <div className='text-center pt-30px'>
            vs
          </div>
          <CatBox3 />
          <div className='text-center pt-30px'>
            vs
          </div>
          <CatBox4 />
        </div>
      </div>
    </>
  )
}

export default App
