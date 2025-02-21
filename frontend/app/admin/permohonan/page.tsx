'use client';
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
import Menu from '../../../components/MenuAdmin';
import axios from 'axios';

interface DataType {
    key: string;
    no: number;
    namaPemohon: string;
    tanggalPengajuan: string;
    negaraTujuan: string;
    instansiTujuan: string;
    waktuDimulai: string;
    waktuBerakhir: string;
    status: string;
}

const columns: TableProps<DataType>['columns'] = [
    { title: 'No', dataIndex: 'no', key: 'no' },
    { title: 'Nama Pemohon', dataIndex: 'namaPemohon', key: 'namaPemohon' },
    { title: 'Tanggal Pengajuan', dataIndex: 'tanggalPengajuan', key: 'tanggalPengajuan' },
    { title: 'Negara Tujuan', dataIndex: 'negaraTujuan', key: 'negaraTujuan' },
    { title: 'Instansi Tujuan', dataIndex: 'instansiTujuan', key: 'instansiTujuan' },
    { title: 'Waktu Dimulai', dataIndex: 'waktuDimulai', key: 'waktuDimulai' },
    { title: 'Waktu Berakhir', dataIndex: 'waktuBerakhir', key: 'waktuBerakhir' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            let color = status === 'Approved' ? 'green' : status === 'Pending' ? 'geekblue' : 'volcano';
            return <Tag color={color}>{status?.toUpperCase() || 'UNKNOWN'}</Tag>;
        },
    },
    {
        title: 'Aksi',
        key: 'aksi',
        render: (_, record) => (
            <Space size="middle">
                <a href={`/permohonan/${record.key}`}>Detail</a>
                <a href={`/upload/${record.key}`}>Upload Dokumen</a>
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
                    withCredentials: true, // ⬅️ Pastikan jika API membutuhkan cookie/session
                });

                console.log("📥 Data dari API:", response.data);

                if (!response.data?.data || !Array.isArray(response.data.data)) {
                    throw new Error('Data tidak valid dari API');
                }

                const permohonanData = response.data.data.map((item: any, index: number) => ({
                    key: item.id_permohonan?.toString() || `permohonan-${index}`,
                    no: index + 1,
                    namaPemohon: item.pemohon?.nama || 'Unknown',
                    tanggalPengajuan: item.createdat ? new Date(item.createdat).toLocaleDateString() : '-',
                    negaraTujuan: item.negaratujuan || '-',
                    instansiTujuan: item.instansitujuan || '-',
                    waktuDimulai: item.tglmulai ? new Date(item.tglmulai).toLocaleDateString() : '-',
                    waktuBerakhir: item.tglselesai ? new Date(item.tglselesai).toLocaleDateString() : '-',
                    status: item.status || 'Unknown',
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
            <div style={{ padding: '20px 50px' }}>
                <h1>Permohonan PDLN</h1>
                <Table<DataType> columns={columns} dataSource={data} loading={loading} />
            </div>
        </>
    );
};

export default App;
;