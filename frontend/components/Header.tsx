// components/Header.tsx
import React from 'react';
import Image from 'next/image';
import { Layout, Typography } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { HomeOutlined, FileOutlined, FileDoneOutlined, UserOutlined, DownloadOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

// User Menu Component (Fixed)
const UserMenu: React.FC = () => {
  const items = [
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="absolute top-0 right-0 p-2 bg-white shadow-md rounded-md">
      <Menu items={items} />
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="relative">
      <AntHeader className="flex items-center justify-between shadow-sm p-1">
        <div className="flex items-center space-x-4">
          <Image
            src="/logofsm.png"
            alt="Logo Undip"
            width={310}
            height={52}
            className="object-contain"
          />
        </div>
      </AntHeader>
    </div>
  );
};

export default Header;
