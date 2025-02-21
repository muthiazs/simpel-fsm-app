'use client'
import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  message
} from 'antd';
import Menu from '../../../components/Menu';
import axios from 'axios';
import '@ant-design/v5-patch-for-react-19';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';

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

const datadiripemohon: React.FC = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage

      if (!token) {
        message.error('Token tidak ditemukan! Silakan login kembali.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/pemohon', {
          headers: {
            'Authorization': `Bearer ${token}`, // Kirim token di header
          },
        });

        if (response.data.success) {
          const userData = response.data.pemohon;
          form.setFieldsValue(userData); // Isi form dengan data user
        } else {
          message.error('Gagal mengambil data pemohon.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        message.error('Terjadi kesalahan saat mengambil data.');
      }
    };

    fetchUserData();
  }, [form]);

  const updatePemohon = async (values: any) => {
    const token = localStorage.getItem('authToken'); // Ambil token dari localStorage

    if (!token) {
      message.error('Token tidak ditemukan! Silakan login kembali.');
      return;
    }

    try {
      console.log('Payload yang dikirim:', values);
      const response = await axios.patch('http://localhost:3001/api/pemohon/', values, {
        headers: {
          'Authorization': `Bearer ${token}`, // Kirim token di header
        },
      });

      if (response.data.success) {
        message.success('Data diri berhasil diperbarui.');
      } else {
        message.error('Gagal memperbarui data diri.');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      message.error('Terjadi kesalahan saat memperbarui data.');
    }
  };

  return (
    <div>
      <Menu />
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', marginLeft: '50px' }}>
        <h1>Data Diri</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px', marginLeft: '50px', width: '90%' }}>
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
              name= 'prodi'
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
                  name= 'filektp'
                  valuePropName="filektp"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input placeholder="Masukkan file ktp" />
                  
                  {/* <Upload action="/upload.do" listType="picture-card">
                    <button style={{ border: 0, background: 'none' }} type="button">
                      <PlusOutlined style={{ color: 'black' }} />
                      <div style={{ marginTop: 8, color: 'black' }}>Upload</div>
                    </button>
                  </Upload> */}

                </Form.Item>
                <Form.Item
                  label="Scan Kartu Pegawai (PDF)"
                  name={'filekarpeg'}
                  valuePropName="filekarpeg"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  {/* buat testing update sebelum urus object storage */}
                  {/* valuePropName="fileList"
                    <button style={{ border: 0, background: 'none' }} type="button">
                      <PlusOutlined style={{ color: 'black' }} />
                      <div style={{ marginTop: 8, color: 'black' }}>Upload</div>
                    </button> */}
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
      </div>
    </div>
  );
};

export default datadiripemohon;

