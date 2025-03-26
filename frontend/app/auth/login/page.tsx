'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import type { FormProps } from 'antd';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import Loading from '../../../components/Loading';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const App: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500); // Matikan loading setelah 500ms
  }, []);
  
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        // Handle non-2xx responses better
        const errorText = await response.text();
        console.error(`Error response (${response.status}):`, errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Login response data:', data);
  
      if (data.success) {
        message.success('Login berhasil!');
        
        // Store user data correctly
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('iduser', data.user.id.toString());
        
        console.log("token : ", data.token);
        console.log("iduser : ", data.user.id); // Fixed from data.id to data.user.id
        
        // Redirect based on the response
        if (data.redirectUrl) {
          console.log('Redirecting to:', data.redirectUrl);
          router.push(data.redirectUrl);
        } else {
          router.push('/dashboard');
        }
      } else {
        message.error(data.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
}

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Mohon isi semua field yang diperlukan');
  };

  return (
    <div style={{ height: '100vh', backgroundColor: 'white' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Card style={{ width: 500, textAlign: 'center', boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ color: '#001529', fontWeight: 'bold' }}>SIMPEL-FSM</Title>
          <Text style={{ color: '#6b7280', display: 'block' }}>Sistem Informasi Pengajuan Surat Permohonan PDLN FSM</Text>
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
              name="email"
              rules={[
              {
                required: true,
                message: 'Masukkan email anda',
              },
              {
                type: 'email',
                message: 'Email tidak valid',
              },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Masukkan email"
              style={{ textAlign: 'center' }}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
              {
                required: true,
                message: 'Masukkan password anda',
              },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Masukkan password"
              style={{ textAlign: 'center' }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Masuk
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default App;