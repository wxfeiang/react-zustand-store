

import { Card } from "antd";
import { useEffect, useState } from "react";
import { useFoodsStore } from "../store/food";
import { shallow } from "zustand/shallow";
const Foods2: React.FC = () => {

  const random = Math.random()
  // 第一种
  const fish = useFoodsStore((state) => state.fish)
  const [baColor, setBaColor] = useState<'bg-red-100' | 'bg-blue-300'>(

  )

  // 第二种  必要时重新渲染
  useEffect(() => {
    // const unsubscribe = useFoodsStore.subscribe((state, perSatae) => {
    //   if (perSatae.fish <= 5 && state.fish > 5) {
    //     setBaColor('bg-red-100')
    //   } else if (perSatae.fish > 5 && state.fish <= 5) {
    //     setBaColor('bg-blue-300')
    //   }
    // })

    // store 中开启方法
    const unsubscribe = useFoodsStore.subscribe(
      (state) => state.fish,
      (fish, perFish) => {
        console.log('fish', fish)
        console.log('perFish', perFish)
        if (perFish <= 5 && fish > 5) {
          setBaColor('bg-red-100')
        } else if (perFish > 5 && fish <= 5) {
          setBaColor('bg-blue-300')
        }

      },
      {
        equalityFn: shallow,
        fireImmediately: true  // 是否立即执行
      }
    )

    return unsubscribe

  }, [])


  return (
    <div className="p-4">

      <Card title='基础值' className={baColor}>
        <p>食物 {fish}</p>
        <p>random: {random}</p>
        <div className="font-size-12px color-bluegray ">
          第一种显示的时候
        </div>
        <div className="font-size-12px color-bluegray ">
          第二种显示的时候 (有订阅状态)
        </div>
      </Card>
    </div>
  )
}

export default Foods2;