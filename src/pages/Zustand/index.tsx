import React from 'react'
import Base from '@/pages/base'
import Base2 from '@/pages/base2'
import CatBox from '@/pages/catBox'
import CatBox2 from '@/pages/catBox2'
import CatBox3 from '@/pages/catBox3'
import CatBox4 from '@/pages/catBox4'
import Foods from '@/pages/foods'
import Foods2 from '@/pages/foods2'
import Foods3 from '@/pages/foods3'
import { Divider } from 'antd'

const name: React.FC = () => {
  return (

    <>
      <div className='p-4 bg-bluegray rounded-10px'>
        <div className='bg-red-500 text-center p-4 color-#fff'>
          zustand demo
        </div>
        <div className='flex  gap-4'>
          <div className='flex gap-4'>
            <Base />
            <Base2 />

          </div>
        </div>
        <Divider>组件渲染比对 （2和4 操作一样） （3 只使用方法，不会重复渲染）</Divider>
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
        <Divider>状态订阅 （解决重新渲染问题）</Divider>
        <div className='flex gap-4'>
          <Foods2 />
          <Foods />
          <Foods3 />
        </div>


      </div>


    </>
  );
};
export default name;