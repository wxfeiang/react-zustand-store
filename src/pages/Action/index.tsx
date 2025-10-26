import React, { useEffect, useState } from 'react'
import ActionTab from './tab';
import { Card } from 'antd';
const Action: React.FC = () => {
  const [name] = useState('接口一')
  useEffect(() => {
    console.log('执行了',)
  }, [])

  return (
    <>
      <Card variant="borderless" >
        <ActionTab name={name}></ActionTab>
      </Card>

    </>
  );
};
export default Action;