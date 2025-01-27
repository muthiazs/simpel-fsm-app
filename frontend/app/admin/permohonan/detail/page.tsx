'use client'
import React, { useEffect, useState } from 'react';
import { Row, Col, List, Typography, Card, Space, Badge, Tag, Button, Form } from 'antd';
import { 
    DownloadOutlined, 
    UserOutlined, 
    GlobalOutlined, 
    FileOutlined 
} from '@ant-design/icons';
import Menu from '../../../../components/MenuAdmin';

const { Title, Text } = Typography;

interface PermohonanDetail {
        id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        uploadedFiles: string[];
        negaraTujuan: string;
        instansiTujuan: string;
        keperluan: string;
        tanggalMulai: string;
        tanggalBerakhir: string;
        sumberDana: string;
        perkiraanBiaya: number;
        rencanaTindakLanjut: string;
        undanganLuarNegeri: string;
        jadwalAgenda: string;
        kerangkaAcuan: string;
        ktp: string;
        karpeg: string;
        paspor: string;
        dataDiri: {
                namaGelar: string;
                noWhatsApp: string;
                nik: string;
                programStudi: string;
                nipNim: string;
                pangkatGol: string;
                jabatan: string;
                noPaspor: string;
        };
}

const PermohonanDetailPage: React.FC = () => {
        const [detail, setDetail] = useState<PermohonanDetail | null>(null);

        useEffect(() => {
                const dummyData: PermohonanDetail = {
                        id: '12345',
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        phone: '123-456-7890',
                        address: '123 Main St, Anytown, USA',
                        uploadedFiles: [
                                'https://example.com/file1.pdf',
                                'https://example.com/file2.pdf'
                        ],
                        negaraTujuan: 'USA',
                        instansiTujuan: 'University of Example',
                        keperluan: 'Research',
                        tanggalMulai: '2025-03-01',
                        tanggalBerakhir: '2025-09-01',
                        sumberDana: 'Government',
                        perkiraanBiaya: 5000000,
                        rencanaTindakLanjut: 'Post-doctoral research publication',
                        undanganLuarNegeri: 'https://example.com/invitation.pdf',
                        jadwalAgenda: 'https://example.com/agenda.pdf',
                        kerangkaAcuan: 'https://example.com/tor.pdf',
                        ktp: 'https://example.com/ktp.pdf',
                        karpeg: 'https://example.com/karpeg.pdf',
                        paspor: 'https://example.com/paspor.pdf',
                        dataDiri: {
                                namaGelar: 'Dr. John Doe',
                                noWhatsApp: '08123456789',
                                nik: '1234567890',
                                programStudi: 'Computer Science',
                                nipNim: 'NIM123456',
                                pangkatGol: 'Lektor',
                                jabatan: 'Lecturer',
                                noPaspor: 'A123456789'
                        }
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
                            <Title level={3}>Detail Permohonan</Title>
                            <Badge status="processing" text="Pending" />
                        </Space>
                    </Card>

                    <Row gutter={[24, 24]}>
                        {/* Data Diri Section */}
                        <Col xs={24} lg={12}>
                            <Card 
                                title={
                                    <Space>
                                        <UserOutlined />
                                        <span>Data Diri</span>
                                    </Space>
                                }
                                bordered={false}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <div>
                                        <Text type="secondary">Nama + Gelar Lengkap</Text>
                                        <div><Text strong>{detail.dataDiri.namaGelar}</Text></div>
                                    </div>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Text type="secondary">Email</Text>
                                            <div><Text>{detail.email}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Nomor WhatsApp</Text>
                                            <div><Text>{detail.dataDiri.noWhatsApp}</Text></div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Text type="secondary">NIK</Text>
                                            <div><Text>{detail.dataDiri.nik}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">NIP/NIM</Text>
                                            <div><Text>{detail.dataDiri.nipNim}</Text></div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Text type="secondary">Program Studi</Text>
                                            <div><Text>{detail.dataDiri.programStudi}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Jabatan</Text>
                                            <div><Text>{detail.dataDiri.jabatan}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Pangkat/Gol</Text>
                                            <div><Text>{detail.dataDiri.pangkatGol}</Text></div>
                                        </Col>
                                    </Row>
                                </Space>
                            </Card>
                        </Col>

                        {/* Informasi Permohonan Section */}
                        <Col xs={24} lg={12}>
                            <Card 
                                title={
                                    <Space>
                                        <GlobalOutlined />
                                        <span>Informasi Permohonan</span>
                                    </Space>
                                }
                                bordered={false}
                            >
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Text type="secondary">Negara Tujuan</Text>
                                            <div><Text strong>{detail.negaraTujuan}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Instansi Tujuan</Text>
                                            <div><Text>{detail.instansiTujuan}</Text></div>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col span={12}>
                                            <Text type="secondary">Keperluan</Text>
                                            <div><Text strong>{detail.keperluan}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Rencana Tindak Lanjut</Text>
                                            <div><Text>{detail.rencanaTindakLanjut}</Text></div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Text type="secondary">Tanggal Mulai</Text>
                                            <div><Text>{detail.tanggalMulai}</Text></div>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary">Tanggal Berakhir</Text>
                                            <div><Text>{detail.tanggalBerakhir}</Text></div>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Text type="secondary">Sumber Dana</Text>
                                        <div><Text>{detail.sumberDana}</Text></div>
                                    </div>
                                    <div>
                                        <Text type="secondary">Perkiraan Biaya</Text>
                                        <div><Text strong>Rp {detail.perkiraanBiaya.toLocaleString()}</Text></div>
                                    </div>
                                </Space>
                            </Card>
                        </Col>

                        {/* Dokumen Section */}
                        <Col span={24}>
                            <Card 
                                title={
                                    <Space>
                                        <FileOutlined />
                                        <span>Dokumen Upload</span>
                                    </Space>
                                }
                                bordered={false}
                            >
                                <List
                                    grid={{ gutter: 16, column: 3 }}
                                    dataSource={[
                                        { title: 'Undangan dari Luar Negeri', url: detail.undanganLuarNegeri },
                                        { title: 'Jadwal Agenda', url: detail.jadwalAgenda },
                                        { title: 'Kerangka Acuan / TOR', url: detail.kerangkaAcuan },
                                        { title: 'KTP', url: detail.ktp },
                                        { title: 'Karpeg', url: detail.karpeg },
                                        { title: 'Paspor', url: detail.paspor }
                                    ]}
                                    renderItem={item => (
                                        <List.Item>
                                            <Card 
                                                hoverable 
                                                size="small"
                                                onClick={() => window.open(item.url, '_blank')}
                                            >
                                                <Card.Meta
                                                    avatar={<DownloadOutlined />}
                                                    title={item.title}
                                                    description="Click to download"
                                                />
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        {/* Button Section */}
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button type="primary" style={{ backgroundColor: 'green', borderColor: 'green' }}>
                                            Setujui
                                        </Button>
                                        <Button type="primary" danger style={{ backgroundColor: 'red', borderColor: 'red' }}>
                                            Tolak
                                        </Button>
                                    </Button.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Row>
                </Space>
            </div>
        </div>
    );
};

export default PermohonanDetailPage;
