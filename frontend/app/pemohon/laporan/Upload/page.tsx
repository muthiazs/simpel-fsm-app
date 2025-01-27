'use client'
import React from 'react';
import { Card, Space, Upload, Button, message, Typography } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import Menu from '../../../../components/Menu';

const { Title, Text } = Typography;
const { Dragger } = Upload;

const App: React.FC = () => {
    const handleUpload = (file: any) => {
        message.success(`${file.name} file uploaded successfully`);
        return false;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#f0f2f5', minHeight: '100vh' }}>
            <Menu />
            <div style={{ padding: '24px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Card bordered={false}>
                        <Title level={2} style={{ margin: 0 }}>Upload Laporan PDLN</Title>
                    </Card>

                    <Card 
                        bordered={false}
                        style={{ 
                            textAlign: 'center',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}
                    >
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Dragger
                                customRequest={handleUpload}
                                showUploadList={false}
                                style={{ 
                                    padding: '40px',
                                    background: '#fafafa',
                                    border: '2px dashed #d9d9d9'
                                }}
                            >
                                <Space direction="vertical" size="large">
                                    <UploadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                                    <Title level={3}>
                                        Upload Laporan PDLN
                                    </Title>
                                    <Text type="secondary">
                                        Klik atau seret file ke area ini untuk mengunggah
                                    </Text>
                                    <Button type="primary" icon={<UploadOutlined />} size="large">
                                        Pilih File
                                    </Button>
                                </Space>
                            </Dragger>
                            
                            <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
                                <Text type="secondary">Catatan:</Text>
                                <ul style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                    <li>Format file yang didukung: PDF</li>
                                    <li>Ukuran maksimum file: 10MB</li>
                                    <li>Pastikan dokumen sudah ditandatangani dengan benar</li>
                                </ul>
                            </Space>
                        </Space>
                    </Card>
                </Space>
            </div>
        </div>
    );
};

export default App;