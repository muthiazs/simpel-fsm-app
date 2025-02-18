'use client'

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import type { FormProps } from 'antd';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
  password?: string;
};

const App: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
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

      const data = await response.json();
      console.log('Response data:', data); // Untuk debugging
      console.log('Full response:', data);
      console.log('Redirect URL:', data.redirectUrl);

      if (data.success) {
        message.success('Login berhasil!');
        // Simpan data user ke localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);
        console.log("token : " , data.token);
        
        // Redirect ke URL yang sesuai
        if (data.redirectUrl) {
          console.log('Redirecting to:', data.redirectUrl); // Untuk debugging
          router.push(data.redirectUrl); // Gunakan URL redirect langsung dari response
        } else {
          // Default fallback jika tidak ada redirectUrl
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
              rules={[
                { required: true, message: 'Masukkan email anda' },
                { type: 'email', message: 'Email tidak valid' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Kata Sandi"
              name="password"
              rules={[{ required: true, message: 'Masukkan password anda' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
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