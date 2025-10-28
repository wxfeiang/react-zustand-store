import { Button, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { DataType } from './type';
import { safeParseWechatPayJSON } from '../utils';
const { TextArea } = Input;
interface userInfoProps {
  update: (data: DataType[]) => void;
}
const UserInfoData: React.FC<userInfoProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [value, setValue] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const jsonData = safeParseWechatPayJSON(value);
    const arr = Object.keys(jsonData);
    const newArr: DataType[] = [];
    arr.forEach((item) => {
      newArr.push({
        key: item,
        name: item,
        value: jsonData[item],
        position: 'Body',
        status: true,
      });
    });
    props.update(newArr);
    setIsModalOpen(false);
    setValue('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValue('');
  };

  return (
    <>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        导入登录后用户信息(默认body参数)
      </Button>
      <Modal
        title="用户登录信息"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div className="p-10px">
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="请复制用户登录信息后的完整的json，例如：{'a':1,'b':2}"
            autoSize={{ minRows: 10, maxRows: 20 }}
          />
        </div>
      </Modal>
    </>
  );
};
export default UserInfoData;
