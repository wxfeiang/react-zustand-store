import React, { useEffect } from 'react'
const ApiSysTem: React.FC = () => {
  console.log('不是组件的话删掉 props ===',)
  useEffect(() => {
    console.log('执行了',)
  }, [])
  return (
    <>
      <div>
        ApiSysTem
      </div>
    </>
  );
};
export default ApiSysTem;