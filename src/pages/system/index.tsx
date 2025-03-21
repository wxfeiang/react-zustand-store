import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, Row, Space, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const System = () => {
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      submitter={{
        render: (props, doms) => {
          console.log('🍢[doms]:', doms);
          return (
            <Row>
              <Col span={14} offset={4}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          );
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('Submission successful');
      }}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: 'Ant Design Co., Ltd.',
          useMode: 'chapter',
        };
      }}
      className="mx-auto mt-100px w-600px"
    >
      <ProFormText
        width="md"
        name="name"
        label="是否开启模拟数据"
        placeholder="Please enter a name"
      />
      <ProFormText
        width="md"
        name="name"
        label="定义刷新时间"
        placeholder="Please enter a name"
      />
      <ProFormText
        width="md"
        name="name"
        label="是否开启模拟数据"
        placeholder="Please enter a name"
      />
      <ProFormText
        width="md"
        name="name"
        label="当前分辨率宽度"
        placeholder="Please enter a name"
      />
      <ProFormText
        width="md"
        name="name"
        label="当前分辨率高度"
        placeholder="Please enter a name"
      />
    </ProForm>
  );
};
export default System;
