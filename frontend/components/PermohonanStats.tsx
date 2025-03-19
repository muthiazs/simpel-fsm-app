import { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Space, Button } from 'antd';
import { FileExclamationOutlined, FileSyncOutlined, FileDoneOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';

const PermohonanStats = () => {
    const [stats, setStats] = useState({
        belumDisetujui: 0,
        dalamProses: 0,
        selesai: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/permohonan/');
                const data = response.data.data;
                
                const countByStatus = {
                    belumDisetujui: data.filter(p => p.status === 'belumdisetujui').length,
                    dalamProses: data.filter(p => p.status === 'dalamproses').length,
                    selesai: data.filter(p => p.status === 'selesai').length
                };
                
                setStats(countByStatus);
            } catch (error) {
                console.error('Error fetching permohonan stats:', error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <Col span={24}>
        <Row gutter={[24, 24]} justify="space-between">
            <Col xs={24} md={8}>
                <Card hoverable>
                    <Space direction="horizontal" size="large" style={{ width: '100%', justifyContent: 'center' }}>
                        <FileExclamationOutlined style={{ fontSize: '36px', color: '#F57317' }} />
                        <Statistic title="Belum Disetujui" value={stats.belumDisetujui} valueStyle={{ color: '#F57317' }} />
                    </Space>
                    <Button type="link" icon={<RightOutlined />} style={{ width: '100%', marginTop: '16px' }} href='/admin/permohonan'>
                        Lihat Detail
                    </Button>
                </Card>
            </Col>

            <Col xs={24} md={8}>
                <Card hoverable>
                    <Space direction="horizontal" size="large" style={{ width: '100%', justifyContent: 'center' }}>
                        <FileSyncOutlined style={{ fontSize: '36px', color: '#0870E0' }} />
                        <Statistic title="Dalam Proses" value={stats.dalamProses} valueStyle={{ color: '#0870E0' }} />
                    </Space>
                    <Button type="link" icon={<RightOutlined />} style={{ width: '100%', marginTop: '16px' }} href='/admin/permohonan'>
                        Lihat Detail
                    </Button>
                </Card>
            </Col>

            <Col xs={24} md={8}>
                <Card hoverable>
                    <Space direction="horizontal" size="large" style={{ width: '100%', justifyContent: 'center' }}>
                        <FileDoneOutlined style={{ fontSize: '36px', color: '#52c41a' }} />
                        <Statistic title="Selesai" value={stats.selesai} valueStyle={{ color: '#52c41a' }} />
                    </Space>
                    <Button type="link" icon={<RightOutlined />} style={{ width: '100%', marginTop: '16px' }} href='/admin/permohonan'>
                        Lihat Detail
                    </Button>
                </Card>
            </Col>
        </Row>
        </Col>
    );
};

export default PermohonanStats;
