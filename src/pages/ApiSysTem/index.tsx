import React from 'react';
import type { FormProps } from 'antd';
import { Button, Card, Form, Input, Space } from 'antd';

type FieldType = {
  serveUrl: string;
  currentEnv: string;

};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

interface UrlFormProps {
  type: "dev" | "prod"
}

const UrlForm: React.FC<UrlFormProps> = (props) => {
  console.log('🍶', props);
  return <>
    <Form
      name={props.type}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='w-100%'
    >
      <Form.Item<FieldType>
        label={props.type}
        name="currentEnv"
        tooltip="当前环境"

        initialValue={props.type}
        rules={[{ required: true, message: '当前环境不能为空!' }]}

      >
        <Input disabled />
      </Form.Item>
      <Form.Item<FieldType>
        label="前置 URL"
        name="serveUrl"
        tooltip="注意: 正常情况不要添加多个 '服务' ! ! ! 当且仅当 同一 '环境' 下，多个接口使用不同的 '前置URL' 时，才需要添加多个服务。这种场景下，每个服务设置不同 '前置URL' ，不同接口或目录选择不同 '服务' 即可。"
        rules={[{ required: true, message: '前置 URL 不能为空!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={null} >
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  </>
}

const ApiSysTem: React.FC = () => (
  <>
    <Space size={10}>
      <Card title="开发环境" className='w-10'>
        <UrlForm type='dev' />
      </Card>
      <Card title="正式环境" className='w-10'>
        <UrlForm type='prod' />
      </Card>
    </Space>
  </>
);


export default ApiSysTem;