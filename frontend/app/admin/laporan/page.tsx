'use client'
import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import Header from '../../../components/Header';
import Menu from '../../../components/MenuAdmin';

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
    {
        title: 'No',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Nama Pemohon',
        dataIndex: 'namaPemohon',
        key: 'namaPemohon',
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
            let color = status === 'Sudah Upload Laporan' ? 'green' : status === 'Belum Upload Laporan' ? 'volcano' : 'geekblue';
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
                <a> Laporan</a>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        no: 1,
        namaPemohon: 'John Doe',
        tanggalPengajuan: '2023-01-01',
        negaraTujuan: 'USA',
        instansiTujuan: 'Harvard University',
        waktuDimulai: '2023-02-01',
        waktuBerakhir: '2023-02-10',
        status: 'Sudah Upload Laporan',
    },
    {
        key: '2',
        no: 2,
        namaPemohon: 'Jane Smith',
        tanggalPengajuan: '2023-01-05',
        negaraTujuan: 'UK',
        instansiTujuan: 'Oxford University',
        waktuDimulai: '2023-03-01',
        waktuBerakhir: '2023-03-15',
        status: 'Belum Upload Laporan',
    },
    {
        key: '3',
        no: 3,
        namaPemohon: 'Alice Johnson',
        tanggalPengajuan: '2023-01-10',
        negaraTujuan: 'Australia',
        instansiTujuan: 'University of Sydney',
        waktuDimulai: '2023-04-01',
        waktuBerakhir: '2023-04-10',
        status: 'Sudah Upload Laporan',
    },
];

const laporan: React.FC = () => (
    <>
        <Menu />
        <div style={{ display: 'flex', justifyContent: 'flex-start' , marginTop : '50px', marginLeft : '50px' }}>
            <h1 >Laporan </h1>
        </div>
        <div style={{ marginTop : '50px', marginLeft : '50px', marginRight : '50px' }}>
            <Table<DataType> columns={columns} dataSource={data} />
        </div>
        
    </>
);

export default laporan;