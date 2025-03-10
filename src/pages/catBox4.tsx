

import { Card, Tag } from "antd";
import { useShallow } from 'zustand/react/shallow';
import { useCatStore } from "../store/catSrore";

const CatBox4: React.FC = () => {
  //为会在组件导入所有状态，会导致组件频繁re-render 所以不建议使用。但是zustand文档中建议使用的useShallow
  //FIX: 不能使用嵌套的数据哦

  const [smallCats] = useCatStore(
    useShallow((state) => [state.cats.smallCats]
    ))

  const random = Math.random()
  return (
    <div className="p-4">

      <Card title={`猫猫4  : ${random}`} >
        <p>
          <Tag color="magenta">不能使用嵌套的数据， createSelectors自动生成</Tag>
        </p>
        <p>
          小猫数量: {smallCats}
        </p>

        <div className="flex gap-2">
          {/* <Button type="primary" onClick={addCatBig}>增加大猫</Button>
          <Button type="primary" onClick={addCatSmall}>增加小猫</Button>
          <Button type="primary" onClick={resetCat}>重置</Button> */}
        </div>
        <p>
          <Tag color="magenta">只需要观察随机数的变化</Tag>
        </p>
      </Card>

    </div>
  )
}

export default CatBox4;