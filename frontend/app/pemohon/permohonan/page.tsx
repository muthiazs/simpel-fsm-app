'use client'
import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button , Card } from 'antd';
import {
    PlusOutlined    
  } from '@ant-design/icons';
import type { TableProps  } from 'antd';
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
        const fetchUserPermohonan = async () => {
            try {
                const userData = {
                    id: 2, // ID user yang login
                };
    
                const response = await axios.get(`http://localhost:3001/api/permohonan/${userData.id}`);
                console.log('Response data:', response.data);
    
                if (response.data.success) {
                    const formattedData = response.data.data.map((item: any, index: number) => ({
                        key: item.id_permohonan,
                        no: index + 1,
                        tanggalPengajuan: new Date(item.createdat).toLocaleDateString(),
                        negaraTujuan: item.negaratujuan,
                        instansiTujuan: item.instansitujuan,
                        waktuDimulai: new Date(item.tglmulai).toLocaleDateString(),
                        waktuBerakhir: new Date(item.tglselesai).toLocaleDateString(),
                        status: 'Pending',
                    }));
    
                    setData(formattedData);
                } else {
                    console.error('Gagal mengambil data permohonan:', response.data.message);
                }
            } catch (error) {
                console.error('Error mengambil data permohonan:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserPermohonan();
    }, []);

    const handleAdd = () => {
        // Handle the logic for adding a new application
        console.log('Add new application');
    };

    return (
        <>
            <Menu />
            <div style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}>
                <Card title="Daftar Pemohonan"  style={{ width: '100%' , boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.1)' }}>
                {/* <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', marginLeft: '50px' }}>
                    <h1>Permohonan PDLN</h1>
                </div> */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginLeft: '50px', marginRight: '50px'  , marginBottom: '20px' }}>
                    <Button type="primary" onClick={() => window.location.href = '/pemohon/pengajuan'} icon={<PlusOutlined />}>Tambahkan Pengajuan Permohonan</Button>
                </div>
                    <Table<DataType> columns={columns} dataSource={data} loading={loading} />
                </Card>
            </div>
        </>
    );
};

export default App;
