'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Space, Row, Col, Badge } from 'antd';
import { 
    FileAddOutlined, 
    HistoryOutlined, 
    DownloadOutlined, 
    UserOutlined,
    InfoCircleOutlined,
    RightOutlined
} from '@ant-design/icons';
import Menu from '../../../components/Menu';
import '@ant-design/v5-patch-for-react-19';

const { Title, Text } = Typography;


const DashboardPemohon: React.FC = () => {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
  
        if (!token) {
          console.error('No token found!');
          return;
        }
  
        try {
          console.log('Fetching user data with token:', token); // Debug log untuk token
  
          const response = await axios.get('http://localhost:3001/api/users', {
            headers: {
              'Authorization': `Bearer ${token}`, // Kirim token JWT di header
            },
          });
  
          console.log('Response:', response); // Debug log untuk respons API
  
          if (response.data.success) {
            setUserData(response.data.user); // Simpan data user yang berhasil diambil
          } else {
            console.error('Failed to fetch user data:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
  
    if (!userData) {
      return <div>Loading...</div>;
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#f0f2f5' }}>
            <Menu />
            <div style={{ padding: '24px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {/* Welcome Section */}
                    <Card>
                        <Space align="center" size="middle">
                            <Title level={2} style={{ margin: 0 }}>Selamat datang, {userData.username} 👋🏻</Title>
                        </Space>
                    </Card>

                    <Row gutter={[24, 24]}>
                        {/* Profile Card */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <Space>
                                        <UserOutlined />
                                        <span>Profil Singkat</span>
                                    </Space>
                                }
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Text type="secondary">Nama</Text>
                                            <div><Text strong>{userData.username}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Email</Text>
                                            <div><Text>{userData.email}</Text></div>
                                        </Col>
                                    </Row>
                                    <Button type="primary" icon={<RightOutlined />}>
                                        Lengkapi Data Diri
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                        {/* Procedure Card */}
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <Space>
                                        <InfoCircleOutlined />
                                        <span>Prosedur</span>
                                    </Space>
                                }
                                variant="outlined"
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <div>
                                        <Text type="secondary">1. Lengkapi data diri</Text>
                                        <div><Text>Upload dokumen pendukung yang diperlukan</Text></div>
                                    </div>
                                    <div>
                                        <Text type="secondary">2. Ajukan permohonan</Text>
                                        <div><Text>Isi form pengajuan PDLN</Text></div>
                                    </div>
                                    <div>
                                        <Text type="secondary">3. Tunggu verifikasi</Text>
                                        <div><Text>Proses verifikasi oleh admin</Text></div>
                                    </div>
                                    <div>
                                        <Text type="secondary">4. Unduh laporan</Text>
                                        <div><Text>Cetak surat persetujuan</Text></div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>

                        {/* Quick Access Cards */}
                        <Col span={24}>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={8}>
                                    <Card
                                        hoverable
                                        variant="outlined"
                                        style={{ height: '100%' }}
                                    >
                                        <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
                                            <FileAddOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                                            <Title level={4} style={{ margin: 0 }}>Ajukan Permohonan Baru</Title>
                                            <Button type="primary" icon={<RightOutlined />}>
                                                Ajukan Sekarang
                                            </Button>
                                        </Space>
                                    </Card>
                                </Col>

                                <Col xs={24} sm={8}>
                                    <Card
                                        hoverable
                                        variant="outlined"
                                        style={{ height: '100%' }}
                                    >
                                        <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
                                            <HistoryOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                                            <Title level={4} style={{ margin: 0 }}>Riwayat Pengajuan</Title>
                                            <Button type="primary" icon={<RightOutlined />}>
                                                Lihat Riwayat
                                            </Button>
                                        </Space>
                                    </Card>
                                </Col>

                                <Col xs={24} sm={8}>
                                    <Card
                                        hoverable
                                        variant="outlined"
                                        style={{ height: '100%' }}
                                    >
                                        <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
                                            <DownloadOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                                            <Title level={4} style={{ margin: 0 }}>Unduh Surat</Title>
                                            <Button type="primary" icon={<RightOutlined />}>
                                                Unduh Sekarang
                                            </Button>
                                        </Space>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Space>
            </div>
        </div>
    );
};


export default DashboardPemohon;