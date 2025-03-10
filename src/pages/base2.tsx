

import { Button, Card } from "antd";
import { useBaseStore } from "../store/base2";
const Base2: React.FC = () => {
  const base = useBaseStore((state) => state.base)
  const size = useBaseStore((state) => state.size)
  const name = useBaseStore((state) => state.name)
  const count = useBaseStore((state) => state.count)
  const increasePopulation = useBaseStore((state) => state.increasePopulation)
  const decreasePopulation = useBaseStore((state) => state.decreasePopulation)
  const reset = useBaseStore((state) => state.reset)
  const clear = () => {
    reset()
    useBaseStore.persist.clearStorage()
  }

  return (
    <div className="p-4">

      <Card title='持久化' >
        <p>基础值 {base}</p>
        <p>名称 {name} 只保存了name</p>
        <p>大小 {size}</p>
        <p>数量 {count}</p>
        <div className="py-10px">
          <div className="font-size-12px color-bluegray py-10pxs">
            查看可以存在不同的缓存中 ,
          </div>
          <div className="flex gap-2 py-10px " >
            <Button type="primary" onClick={increasePopulation}>增加</Button>
            <Button color="danger" variant="dashed" onClick={decreasePopulation}>减少</Button>
            <Button type="primary" onClick={clear}>重置/清除</Button>
          </div>
          <div className="font-size-12px color-bluegray py-10pxs">
            清除只会清空缓存的，不会清除store 的 ，重写stote
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Base2;