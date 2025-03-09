

import { Card,Button } from "antd";
import { useBaseStore } from "../store/base";
import {  } from "antd";
export default function Base() {
  const base = useBaseStore((state) => state.base)
  const increasePopulation = useBaseStore((state) => state.increasePopulation)
  const decreasePopulation = useBaseStore((state) => state.decreasePopulation)
  const removeAllBears = useBaseStore((state) => state.removeAllBears)
  return (
    <div className="p-4">

      <Card title='基础值' >
        <p>基础值 {base}</p>
        <div className="flex gap-2">

          <Button type="primary" onClick={increasePopulation}>增加</Button>
          <Button color="danger" variant="dashed" onClick={decreasePopulation}>减少</Button>
          <Button type="primary" onClick={removeAllBears}>重置</Button>
        </div>
      </Card>
    </div>
  )
}