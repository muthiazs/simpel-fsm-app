'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Space, Row, Col, Badge, Spin } from 'antd';
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

interface UserData {
    username: string;
    email: string;
  }

  interface PemohonData {
    nama: string;
    nipnim: string;
    jabatan: string;
    prodi: string;
    nohp: string;
    pangkatgol: string;
    nopaspor: string;
  }

const DashboardPemohon: React.FC = () => {
    const [userData, setUserData] = useState(null);
    const [pemohonData, setPemohonData] = useState<PemohonData | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchData = async () => {
          const token = localStorage.getItem('authToken');
    
          if (!token) {
            console.error('No token found!');
            setLoading(false);
            return;
          }
    
          try {
            // Fetch both user and pemohon data concurrently
            const [userResponse, pemohonResponse] = await Promise.all([
              axios.get('http://localhost:3001/api/users', {
                headers: { 'Authorization': `Bearer ${token}` },
              }),
              axios.get('http://localhost:3001/api/pemohon', {
                headers: { 'Authorization': `Bearer ${token}` },
              })
            ]);
    
            if (userResponse.data.success) {
              setUserData(userResponse.data.user);
            }
  
            if (pemohonResponse.data.success) {
              setPemohonData(pemohonResponse.data.pemohon);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      if (loading) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spin size="large" />
          </div>
        );
      }
  
      if (!userData) {
        return <div>Error loading user data</div>;
      }
    return (
          <div style={{ display: "flex", flexDirection: "column", width: "100%", background: "#f5f5f5" }}>
            <Menu />
            <div style={{ padding: '24px' }}>
            <Card style={{ width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Welcome Section */}
                <Card style={{ width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}>
                    <Space align="center" size="middle">
                    <Title level={2} style={{ margin: 0 }}>Selamat datang, {userData.username} 👋🏻</Title>
                    </Space>
                </Card>

                <Row gutter={[24, 24]}>
                    {/* Profile Card */}
                    <Col xs={24} lg={12}>
                    <Card style={{ width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}
                        title={
                        <Space>
                            <UserOutlined />
                            <span>Profil Singkat</span>
                        </Space>
                        }
                    >
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Row gutter={[16, 16]}>
                            {pemohonData ? (
                              <>
                            <Col span={12}>
                                <Text type="secondary">Nama Lengkap</Text>
                                <div><Text strong>{pemohonData.nama}</Text></div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">Email</Text>
                                <div><Text>{userData.email}</Text></div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">NIP/NIM</Text>
                                <div><Text>{pemohonData.nipnim}</Text></div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">Jabatan</Text>
                                <div><Text>{pemohonData.jabatan}</Text></div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">Program Studi</Text>
                                <div><Text>{pemohonData.prodi}</Text></div>
                            </Col>
                            <Col span={12}>
                                <Text type="secondary">No. HP</Text>
                                <div><Text>{pemohonData.nohp}</Text></div>
                            </Col> 
                            <Col span={12}>
                                <Text type="secondary">No. Paspor</Text>
                                <div><Text>{pemohonData.nopaspor}</Text></div>
                            </Col> 
                            <Col span={12}>
                                <Text type="secondary">Pangkat/Golongan</Text>
                                <div><Text>{pemohonData.pangkatgol}</Text></div>
                            </Col> 
                              </>
                            ) : (
                              <>
                            
                              </>
                            )}
                        </Row>
                        <Button 
                          type="primary" 
                          icon={<RightOutlined />}
                          href="/pemohon/datadiri"
                        >
                          {pemohonData ? 'Update Data Diri' : 'Lengkapi Data Diri'}
                        </Button>
                        </Space>
                    </Card>
                    </Col>
                    {/* Procedure Card */}
                    <Col xs={24} lg={12}>
                    <Card style={{ width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)' }}
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
                            style={{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
                        >
                            <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
                            <FileAddOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                            <Title level={4} style={{ margin: 0 }}>Ajukan Permohonan Baru</Title>
                            <Button type="primary" icon={<RightOutlined />}>
                                <a href="/pemohon/pengajuan">Ajukan Sekarang</a>
                            </Button>
                            </Space>
                        </Card>
                        </Col>

                        <Col xs={24} sm={8}>
                        <Card
                            hoverable
                            variant="outlined"
                            style={{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
                        >
                            <Space direction="vertical" size="middle" align="center" style={{ width: '100%' }}>
                            <HistoryOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                            <Title level={4} style={{ margin: 0 }}>Riwayat Pengajuan</Title>
                            <Button type="primary" icon={<RightOutlined />}>
                                <a href="/pemohon/permohonan">Lihat Riwayat</a>
                            </Button>
                            </Space>
                        </Card>
                        </Col>

                        <Col xs={24} sm={8}>
                        <Card
                            hoverable
                            variant="outlined"
                            style={{ height: '100%'  ,  width: '100%' , boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)'}}
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
            </Card>
            </div>
        </div>
    );
};


export default DashboardPemohon;