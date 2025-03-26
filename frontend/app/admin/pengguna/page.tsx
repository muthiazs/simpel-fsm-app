'use client';

import React, { useState, useEffect, use } from 'react';
import { Table, Button, Input, Select, Space, Typography , Card} from 'antd';
import Menu from '../../../components/MenuAdmin';
import Header from '../../../components/Header';
import axios from 'axios';
import '@ant-design/v5-patch-for-react-19';
import AppFooter from '../../../components/Footer';
import Loading from '../../../components/Loading';

const { Title } = Typography;
const { Option } = Select;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PEMOHON');
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/users/all');
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }finally {
      setLoading(false); // Matikan loading
    } 
  };

  const createUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/users/', {
        username,
        email,
        password,
        role,
      });
      setUsers([...users, response.data.data]);
      clearForm();
    } catch (error) {
      console.error('Error creating user:', error);
    }finally {
      setLoading(false); // Matikan loading
    } 
  };

  const updateUser = async (id) => {
    try {
      setLoading(true);
      const response = await axios.patch(`http://localhost:3001/api/users/${id}`, {
        username,
        email,
        password,
        role,
      });
      setUsers(users.map((user) => (user.id === id ? response.data.data : user)));
      setEditingUser(null);
      clearForm();
    } catch (error) {
      console.error('Error updating user:', error);
    }finally {
      setLoading(false); // Matikan loading
    } 
  };

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }finally {
      setLoading(false); // Matikan loading
    } 
  };

  const handleEdit = (user) => {
    setLoading(true);
    setEditingUser(user.id);
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
    setLoading(false);
  };

  const clearForm = () => {
    setLoading(true);
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('PEMOHON');
    setLoading(false);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (user) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(user)}>
            Edit
          </Button>
          <Button danger onClick={() => deleteUser(user.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
}


  return (
    <div>
      <Menu />
      <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', marginLeft: '50px' }}>
          <Title level={2}>Permohonan PDLN</Title>
        </div>
        <Card style={{ margin: '20px 50px' }}>
          <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '10px' }}
          />
          <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '10px' }}
          />
          <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '10px' }}
          />
          <Select value={role} onChange={(value) => setRole(value)} style={{ marginBottom: '10px', width: '100%' }}>
        <Option value="PEMOHON">PEMOHON</Option>
        <Option value="ADMIN">ADMIN</Option>
          </Select>
          {editingUser ? (
        <Button type="primary" onClick={() => updateUser(editingUser)}>
          Update User
        </Button>
          ) : (
        <Button type="primary" onClick={createUser}>
          Create User
        </Button>
          )}
        </Card>
        <Card style={{ margin: '20px 50px' }}>
          <Table columns={columns} dataSource={users} rowKey="id" />
        </Card>
        <AppFooter />
      </div>
    </div>
  );
};


export default UserPage;
