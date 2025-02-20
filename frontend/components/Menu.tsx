'use client'
import React, { useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { HomeOutlined, FileOutlined, FileDoneOutlined, UserOutlined, DownloadOutlined } from '@ant-design/icons';
import Header from './Header';
import '@ant-design/v5-patch-for-react-19';
type MenuItem = Exclude<Required<MenuProps>['items'], undefined>[number];

// Main Menu Component
const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState('beranda');

  const items: MenuItem[] = [
    {
      label: <a href="/pemohon/dashboard">Beranda</a>,
      key: 'beranda',
      icon: <HomeOutlined />,
    },
    {
      label: <a href="/pemohon/permohonan">Permohonan PDLN</a>,
      key: 'permohonan',
      icon: <FileOutlined />,
    },
    {
      label: <a href="/pemohon/laporan">Laporan</a>,
      key: 'laporan',
      icon: <FileDoneOutlined />,
    },
    {
      label: <a href="/pemohon/unduhSurat">Download Surat</a>,
      key: 'surat',
      icon: <DownloadOutlined />,
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
        {/* <UserMenu /> */}
      </div>
    </div>
  );
};

export default CombinedMenu;