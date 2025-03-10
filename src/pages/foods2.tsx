

import { Card } from "antd";
import { useEffect, useState } from "react";
import { useFoodsStore } from "../store/food";
import { shallow } from "zustand/shallow";
import { useBaseStore } from "../store/base";
const Foods2: React.FC = () => {

  const random = Math.random()
  // 第一种
  // const fish = useFoodsStore((state) => state.fish)

  const [baColor, setBaColor] = useState<'bg-red-100' | 'bg-blue-100'>(
    useFoodsStore.getState().fish > 5 ? "bg-red-100" : "bg-blue-100"
  )

  // 第二种  必要时重新渲染
  const { base } = useBaseStore();
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
      (fish, prevFish) => {
        // if (fish == prevFish) {
        //   if (fish <= 5) {
        //     setBgColor("lightpink");
        //   } else {
        //     setBgColor("lightgreen");
        //   }
        // }

        if (prevFish <= 5 && fish > 5) {
          setBaColor("bg-red-100");
        } else if (prevFish > 5 && fish <= 5) {
          setBaColor("bg-blue-100");
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    )

    return unsubscribe

  }, [])


  return (
    <div className="p-4">

      <Card title='基础值' className={baColor}>
        <p>base:  {base}</p>
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