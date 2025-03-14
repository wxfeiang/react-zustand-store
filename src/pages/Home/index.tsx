import React, { useState } from 'react';
import { Button } from 'antd';
const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>home {Math.random()}</div>
      <div className="h-200px bg-red-500">
        <div>
          <Button type="primary" onClick={() => setCount(count + 1)}>
            点击
          </Button>
        </div>
        <div>{count}</div>
      </div>
    </>
  );
};
export default Home;
