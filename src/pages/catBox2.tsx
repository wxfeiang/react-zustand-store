

import { Card, Tag } from "antd";
import { useCatStore } from "../store/catSrore";
const CatBox2: React.FC = () => {
  const bigCats = useCatStore((state) => state.cats.bigCats)

  const random = Math.random()
  return (
    <div className="p-4">
      <Card title={`猫猫2: ${random}`} >
        <p>
          <Tag color="blue">组件不会重复渲染--useCatStore1</Tag>
        </p>
        <p>只使用一个值 大猫: {bigCats}  </p>
        <div className="font-size-12px color-bluegray ">
          减少的时候组件在---〉不渲染了 ,重制的时候组件在---〉渲染
          <br />
          <Tag color="magenta">{random}</Tag>
        </div>
      </Card>
    </div>
  )
}

export default CatBox2;