

import { Card,Button ,Tag} from "antd";
import { useCatStore } from "../store/catSrore";
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';

import {  } from "antd";
export default function Base() {
  const useStore = createSelectorFunctions(useCatStore);
   //FIX: 不能使用嵌套的数据哦
  // const bigCats = useStore.use.cats.bigCats
  // const smallCats = useStore.use.cats.smallCats()
  const addCatBig = useStore.use.addCatBig()
  const addCatSmall = useStore.use.addCatSmall()
  const resetCat = useStore.use.resetCat()

  const random= Math.random()
  return (
    <div className="p-4">

      <Card title={`猫猫: ${random}`} >
        <p>
        <Tag color="magenta">不能使用嵌套的数据哦</Tag>
        </p>
        <div className="flex gap-2">
          <Button type="primary" onClick={addCatBig}>增加大猫</Button>
          <Button type="primary" onClick={addCatSmall}>增加小猫</Button>
          <Button type="primary" onClick={resetCat}>重置</Button>
        </div>
        <p>
        <Tag color="magenta">只需要观察随机数的变化</Tag>
        </p>
      </Card>

    </div>
  )
}