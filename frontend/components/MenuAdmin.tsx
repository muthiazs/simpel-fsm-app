'use client'
import React, { useState, useEffect } from 'react';
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

  // Effect to update the selected menu item based on the current URL path
  useEffect(() => {
    // Get the current path
    const path = window.location.pathname;
    
    // Map path to menu key
    if (path.includes('/admin/dashboard')) {
      setCurrent('beranda');
    } else if (path.includes('/admin/permohonan')) {
      setCurrent('permohonan');
    } else if (path.includes('/admin/laporan')) {
      setCurrent('laporan');
    } else if (path.includes('/admin/pengguna')) {
      setCurrent('user');
    }
  }, []);

  async function handleLogout() {
    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn("No auth token found. User may already be logged out.");
        return;
      }
  
      // Kirim request ke logout API
      const response = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Logout failed: ${response.status} - ${errorText}`);
        throw new Error(errorText);
      }
  
      // Hapus token dari localStorage setelah logout berhasil
      localStorage.removeItem('authToken');
  
      // Redirect user ke halaman login atau home
      window.location.href = 'http://localhost:3000/auth/login'; // Sesuaikan dengan rute login kamu
  
      console.log('Logout successful');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

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
      label: <a href="/admin/pengguna">Pengguna</a>,
      key: 'user',
      icon: <UserAddOutlined />,
    },
  ];

  

  const rightItems: MenuItem[] = [
    {
      label: <span onClick={handleLogout}>Logout</span>,
      key: 'logout',
      icon: <LogoutOutlined />,
      style: { marginLeft: 'auto' } // Ini mendorong logout ke kanan
    },
  ];

  const allItems = [...leftItems, ...rightItems];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    // No need to setCurrent here as the page will reload and useEffect will set it
  };

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
        <Dropdown menu={{ items: allItems, onClick, selectedKeys: [current] }} trigger={['click']}>
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