'use client'
import React from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Upload,
} from 'antd';
import {PlusOutlined } from '@ant-design/icons';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { Color } from 'antd/es/color-picker';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

type SizeType = Parameters<typeof Form>[0]['size'];

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
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nama + Gelar Lengkap"
                name="nama"
                rules={[{ required: true, message: 'Masukkan nama1' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Masukkan nama dengan gelar lengkap sesuai e-duk" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nomer WhatsApp"
                name="nomerWhatsApp"
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
                    <Input placeholder="Masukkan prodi" />
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
                <Input  placeholder='Masukkan pangkat/gol' />
              </Form.Item>
              <Form.Item
                label="Jabatan(Lektor/Guru Besar/Supervisor/Mahasiswa dll )"
                name="jabatan"
                rules={[{ required: true, message: 'Masukkan pangkat/Gol!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input  placeholder='Masukkan jabatan' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="No Paspor"
                name="noPaspor"
                rules={[{ required: true, message: 'Masukkan nomer paspor!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Masukkan no paspor" />
              </Form.Item>
              <Row gutter={16}>
                <Form.Item 
                label="Scan KTP (PDF)" 
                valuePropName="fileList"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }} >
                    <Upload action="/upload.do" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined style={{ color: 'black' }} />
                        <div style={{ marginTop: 8 , color: 'black' }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item 
                label="Scan Kartu Pegawai (PDF)" 
                valuePropName="fileList"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }} >
                    <Upload action="/upload.do" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined style={{ color: 'black' }} />
                        <div style={{ marginTop: 8 , color: 'black' }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item 
                label="Scan Paspor (PDF)" 
                valuePropName="fileList"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }} >
                    <Upload action="/upload.do" listType="picture-card">
                        <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined style={{ color: 'black' }} />
                        <div style={{ marginTop: 8 , color: 'black' }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              
              
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default datadiripemohon;