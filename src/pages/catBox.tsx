

import { Card,Button ,Tag} from "antd";
import { useCatStore } from "../store/catSrore";
import {  } from "antd";
export default function Base() {
  const bigCats = useCatStore((state) => state.cats.bigCats)
  const smallCats = useCatStore((state) => state.cats.smallCats)
  const addCatBig = useCatStore((state) => state.addCatBig)
  const addCatSmall = useCatStore((state) => state.addCatSmall)
  const resetCat = useCatStore((state) => state.resetCat)
 const getTotalCat = useCatStore((state) => state.getTotalCat)
 const random= Math.random()
  return (
    <div className="p-4">

      <Card title={`猫猫1: ${random}`} >
        <p>
        <Tag color="magenta">组件重复渲染--useCatStore1</Tag>
        </p>
        <p>总数: {getTotalCat()} 大猫: {bigCats} 小猫: {smallCats} </p>
        <div className="flex gap-2">
          <Button type="primary" onClick={addCatBig}>增加大猫</Button>
          <Button type="primary" onClick={addCatSmall}>增加小猫</Button>
          <Button type="primary" onClick={resetCat}>重置</Button>
        </div>
      </Card>

    </div>
  )
}