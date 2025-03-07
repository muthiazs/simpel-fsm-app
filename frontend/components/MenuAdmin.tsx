'use client'
import React, { useState } from 'react';
import { Menu, Dropdown, Button, Grid } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  FileOutlined,
  FileDoneOutlined,
  UserOutlined,
  FileSyncOutlined,
  UserAddOutlined,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons';
import Header from './Header';
import '@ant-design/v5-patch-for-react-19';

const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

// Main Menu Component
const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState('');
  const screens = useBreakpoint(); // Menggunakan hook useBreakpoint untuk mendeteksi ukuran layar

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
      style: { marginLeft: 'auto' } // Ini mendorong logout ke kanan
    },
  ];

  const allItems = [...leftItems, ...rightItems];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  // Menu untuk dropdown (saat layar kecil)
  const dropdownMenu = (
    <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={allItems} />
  );

  return (
    <>
      {screens.md ? ( // Jika layar besar (md ke atas), tampilkan menu horizontal
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={allItems}
          style={{ flex: 1 }}
        />
      ) : ( // Jika layar kecil, tampilkan dropdown
        <Dropdown menu={{ items: allItems, onClick }} trigger={['click']}>
          <Button type="primary" icon={<MenuOutlined />} />
        </Dropdown>
      )}
    </>
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