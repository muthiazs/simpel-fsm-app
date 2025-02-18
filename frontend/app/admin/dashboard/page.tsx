'use client'
import React from 'react';
import { Card, Button, Typography, Space, Row, Col, Badge, Statistic } from 'antd';
import { 
    FileExclamationOutlined,
    FileExcelOutlined,
    FileAddOutlined, 
    FileDoneOutlined,
    CheckOutlined, 
    CloseOutlined, 
    DownloadOutlined,
    RightOutlined
} from '@ant-design/icons';
import Menu from '../../../components/MenuAdmin';
import '@ant-design/v5-patch-for-react-19';

const { Title, Text } = Typography;

const DashboardAdmin: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#f0f2f5' }}>
            <Menu />
            <div style={{ padding: '24px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {/* Header Section */}
                    <Card variant='outlined'>
                        <Space align="center" size="middle">
                                <Title level={2} style={{ margin: 0 }}>Dashboard Admin 👩🏻‍💻</Title>
                        </Space>
                    </Card>

                    {/* Statistics Cards */}
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={8}>
                            <Card
                                hoverable
                                variant='outlined'
                            >
                                <Space direction="horizontal" size="large" style={{ width: '100%', justifyContent: 'center' }}>
                                    <FileExclamationOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
                                    <Statistic
                                        title="Permohonan Belum Disetujui"
                                        value={10}
                                        valueStyle={{ color: '#1890ff' }}
                                    />
                                </Space>
                                <Button 
                                    type="link" 
                                    icon={<RightOutlined />}
                                    style={{ width: '100%', marginTop: '16px' }}
                                >
                                    Lihat Detail
                                </Button>
                            </Card>
                        </Col>

                        <Col xs={24} md={8}>
                            <Card
                                hoverable
                                variant='outlined'
                            >
                                <Space direction="horizontal" size="large" style={{ width: '100%', justifyContent: 'center' }}>
                                    <FileDoneOutlined  style={{ fontSize: '36px', color: '#1890ff' }} />
                                    <Statistic
                                        title="Permohonan Disetujui"
                                        value={5}
                                        valueStyle={{ color: '#52c41a' }}
                                    />
                                </Space>
                                <Button 
                                    type="link" 
                                    icon={<RightOutlined style={{ color: '#52c41a' }} />}
                                    style={{ width: '100%', marginTop: '16px' }}
                                >
                                    Lihat Detail
                                </Button>
                            </Card>
                        </Col>

                        <Col xs={24} md={8}>
                            <Card
                                hoverable
                                variant='outlined'
                            >
                                <Space direction="horizontal" size="large" style={{ width: '100%', justifyContent: 'center' }}>
                                    <FileExcelOutlined style={{ fontSize: '36px', color: '#1890ff' }}  />
                                    <Statistic
                                        title="Permohonan Ditolak"
                                        value={2}
                                        valueStyle={{ color: '#ff4d4f' }}
                                    />
                                </Space>
                                <Button 
                                    type="link" 
                                    icon={<RightOutlined />}
                                    style={{ width: '100%', marginTop: '16px' }}
                                >
                                    Lihat Detail
                                </Button>
                            </Card>
                        </Col>
                    </Row>

                    {/* Generate Surat Section */}
                    <Row gutter={[24, 24]}>
                        <Col span={24}>
                            <Card
                                title={
                                    <Space>
                                        <DownloadOutlined />
                                        <span>Generate Surat</span>
                                    </Space>
                                }
                                variant='outlined'
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Text>Pilih dan generate surat persetujuan untuk permohonan yang telah disetujui.</Text>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Button 
                                                type="primary" 
                                                icon={<DownloadOutlined />}
                                                size="large"
                                            >
                                                Generate Surat
                                            </Button>
                                        </Col>
                                    </Row>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Space>
            </div>
        </div>
    );
};

export default DashboardAdmin;