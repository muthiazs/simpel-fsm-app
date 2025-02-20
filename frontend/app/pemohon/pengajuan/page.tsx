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
import '@ant-design/v5-patch-for-react-19';

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

const pengajuanpermohonan: React.FC = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  return (
    <div>
      <Menu />
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', marginLeft: '50px' }}>
        <h1>Permohonan PDLN</h1>
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
                label="Negara Tujuan"
                name="negaraTujuan"
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
                name="instansiTujuan"
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
                name="tanggalMulai"
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
                name="sumberDana"
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
                name="perkiraanBiaya"
                rules={[{ required: true, message: 'Masukkan perkiraan biaya!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <InputNumber style={{ width: '100%' }} placeholder="Masukkan perkiraan biaya" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Rencana Tindak Lanjut"
                name="tindak lanjut"
                rules={[{ required: true, message: 'Masukkan rencana tindak lanjut!' }]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <TextArea rows={4} placeholder='isi rencana tindak lanjut ' />
              </Form.Item>
              <Row gutter={16}>
                <Form.Item 
                label="Undangan dari Luar Negeri (PDF)" 
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
                label="Jadwal Agenda Selama di Luar Negeri (PDF)" 
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
                label="Kerangka Acuan / TOR (PDF)" 
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
          <Col span={24}>
           <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Ajukan Permohonan
            </Button>
           </Form.Item>
         </Col>
        </Form>
      </div>
    </div>
  );
};

export default pengajuanpermohonan;