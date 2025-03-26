'use client'
import React, { useEffect, useState , useRef }  from 'react';
import { Space, Table, Tag, Button, Card, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import Menu from '../../../components/Menu';
import axios from 'axios';
import BackButton from '../../../components/BackButton';
import AppFooter from '../../../components/Footer';
import Loading from '../../../components/Loading';

interface DataType {
    key: string;
    no: number;
    tanggalPengajuan: string;
    negaraTujuan: string;
    instansiTujuan: string;
    waktuDimulai: string;
    waktuBerakhir: string;
    status: string;
}

// Map status values to display text and colors
const statusConfig = {
    tidakdiketahui: { text: 'TIDAK DIKETAHUI', color: 'gray' }, // ✅ Tambahkan ini
    selesai: { text: 'BELUM UPLOAD LAPORAN', color: 'red' }, // ✅ Tambahkan ini
    lengkap: { text: 'LENGKAP', color: 'green' }, // ✅ Tambahkan ini
};

const App: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true); // Flag untuk mengecek apakah komponen masih ter-mount

    
    // Ambil token dan iduser dari localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const iduser = typeof window !== 'undefined' ? localStorage.getItem('iduser') : null;
    
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Tanggal Pengajuan',
            dataIndex: 'tanggalPengajuan',
            key: 'tanggalPengajuan',
        },
        {
            title: 'Negara Tujuan',
            dataIndex: 'negaraTujuan',
            key: 'negaraTujuan',
        },
        {
            title: 'Instansi Tujuan',
            dataIndex: 'instansiTujuan',
            key: 'instansiTujuan',
        },
        {
            title: 'Waktu Dimulai',
            dataIndex: 'waktuDimulai',
            key: 'waktuDimulai',
        },
        {
            title: 'Waktu Berakhir',
            dataIndex: 'waktuBerakhir',
            key: 'waktuBerakhir',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const config = statusConfig[status] || { text: status.toUpperCase(), color: 'default' };
                return (
                    <Tag color={config.color} key={status}>
                        {config.text}
                    </Tag>
                );
            },
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => window.location.href = `/pemohon/permohonan/detail/${record.key}`}>Detail</a>
                    <a onClick={() => window.location.href = `/pemohon/laporan/upload/${record.key}`}>Upload Laporan</a>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); 
        const fetchUserPermohonan = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/permohonan/user/${iduser}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log('Response Data:', response.data);

                if (response.data.success) {
                    const permohonanData = response.data.data?.permohonan;
                    if (Array.isArray(permohonanData)) {
                        const formattedData = permohonanData
                        .filter((item) => item.status == 'selesai'||item.status == 'lengkap')
                        .map((item, index) => ({
                            key: item.id_permohonan,
                            no: index + 1,
                            tanggalPengajuan: new Date(item.createdat).toLocaleDateString(),
                            negaraTujuan: item.negaratujuan,
                            instansiTujuan: item.instansitujuan,
                            waktuDimulai: new Date(item.tglmulai).toLocaleDateString(),
                            waktuBerakhir: new Date(item.tglselesai).toLocaleDateString(),
                            status: item.status || 'belumdisetujui',
                        }));

                        // Periksa apakah komponen masih ter-mount sebelum memperbarui state
                        if (isMounted.current) {
                            setData(formattedData);
                        }
                    } else {
                        console.error('Data permohonan tidak dalam bentuk array:', permohonanData);
                    }
                } else {
                    console.error('Gagal mengambil data permohonan:', response.data.message);
                }
            } catch (error) {
                console.error('Error mengambil data permohonan:', error);
            } finally {
                // Periksa apakah komponen masih ter-mount sebelum memperbarui state
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchUserPermohonan();

        // Cleanup function untuk mengubah flag isMounted menjadi false saat komponen unmount
        return () => {
            isMounted.current = false;
        };
    }, [iduser, token]); // Tambahkan iduser dan token sebagai dependency

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Menu />
            <div style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px', background: '#f5f5f5' }}>
                <Card
                    title={
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <BackButton path="/pemohon/dashboard" />
                            <span>Form Data Diri</span>
                        </div>
                    }
                    style={{ width: '100%', boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.1)' }}
                >
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            loading={loading}
                            scroll={{ x: 'max-content' }}
                            style={{ minWidth: '800px' }}
                        />
                    </div>
                </Card>
            </div>
            <AppFooter />
        </>
    );
};


export default App;