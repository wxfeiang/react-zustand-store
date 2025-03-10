

import { Button, Card, Tag } from "antd";
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { useCatStore } from "../store/catSrore";

const CatBox3: React.FC = () => {
  const useStore = createSelectorFunctions(useCatStore);
  // createSelectorFunctions 可以直接作用于useCatStore 放到仓库位置引入
  // 使用方法  useStore.use.方法名
  //  4 中使用代替 不需要第三方库
  //FIX: 不能使用嵌套的数据哦
  // const bigCats = useStore.use.cats.bigCats
  // const smallCats = useStore.use.cats.smallCats()
  const addCatBig = useStore.use.addCatBig()
  const addCatSmall = useStore.use.addCatSmall()
  const resetCat = useStore.use.resetCat()

  const random = Math.random()
  return (
    <div className="p-4">

      <Card title={`猫猫3 : ${random}`} >
        <div className="font-size-12px color-bluegray py-10pxs">
          当前组件不会重复渲染。。。 么有引入变量值，只导入方法，所以不会被重新渲染
        </div>
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

export default CatBox3;