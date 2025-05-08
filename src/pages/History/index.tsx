import React, { useEffect } from 'react'
const History: React.FC = () => {
  console.log('不是组件的话删掉 props ===',)
  useEffect(() => {
    console.log('执行了',)
  }, [])
  return (
    <>
      <div>
        历史记录表
      </div>
    </>
  );
};
export default History;