'use client'

import React from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import type { FormProps } from 'antd';
import Header from '../../../components/Header';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App: React.FC = () => (
  <div style={{ height: '100vh', backgroundColor: 'white' }}>
    <Header />
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <Card style={{ width: 500, textAlign: 'center' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ color: '#1677ff', fontWeight: 'bold' }}>SIMPEL-FSM</Title>
        <Text style={{ color: '#6b7280', display: 'block' }}>Sistem Informasi Pengajuan Surat Permohonan PDLN</Text>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: 20 }}
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Masukkan email anda ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Kata Sandi"
            name="password"
            rules={[{ required: true, message: 'Masukkan password anda ' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Masuk
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  </div>
);

export default App;