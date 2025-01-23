'use client'
import React from 'react';
import { Card, Button } from 'antd';
import { FileAddOutlined, HistoryOutlined, DownloadOutlined } from '@ant-design/icons';
import Menu from '../../../components/Menu';

const DashboardPemohon: React.FC = () => {
    return (
        <div>
            <Menu />
            <div style={{ padding: '20px' , justifyContent: 'normal', alignItems: 'center', height: '100%' , marginLeft: '50px', width: '90%' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Selamat datang 👋🏻</h3>
                
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {/* Profil Singkat Card */}
                    <Card 
                        style={{ 
                            width: '48%', 
                            textAlign: 'center', 
                            boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)', 
                            backgroundColor: '#deefff' 
                        }}
                    >
                        <p style={{ color: 'black', fontWeight: 'bold' }}>Profil Singkat</p>
                        <p>Nama: John Doe</p>
                        <p>Email: john.doe@example.com</p>
                        <p style={{ color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
                            Lengkapi data diri dan upload KTP, Karpeg, dan Paspor
                        </p>
                        <Button type="primary" style={{ width: '100%', marginTop: '10px' }}>
                            Lengkapi Data Diri disini
                        </Button>
                    </Card>

                    {/* Prosedur Card */}
                    <Card 
                        style={{ 
                            width: '48%', 
                            textAlign: 'center', 
                            boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)', 
                            backgroundColor: '#deefff' 
                        }}
                    >
                        <p style={{ color: 'black', fontWeight: 'bold' }}>Prosedur</p>
                        <div style={{ textAlign: 'left', marginTop: '10px' }}>
                            <p>1. Lengkapi data diri</p>
                            <p>2. Upload dokumen yang diperlukan</p>
                            <p>3. Ajukan permohonan</p>
                            <p>4. Tunggu verifikasi</p>
                            <p>5. Unduh laporan</p>
                        </div>
                    </Card>

                    {/* Tombol Akses Cepat Cards */}
                    <Card 
                        style={{ 
                            width: '30%', 
                            textAlign: 'center', 
                            boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)', 
                            backgroundColor: '#deefff' 
                        }}
                    >
                        <FileAddOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
                        <p style={{ color: 'black', fontWeight: 'bold' }}>Ajukan Permohonan Baru</p>
                        <Button type="primary" style={{ width: '100%', marginTop: '10px' }}>
                            Ajukan
                        </Button>
                    </Card>

                    <Card 
                        style={{ 
                            width: '30%', 
                            textAlign: 'center', 
                            boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)', 
                            backgroundColor: '#deefff' 
                        }}
                    >
                        <HistoryOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
                        <p style={{ color: 'black', fontWeight: 'bold' }}>Lihat Riwayat Pengajuan</p>
                        <Button type="primary" style={{ width: '100%', marginTop: '10px' }}>
                            Lihat
                        </Button>
                    </Card>

                    <Card 
                        style={{ 
                            width: '30%', 
                            textAlign: 'center', 
                            boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)', 
                            backgroundColor: '#deefff' 
                        }}
                    >
                        <DownloadOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
                        <p style={{ color: 'black', fontWeight: 'bold' }}>Unduh Surat</p>
                        <Button type="primary" style={{ width: '100%', marginTop: '10px' }}>
                            Unduh
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPemohon;