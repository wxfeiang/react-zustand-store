import React from 'react'
import { Card, Button } from 'antd'
import { useFoodsStore } from '../store/food'

const Foods: React.FC = () => {
  const { fish, addOneFish, removeOnefilsh, removeAllFish } = useFoodsStore()
  const random = Math.random()



  return (
    <div className='p-4'>
      <div >
        <Card title='状态订阅' >
          <p>random: {random}</p>
          <p>食物：  {fish}</p>
          <div className="flex gap-2">
            <Button type="primary" onClick={addOneFish}>增加</Button>
            <Button color="danger" variant="dashed" onClick={removeOnefilsh}>减少</Button>
            <Button type="primary" onClick={removeAllFish}>重置</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Foods;