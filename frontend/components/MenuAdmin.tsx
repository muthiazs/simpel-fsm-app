'use client'
import React, { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  FileOutlined,
  FileDoneOutlined,
  UserOutlined,
  FileSyncOutlined,
  UserAddOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Header from './Header';
import '@ant-design/v5-patch-for-react-19';

type MenuItem = Required<MenuProps>['items'][number];

// Main Menu Component
const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState('');

  const leftItems: MenuItem[] = [
    {
      label: <a href="/admin/dashboard">Beranda</a>,
      key: 'beranda',
      icon: <HomeOutlined />,
    },
    {
      label: <a href="/admin/permohonan">Permohonan PDLN</a>,
      key: 'permohonan',
      icon: <FileOutlined />,
    },
    {
      label: <a href="/admin/laporan">Laporan</a>,
      key: 'laporan',
      icon: <FileDoneOutlined />,
    },
    {
      label: <a href="/admin/generatesurat">GenerateSurat</a>,
      key: 'generate',
      icon: <FileSyncOutlined />,
    },
    {
      label: <a href="/admin/pengguna">Pengguna</a>,
      key: 'user',
      icon: <UserAddOutlined />,
    },
  ];

  const rightItems: MenuItem[] = [
    {
      label: <a href="/logout">Logout</a>,
      key: 'logout',
      icon: <LogoutOutlined />,
      style: { marginLeft: 'auto' } // This pushes the logout to the right
    },
  ];

  const allItems = [...leftItems, ...rightItems];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={allItems}
      style={{ flex: 1 }}
    />
  );
};

// Combined Menu Component
const CombinedMenu: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <MainMenu />
      </div>
    </div>
  );
};

export default CombinedMenu;