'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, List, Typography, Card, Space, Badge, message } from 'antd';
import { DownloadOutlined, UserOutlined, GlobalOutlined, FileOutlined } from '@ant-design/icons';
import Menu from '../../../../components/Menu';
import axios from 'axios';

const { Title, Text } = Typography;

interface PermohonanDetail {
  id_pemohon: number;
  nama: string;
  nohp: string;
  nik: string;
  jabatan: string;
  pangkatgol: string;
  nopaspor: string;
  prodi: string;
  nipnim: string;
  filektp: string;
  filekarpeg: string;
  permohonan: Array<{
    id_permohonan: number;
    negaratujuan: string;
    instansitujuan: string;
    keperluan: string;
    tglmulai: string;
    tglselesai: string;
    biaya: number;
    rencana: string;
    undangan: string;
    agenda: string;
    tor: string;
  }>;
}

const PermohonanDetailPage: React.FC = () => {
  const [detail, setDetail] = useState<PermohonanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedIdUser = localStorage.getItem('iduser');
    
    if (!storedToken || !storedIdUser) {
      message.error('Token atau ID pengguna tidak ditemukan! Silakan login kembali.');
      return;
    }

    const fetchPermohonanDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/permohonan/${storedIdUser}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.data.success) {
          setDetail(response.data.data);
        } else {
          message.error('Gagal mengambil data permohonan.');
        }
      } catch (error) {
        message.error('Terjadi kesalahan saat mengambil data permohonan.');
      } finally {
        setLoading(false);
      }
    };

    fetchPermohonanDetail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail) {
    return <div>Data tidak ditemukan</div>;
  }

 // Ambil permohonan pertama jika ada, atau gunakan default value
 const currentPermohonan = detail?.permohonan?.length 
 ? detail.permohonan[0] 
 : {
     id_permohonan: 0,
     negaratujuan: "",
     instansitujuan: "",
     keperluan: "",
     tglmulai: "",
     tglselesai: "",
     biaya: 0,
     rencana: "",
     undangan: "",
     agenda: "",
     tor: "",
   };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#ffffff' }}>
      <Menu />
      <div style={{ padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Space align="center" size="middle">
              <Title level={3}>Detail Permohonan</Title>
              <Badge status="processing" text="Pending" />
            </Space>
          </Card>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title={<Space><UserOutlined /><span>Data Diri</span></Space>}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Text type="secondary">Nama Lengkap</Text>
                  <Text strong>{detail.nama}</Text>
                  <Row gutter={[16, 16]}>
                    <Col span={12}><Text type="secondary">Nomor HP</Text><Text>{detail.nohp}</Text></Col>
                    <Col span={12}><Text type="secondary">NIK</Text><Text>{detail.nik}</Text></Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={12}><Text type="secondary">NIP/NIM</Text><Text>{detail.nipnim}</Text></Col>
                    <Col span={12}><Text type="secondary">Program Studi</Text><Text>{detail.prodi}</Text></Col>
                  </Row>
                </Space>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title={<Space><GlobalOutlined /><span>Informasi Permohonan</span></Space>}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}><Text type="secondary">Negara Tujuan</Text><Text strong>{currentPermohonan.negaratujuan}</Text></Col>
                    <Col span={12}><Text type="secondary">Instansi Tujuan</Text><Text>{currentPermohonan.instansitujuan}</Text></Col>
                  </Row>
                </Space>
              </Card>
            </Col>
            <Col span={24}>
              <Card title={<Space><FileOutlined /><span>Dokumen Upload</span></Space>}>
                <List
                  grid={{ gutter: 16, column: 3 }}
                  dataSource={[
                    { title: 'Undangan dari Luar Negeri', url: currentPermohonan.undangan },
                    { title: 'Jadwal Agenda', url: currentPermohonan.agenda },
                    { title: 'Kerangka Acuan / TOR', url: currentPermohonan.tor },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <Card hoverable size="small" onClick={() => item.url && window.open(item.url, '_blank')}>
                        <Card.Meta avatar={<DownloadOutlined />} title={item.title} description={item.url ? "Klik untuk mengunduh" : "Tidak ada file"} />
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </div>
    </div>
  );
};

export default PermohonanDetailPage;