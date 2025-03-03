'use client'
import React from 'react';
import { Form, Input, DatePicker, InputNumber, Upload, Button, Row, Col, message } from 'antd';
import {PlusOutlined } from '@ant-design/icons';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import { Color } from 'antd/es/color-picker';
import '@ant-design/v5-patch-for-react-19';
import axios from 'axios';


const { TextArea } = Input;


const PengajuanPermohonan: React.FC = () => {
  const [form] = Form.useForm();
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  if (!token) {
    message.error("Anda harus login terlebih dahulu!");
    return null;
  }

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('negaratujuan', values.negaratujuan);
      formData.append('instansitujuan', values.instansitujuan);
      formData.append('keperluan', values.keperluan);
      formData.append('tglmulai', values.tanggalmulai.format('YYYY-MM-DD'));
      formData.append('tglselesai', values.tanggalberakhir.format('YYYY-MM-DD'));
      formData.append('biaya', values.perkiraanbiaya);
      formData.append('sumberdana', values.sumberdana);

      const files = ['undangan', 'agenda', 'tor'];
      for (const fileKey of files) {
        const file = values[fileKey]?.[0]?.originFileObj;
        if (!file) {
          message.error(`Harap unggah dokumen ${fileKey}!`);
          return;
        }
        formData.append(fileKey, file);
      }

      const response = await fetch('http://localhost:3001/api/permohonan', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const responseData = await response.json();
      if (response.ok) {
        message.success('Permohonan berhasil diajukan!');
        form.resetFields();
      } else {
        message.error('Gagal mengajukan permohonan: ' + responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Terjadi kesalahan saat mengajukan permohonan');
    }
  };

  
  return (
    <div>
      <Menu />
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', marginLeft: '50px' }}>
        <h1>Permohonan PDLN</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px', marginLeft: '50px', width: '90%' }}>
      <Form form={form} onFinish={onFinish} layout="vertical" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Negara Tujuan"
                name="negaratujuan"
                rules={[{ required: true, message: 'Masukkan negara tujuan!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Masukkan negara tujuan" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Instansi Tujuan"
                name="instansitujuan"
                rules={[{ required: true, message: 'Masukkan instansi tujuan!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Masukkan instansi tujuan" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Keperluan"
                name="keperluan"
                rules={[{ required: true, message: 'Masukkan keperluan!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <TextArea rows={7} placeholder='Contoh : melaksanakan tugas kegiatan Penguatan Kerjasama Internasional di Universiti Malaysia Pahang Al Sultan Abdullah (UMPSA) dan Faculty of Computing and Informatics, Universiti Malaysia Sabah, Malaysia pada tanggal 3-7 November 2024' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tanggal Mulai"
                name="tanggalmulai"
                rules={[{ required: true, message: 'Pilih tanggal mulai kegiatan!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Tanggal Berakhir"
                name="tanggalberakhir"
                rules={[{ required: true, message: 'Pilih tanggal kegiatan berakhir!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Sumber Dana"
                name="sumberdana"
                rules={[{ required: true, message: 'Masukkan sumber dana!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input placeholder="Masukkan sumber dana" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Perkiraan Biaya (Rupiah)"
                name="perkiraanbiaya"
                rules={[{ required: true, message: 'Masukkan perkiraan biaya!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <InputNumber style={{ width: '100%' }} placeholder="Masukkan perkiraan biaya" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {['undangan', 'agenda', 'tor'].map(fileKey => (
              <Col span={8} key={fileKey}>
                <Form.Item label={fileKey.toUpperCase()} name={fileKey} valuePropName="fileList" rules={[{ required: true }]}
                  getValueFromEvent={(e) => e?.fileList}>
                  <Upload beforeUpload={() => false} maxCount={1} accept=".pdf">
                    <Button icon={<PlusOutlined />}> Upload </Button>
                  </Upload>
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}> Ajukan Permohonan </Button>
          </Form.Item>
         </Col>
        </Form>
      </div>
    </div>
  );
};

export default PengajuanPermohonan;