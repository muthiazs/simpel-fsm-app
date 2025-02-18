// components/Header.tsx
import React from 'react';
import Image from 'next/image';
import { Layout, Typography } from 'antd';
import '@ant-design/v5-patch-for-react-19';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader className="flex items-center shadow-sm p-1">
      <div className="flex items-center space-x-4" >
        <Image
          src="/logofsm.png"
          alt="Logo Undip"
          width={310}
          height={52}
          className="object-contain"
        />
      </div>
    </AntHeader>
  );
};

export default Header;
