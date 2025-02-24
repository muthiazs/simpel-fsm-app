'use client'
import React, { useEffect , useState } from 'react';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  message,
  Card
} from 'antd';
import Menu from '../../../components/Menu';
import axios from 'axios';
import '@ant-design/v5-patch-for-react-19';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { UserOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const DataDiriPemohon: React.FC = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        message.error('Token tidak ditemukan! Silakan login kembali.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/pemohon', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      
        // Ubah response menjadi JSON
        const data = await response.json();
      
        if (data.success) {
          form.setFieldsValue(data.pemohon); // Mengisi form dengan data pemohon
        } else {
          message.error(data.message || 'Gagal mengambil data pemohon.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Terjadi kesalahan saat mengambil data.');
      }
      
    };

    fetchUserData();
  }, [form]);

  const updatePemohon = async (values: any) => {
    const token = localStorage.getItem('authToken');
   

    if (!token ) {
      message.error('Token atau ID pengguna tidak ditemukan! Silakan login kembali.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/pemohon`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui data diri');
      }

      const data = await response.json();

      if (data.success) {
        message.success('Data diri berhasil diperbarui.');
        form.resetFields();
      } else {
        throw new Error(data.message || 'Gagal memperbarui data diri.');
      }
    } catch (error: any) {
      console.error('Error updating user data:', error);
      message.error(error.message || 'Terjadi kesalahan.');
    } 
  };



  return (
    <div>
      <Menu />
      {/* <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', marginLeft: '50px' }}>
        <h1>Data Diri</h1>
      </div> */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px', marginLeft: '50px', width: '90%' }}>
      <Card title="Form Data Diri"  style={{ width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}>
          <Form
        {...formItemLayout}
        form={form}
        variant={variant || 'filled'}
        style={{ width: '100%' }}
        initialValues={{ variant: 'filled' }}
        onFinish={updatePemohon}
          >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
          label="Nama + Gelar Lengkap"
          name="nama"
          rules={[{ required: true, message: 'Masukkan nama!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder="Masukkan nama dengan gelar lengkap sesuai e-duk" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
          label="Nomer WhatsApp"
          name="nohp"
          rules={[{ required: true, message: 'Masukkan nomer Whatsapp!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder="Masukkan no WA" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
          label="NIK"
          name="nik"
          rules={[{ required: true, message: 'Masukkan NIK!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder="Masukkan NIK" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
          label="Program Studi"
          name="prodi"
          rules={[{ required: true, message: 'Masukkan program studi!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder="Masukkan Program Studi" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
          label="NIP/NIM"
          name="nipnim"
          rules={[{ required: true, message: 'Masukkan NIP atau NIM!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder="Masukkan nip/nim" />
            </Form.Item>
            <Form.Item
          label="Pangkat/Gol"
          name="pangkatgol"
          rules={[{ required: true, message: 'Masukkan pangkat/Gol!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder='Masukkan pangkat/gol' />
            </Form.Item>
            <Form.Item
          label="Jabatan(Lektor/Guru Besar/Supervisor/Mahasiswa dll )"
          name="jabatan"
          rules={[{ required: true, message: 'Masukkan jabatan!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder='Masukkan jabatan' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
          label="No Paspor"
          name="nopaspor"
          rules={[{ required: true, message: 'Masukkan nomer paspor!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
            >
          <Input placeholder="Masukkan no paspor" />
            </Form.Item>
            <Row gutter={16}>
          <Form.Item
            label="Scan KTP (PDF)"
            name='filektp'
            valuePropName="filektp"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="Masukkan file ktp" />
          </Form.Item>
          <Form.Item
            label="Scan Kartu Pegawai (PDF)"
            name='filekarpeg'
            valuePropName="filekarpeg"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input placeholder="Masukkan file karpeg" />
          </Form.Item>
            </Row>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }} onClick={() => form.submit()}>
            Update Data Diri
          </Button>
            </Form.Item>
          </Col>
        </Row>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default DataDiriPemohon;

