'use client'
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Space, Button } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import Menu from '../../../../components/Menu';
import { Typography } from "antd";

const { Title } = Typography;

interface SuratDetail {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    suratUrl: string;
}

const SuratDetailPage: React.FC = () => {
    const [detail, setDetail] = useState<SuratDetail | null>(null);

    useEffect(() => {
        const dummyData: SuratDetail = {
            id: '12345',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
            suratUrl: 'https://example.com/surat.docx'
        };
        setDetail(dummyData);
    }, []);

    if (!detail) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#f0f2f5' }}>
            <Menu />
            <div style={{ padding: '24px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {/* Header Section */}
                    <Card>
                        <Space align="center" size="middle">
                            <Title level={3}>Detail Surat</Title>
                        </Space>
                    </Card>

                    <Row gutter={[24, 24]}>
                        {/* Surat Detail Section */}
                        <Col span={24}>
                            <Card 
                                title={
                                    <Space>
                                        <FileTextOutlined />
                                        <span>Surat Detail</span>
                                    </Space>
                                }
                                bordered={false}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <div>
                                        <Button 
                                            type="primary" 
                                            icon={<DownloadOutlined />} 
                                            onClick={() => window.open(detail.suratUrl, '_blank')}
                                        >
                                            Download Surat
                                        </Button>
                                    </div>
                                    <div>
                                        <iframe 
                                            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(detail.suratUrl)}`} 
                                            width="100%" 
                                            height="600px" 
                                            frameBorder="0"
                                        >
                                        </iframe>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Space>
            </div>
        </div>
    );
};

export default SuratDetailPage;
