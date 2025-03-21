'use client';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Row, Col, message, Card, Upload } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import axios from 'axios';
import Menu from '../../../components/Menu';
import { UploadOutlined } from '@ant-design/icons';
import BackButton from '../../../components/BackButton';
import AppFooter from '../../../components/Footer';

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
  const [fileList, setFileList] = useState<{
    ktpFile: UploadFile[];
    karpegFile: UploadFile[];
  }>({
    ktpFile: [],
    karpegFile: [],
  });

  // Fetch data dari backend
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
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success && data.pemohon && typeof data.pemohon === 'object') {
          // Transformasi data filektp dan filekarpeg dari backend
          const pemohonData = {
            ...data.pemohon,
            filektp: data.pemohon.filektp
              ? [
                  {
                    uid: '-1', // ID unik untuk file
                    name: data.pemohon.filektp.split('/').pop(), // Nama file
                    status: 'done', // Status file
                    url: data.pemohon.filektp, // URL file
                  },
                ]
              : [],
            filekarpeg: data.pemohon.filekarpeg
              ? [
                  {
                    uid: '-2', // ID unik untuk file
                    name: data.pemohon.filekarpeg.split('/').pop(), // Nama file
                    status: 'done', // Status file
                    url: data.pemohon.filekarpeg, // URL file
                  },
                ]
              : [],
          };

          // Set nilai form
          form.setFieldsValue(pemohonData);

          // Set nilai fileList
          setFileList({
            ktpFile: pemohonData.filektp,
            karpegFile: pemohonData.filekarpeg,
          });
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

  // Handle perubahan file KTP
  const handleKtpChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList((prev) => ({ ...prev, ktpFile: fileList }));
  };

  // Handle perubahan file Karpeg
  const handleKarpegChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList((prev) => ({ ...prev, karpegFile: fileList }));
  };

  // Custom request untuk handle upload
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      // Simulasikan upload berhasil
      setTimeout(() => {
        onSuccess('ok', file);
      }, 0);
    } catch (error) {
      onError(error);
    }
  };

  // Handle submit form
  const updatePemohon = async (values: any) => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      message.error('Token tidak ditemukan! Silakan login kembali.');
      return;
    }

    try {
      const formData = new FormData();

      // Tambahkan field teks ke FormData
      Object.keys(values).forEach((key) => {
        if (key !== 'filektp' && key !== 'filekarpeg' && values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      // Tambahkan file KTP jika ada file baru
      if (fileList.ktpFile && fileList.ktpFile[0]?.originFileObj) {
        formData.append('filektp', fileList.ktpFile[0].originFileObj);
      } else if (values.filektp && values.filektp[0]?.url) {
        // Jika tidak ada file baru, kirim path lama
        formData.append('filektp', values.filektp[0].url);
      }

      // Tambahkan file Karpeg jika ada file baru
      if (fileList.karpegFile && fileList.karpegFile[0]?.originFileObj) {
        formData.append('filekarpeg', fileList.karpegFile[0].originFileObj);
      } else if (values.filekarpeg && values.filekarpeg[0]?.url) {
        // Jika tidak ada file baru, kirim path lama
        formData.append('filekarpeg', values.filekarpeg[0].url);
      }

      // Kirim ke backend
      const response = await fetch(`http://localhost:3001/api/pemohon`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        message.success('Data diri berhasil diperbarui.');
      } else {
        throw new Error(data.message || 'Gagal memperbarui data diri.');
      }
    } catch (error: any) {
      console.error('Error updating user data:', error);
      message.error(error.message || 'Terjadi kesalahan.');
    }
  };

  
  const getPresignedUrl = async (bucket: string, filename: string) => {
    console.log("🔍 Mengirim request untuk presigned URL:", { bucket, filename });
  
    try {
      const response = await axios.get("http://localhost:3001/api/minio/presigned-url", {
        params: { bucket, filename } // Kirim apa adanya
      });
  
      console.log("✅ Response dari server:", response.data);
      return response.data.success ? response.data.url : null;
    } catch (error) {
      console.error(
        "❌ Gagal mendapatkan presigned URL",
        error.response ? error.response.data : error.message
      );
      return null;
    }
  };
  
  


  return (
    <div>
      <Menu />
     
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px', marginLeft: '50px', width: '90%' , background: "#f5f5f5" }}>
        
        <Card  title={
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <BackButton path="/pemohon/dashboard" />
                    <span>Form Data Diri</span>
                </div>
            }   style={{ width: '100%', boxShadow: '6px 6px 6px 6px rgba(0, 0, 0, 0.1)' }}>
          <Form
            {...formItemLayout}
            form={form}
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
                  <Input placeholder="Masukkan pangkat/gol" />
                </Form.Item>
                <Form.Item
                  label="Jabatan (Lektor/Guru Besar/Supervisor/Mahasiswa dll)"
                  name="jabatan"
                  rules={[{ required: true, message: 'Masukkan jabatan!' }]}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input placeholder="Masukkan jabatan" name="jabatan" />
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
                <Form.Item
                label="Scan KTP"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Upload
                  name="filektp"
                  listType="text"
                  maxCount={1}
                  fileList={fileList.ktpFile}
                  onChange={handleKtpChange}
                  customRequest={customRequest}
                  accept=".pdf"
                  beforeUpload={(file) => {
                    const isPdf = file.type === "application/pdf";
                    if (!isPdf) {
                      message.error(`${file.name} bukan file PDF`);
                    }
                    return isPdf || Upload.LIST_IGNORE;
                    }}
                    onPreview={async (file) => {
                    if (file.url) {
                      const url = await getPresignedUrl("ktp-bucket", file.url.split("/").pop());
                      if (url) window.open(url, "_blank");
                    }
                    }}
                  >
                  <Button icon={<UploadOutlined />}>Upload KTP (PDF)</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label="Scan Karpeg"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Upload
                  name="filekarpeg"
                  listType="text"
                  maxCount={1}
                  fileList={fileList.karpegFile}
                  onChange={handleKarpegChange}
                  customRequest={customRequest}
                  accept=".pdf"
                  beforeUpload={(file) => {
                    const isPdf = file.type === "application/pdf";
                    if (!isPdf) {
                      message.error(`${file.name} bukan file PDF`);
                    }
                    return isPdf || Upload.LIST_IGNORE;
                  }}
                  onPreview={async (file) => {
                    if (file.url) {
                      const url = await getPresignedUrl("karpeg-bucket", file.url.split("/").pop());
                      if (url) window.open(url, "_blank");
                    }
                    }}
                >
                  <Button icon={<UploadOutlined />}>Upload Kartu Pegawai (PDF)</Button>
                </Upload>
              </Form.Item>

              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Update Data Diri
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <AppFooter />
    </div>
  );
  };

  export default DataDiriPemohon;