import Base from './pages/base'
import CatBox from './pages/catBox'
import CatBox2 from './pages/catBox2'
import CatBox3 from './pages/catBox3'
import { Divider } from 'antd'
function App() {

  return (
    <>
    <div className='p-4'>
    <div className='bg-red-500 text-center p-4 color-#fff'>
      zustand demo
    </div>
    <Base />
    <Divider>组件渲染比对</Divider>
    <div className='flex gap-4'>
      <CatBox/>
       <div>
        vs
       </div>
      <CatBox2/>
      <div>
        vs
       </div>
      <CatBox3/>
    </div>
    </div>
    </>
  )
}

export default App
