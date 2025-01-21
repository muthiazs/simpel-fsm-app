'use client'
import React, { useState } from 'react';
import { Card, Button, ButtonProps } from 'antd';
import Header from '../../../components/Header';
import Menu from '../../../components/Menu';


const App: React.FC = () => {
   return (
    <div>
      <Menu />
        <div style={{ display: 'flex', justifyContent: 'flex-start' , marginTop : '50px', marginLeft : '50px' }}>
            <h3 >Selamat datang Nama , M.Biotech. 👋🏻  </h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop : '50px',height: '100%' }}>
            <Card
            style={{
                width: 500,
                textAlign: 'center',
                boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)',
                backgroundColor: '#FEF7E8' // Change this to your desired color
            }}
            >
            <p style={{ color: 'black' , fontWeight : 'bold' }}>Lengkapi data diri dan upload KTP, Karpeg, dan Paspor</p>
            <div style={{ marginTop: 20 , justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button type="primary" style={{ width: '100%' }}>
                Lengkapi Data Diri disini
                </Button>
            </div>
            </Card>
        </div>
        
      </div>
   );
};

export default App;