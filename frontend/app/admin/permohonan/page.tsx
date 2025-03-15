'use client';
import React, { useEffect, useState } from 'react';
import {Card , Space, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
import Menu from '../../../components/MenuAdmin';
import axios from 'axios';

interface DataType {
    key: string;
    no: number;
    nama: string;
    tanggalPengajuan: string;
    negaraTujuan: string;
    instansiTujuan: string;
    waktuDimulai: string;
    waktuBerakhir: string;
    status: string;
}

// Map status values to display text and colors
const statusConfig = {
    belumdisetujui: { text: 'BELUM DISETUJUI', color: 'blue' },
    disetujui: { text: 'DISETUJUI', color: 'green' },
    ditolak: { text: 'DITOLAK', color: 'red' },
    dalamproses: { text: 'DALAM PROSES', color: 'orange' },
    tidakdiketahui: { text: 'TIDAK DIKETAHUI', color: 'gray' }, // ✅ Tambahkan ini
};

const columns: TableProps<DataType>['columns'] = [
    { title: 'No', dataIndex: 'no', key: 'no' },
    { title: 'Nama Pemohon', dataIndex: 'nama', key: 'nama' },
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
            if (!status) return <Tag color="default">TIDAK DIKETAHUI</Tag>;
    
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
               <a onClick={() => window.location.href = `/admin/permohonan/detail/${record.key}`}>Detail</a>
                {/* <a href={`/upload/${record.key}`}>Upload Dokumen</a> */}
            </Space>
        ),
    },
];

const App: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/permohonan/', {
                    withCredentials: true, // 
                });

                console.log("📥 Data dari API:", response.data);

                if (!response.data?.data || !Array.isArray(response.data.data)) {
                    throw new Error('Data tidak valid dari API');
                }

                const permohonanData = response.data.data.map((item: any, index: number) => ({
                    key: item.id_permohonan?.toString() || `permohonan-${index}`,
                    no: index + 1,
                    nama: item.pemohon?.nama || 'Unknown',
                    tanggalPengajuan: item.createdat ? new Date(item.createdat).toLocaleDateString() : '-',
                    negaraTujuan: item.negaratujuan || '-',
                    instansiTujuan: item.instansitujuan || '-',
                    waktuDimulai: item.tglmulai ? new Date(item.tglmulai).toLocaleDateString() : '-',
                    waktuBerakhir: item.tglselesai ? new Date(item.tglselesai).toLocaleDateString() : '-',
                    status: item.status || 'tidakdiketahui', // ✅ Pastikan status tidak undefined
                }));
                

                setData(permohonanData);
            } catch (error: any) {
                console.error('❌ Error fetching permohonan:', error);
                message.error(`Gagal mengambil data: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Menu />
            <div style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}>
                <Card title="Daftar Permohonan" style={{ width: '100%', boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.1)' }}>
                    <h1>Permohonan PDLN</h1>
                    <Table<DataType> columns={columns} dataSource={data} loading={loading} />
                </Card>
            </div>
            
        </>
    );
};

export default App;
;