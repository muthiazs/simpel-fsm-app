'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Select, Space, Typography } from 'antd';
import Menu from '../../../components/MenuAdmin';
import Header from '../../../components/Header';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PEMOHON');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/');
      if (Array.isArray(response.data.data)) {
        setUsers(response.data.data);
      } else {
        console.error('Unexpected response data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
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
    }
  };

  const updateUser = async (id) => {
    try {
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
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
  };

  const clearForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('PEMOHON');
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

  return (
    <div>
      <Menu />
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', marginLeft: '50px' }}>
        <Title level={2}>Permohonan PDLN</Title>
      </div>
      <div style={{ marginTop: '20px', marginLeft: '50px', marginRight: '50px' }}>
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
      </div>
      <div style={{ marginTop: '50px', marginLeft: '50px', marginRight: '50px' }}>
        <Table columns={columns} dataSource={users} rowKey="id" />
      </div>
    </div>
  );
};


export default UserPage;
