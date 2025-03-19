'use client'
import React, { useState } from 'react';
import { Card, Space, Upload, Button, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Menu from '../../../../../components/Menu';
import { useParams , useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const App: React.FC = () => {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const permohonanId = "1"; // Ganti dengan ID permohonan yang sesuai

    const handleUpload = (file: File) => {
        setFile(file);
        message.success(`${file.name} siap diunggah`);
        return false;
        
    };

    const token = localStorage.getItem("authToken");

    const handleSubmit = async () => {
        if (!file) {
            message.error("Harap pilih file sebelum mengunggah");
            return;
        }
    
        setLoading(true);
        const formData = new FormData();
        formData.append("laporan", file);
        formData.append("status", "lengkap"); // ✅ Tambahkan status
    
        // 🔍 Debugging: Cek isi FormData sebelum dikirim
        console.log("📂 File yang dikirim:", file);
        console.log("📦 FormData sebelum dikirim:", formData);
    
        try {
            const response = await fetch(`http://localhost:3001/api/permohonan/${id}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    // ❌ Jangan tambahkan 'Content-Type': 'multipart/form-data' karena otomatis diatur oleh FormData
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error("Gagal memperbarui permohonan");
            }
    
            message.success("Surat berhasil diunggah dan status diperbarui menjadi 'selesai'");
             router.push(`/pemohon/permohonan/detail/${id}`);
        } catch (error) {
            console.error("❌ Error updating permohonan:", error);
            message.error("Terjadi kesalahan saat memperbarui permohonan");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#f0f2f5', minHeight: '100vh' }}>
            <Menu />
            <div style={{ padding: '24px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Card variant='outlined' style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <Title level={2} style={{ margin: 0 }}>Upload Dokumen Surat</Title>
                    </Card>

                    <Card 
                       variant='outlined'
                        style={{ 
                            textAlign: 'center',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}
                    >
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <Dragger
                                beforeUpload={handleUpload}
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
                                        Upload Surat yang Sudah Ditandatangani
                                    </Title>
                                    <Text type="secondary">
                                        Klik atau seret file ke area ini untuk mengunggah
                                    </Text>
                                    <Button type="primary" icon={<UploadOutlined />} size="large">
                                        Pilih File
                                    </Button>
                                </Space>
                            </Dragger>
                            
                            <Button 
                                type="primary" 
                                onClick={handleSubmit} 
                                loading={loading} 
                                disabled={!file}
                            >
                                Unggah Surat
                            </Button>
                            
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
