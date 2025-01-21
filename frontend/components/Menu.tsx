'use client'
import React, { useState } from 'react';
import { AppstoreOutlined, FileOutlined, FileDoneOutlined, HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Header from './Header';

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
  {
    label: 'Beranda',
    key: 'beranda',
    icon: <HomeOutlined/>,
  },
  {
    label: 'Permohonan PDLN',
    key: 'permohonan',
    icon: <FileOutlined />,
  },
  {
    label: 'Laporan',
    key: 'laporan',
    icon: <FileDoneOutlined/>,
  },
];

const Nav: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <Header />
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </>
    );
};

export default Nav;