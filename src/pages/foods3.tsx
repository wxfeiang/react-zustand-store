

import { Card, Button } from "antd";
import { useFoodsStore } from "../store/food2";

const Foods2: React.FC = () => {
  const { fish } = useFoodsStore()
  // 直接操作—+5
  const addOneFishFive = () => {
    useFoodsStore.setState((state) => ({ fish: state.fish + 5 }))
  }
  return (
    <div className="p-4">

      <Card title='简化后的store' >
        <p>fish:  {fish}</p>

        <div>
          <Button onClick={addOneFishFive}>直接操作 +5 </Button>
        </div>

      </Card>
    </div>
  )
}

export default Foods2;