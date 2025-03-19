'use client'
import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Button, Grid } from 'antd';
import type { MenuProps } from 'antd';
import { 
  HomeOutlined, 
  FileOutlined, 
  FileDoneOutlined, 
  UserOutlined, 
  DownloadOutlined,
  LogoutOutlined,
  MenuOutlined 
} from '@ant-design/icons';
import Header from './Header';
import '@ant-design/v5-patch-for-react-19';

const { useBreakpoint } = Grid;

type MenuItem = Exclude<Required<MenuProps>['items'], undefined>[number];

// Combined Menu Component
const MainMenu: React.FC = () => {
  const [current, setCurrent] = useState('beranda');
  const screens = useBreakpoint();

  // Effect to update the selected menu item based on the current URL path
  useEffect(() => {
    // Get the current path
    const path = window.location.pathname;
    
    // Map path to menu key
    if (path.includes('/pemohon/dashboard')) {
      setCurrent('beranda');
    } else if (path.includes('/pemohon/permohonan')) {
      setCurrent('permohonan');
    } else if (path.includes('/pemohon/laporan')) {
      setCurrent('laporan');
    } else if (path.includes('/pemohon/profile')) {
      setCurrent('profile');
    }
  }, []);

  const leftItems: MenuItem[] = [
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
  ];

  const rightItems: MenuItem[] = [
    {
      label: <a href="/pemohon/datadiri">Edit Profile</a>,
      key: 'profile',
      icon: <UserOutlined />,
      style: { marginLeft: 'auto' }
    },
    {
      label: <a href="/auth/login">Logout</a>,
      key: 'logout',
      icon: <LogoutOutlined />,
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
      {screens.md ? (
        <Menu 
          onClick={onClick} 
          selectedKeys={[current]} 
          mode="horizontal" 
          items={allItems} 
          style={{ flex: 1 }}
        />
      ) : (
        <Dropdown menu={{ items: allItems, onClick, selectedKeys: [current] }} trigger={['click']}>
          <Button type="primary" icon={<MenuOutlined />} />
        </Dropdown>
      )}
    </>
  );
};

// Combined Menu Component with Header
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