'use client'
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';
import axios from 'axios';

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
            let color = status === 'Approved' ? 'green' : status === 'Pending' ? 'geekblue' : 'volcano';
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: 'Aksi',
        key: 'aksi',
        render: (_, record) => (
            <Space size="middle">
                <a>Detail</a>
                <a>Delete</a>
                <a>Upload Surat Kemensetneg</a>
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
                const response = await axios.get('http://localhost:3001/api/permohonan', {
                    withCredentials: true, // Jika backend pakai auth berbasis cookie/session
                });
        
                console.log('Response data:', response.data); // Debugging
        
                const formattedData = response.data.map((item: any, index: number) => ({
                    key: item.id_permohonan,
                    no: index + 1,
                    tanggalPengajuan: new Date(item.createdat).toLocaleDateString(),
                    negaraTujuan: item.negaratujuan,
                    instansiTujuan: item.instansitujuan,
                    waktuDimulai: new Date(item.tglmulai).toLocaleDateString(),
                    waktuBerakhir: new Date(item.tglselesai).toLocaleDateString(),
                    status: 'Pending', // Bisa diganti sesuai status di database
                }));
        
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        
            fetchData();
        }, []);

    return (
        <>
            <Menu />
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', marginLeft: '50px' }}>
                <h1>Permohonan PDLN</h1>
            </div>
            <div style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}>
                <Table<DataType> columns={columns} dataSource={data} loading={loading} />
            </div>
        </>
    );
};

export default App;
