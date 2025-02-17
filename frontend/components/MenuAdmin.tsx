'use client'
import React, { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { HomeOutlined, FileOutlined, FileDoneOutlined, UserOutlined , FileSyncOutlined , UserAddOutlined } from '@ant-design/icons';
import Header from './Header';

type MenuItem = Required<MenuProps>['items'][number];

// Main Menu Component
const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState('');

  const items: MenuItem[] = [
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

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu 
      onClick={onClick} 
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} 
      style={{ flex: 1 }}
    />
  );
};

// User Menu Component (Fixed)
const UserMenu: React.FC = () => {
  const items: MenuItem[] = [
    {
      label: 'Edit Profile',
      key: 'profile',
      icon: <UserOutlined />,
    },
  ];

  return <Menu items={items} />;
};

// Combined Menu Component
const CombinedMenu: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <MainMenu />
        <UserMenu />
      </div>
    </div>
  );
};

export default CombinedMenu;