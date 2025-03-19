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
import QuickAccessAdmin from '../../../components/QuickAccessAdmin';
import AppFooter from '../../../components/Footer';
import PermohonanStats from '../../../components/PermohonanStats';

const { Title, Text } = Typography;

const DashboardAdmin: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f0f2f5' }}>
            <Menu />
            <div style={{ flex: 1, padding: '24px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Header Section */}
                <Card variant='outlined'>
                    <Space align="center" size="middle">
                    <Title level={2} style={{ margin: 0 }}>Dashboard Admin 👩🏻‍💻</Title>
                    </Space>
                </Card>
                <Row gutter={[24, 24]}>
                    <PermohonanStats />
                    <QuickAccessAdmin />
                </Row>
                </Space>
            </div>
            <AppFooter />
        </div>
    );
};

export default DashboardAdmin;