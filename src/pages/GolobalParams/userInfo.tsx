import { Button, Modal, Input, message } from 'antd';
import React, { useState } from 'react';
import { DataType } from './type';
const { TextArea } = Input;
interface userInfoProps {
  update: (data: DataType[]) => void;
}
const UserInfoData: React.FC<userInfoProps> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const safeParseWechatPayJSON = (input: string) => {
    // 预处理步骤：清理输入数据
    const cleanInput = input
      .toString() // 防止非字符串输入
      .trim() // 去除首尾空白
      .replace(/\s+/g, ''); // 去掉空格和换行符
    try {
      return JSON.parse(cleanInput);
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const showErrorMessage = (error: unknown) => {
    messageApi.open({
      type: 'error',
      content: `${error}`,
    });
  };
  const [value, setValue] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const jsonData = safeParseWechatPayJSON(value);
    if (!jsonData) {
      showErrorMessage('请输入正确的示例json格式');
      return;
    }
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
      {contextHolder}
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
