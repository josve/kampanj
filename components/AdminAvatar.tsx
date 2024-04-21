'use client';

import { Avatar, Dropdown, Menu, Typography, Space, Button } from 'antd';
import { ReactNode } from 'react';

interface AdminAvatarProps {
  username: string;
}

const AdminAvatar = ({ username }: AdminAvatarProps) => {
  const menu: ReactNode = (
    <Menu>
      <Menu.Item key="0">
        <a href="/api/auth/signout">Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="admin-header">
      <div className="section-header-title">
        <img
          src="/images/icon_instruction_white.png"
          className="section-header-icon"
        />
        <span className="section-header-title-text">Administrera</span>
      </div>
      <Typography.Text style={{ marginLeft: 'auto' }}>
        Inloggad som <b>{username}</b>
        <Button
          style={{ marginLeft: '10px' }}
          size="medium"
          href="/api/auth/signout"
        >
          Logga ut
        </Button>
      </Typography.Text>
    </div>
  );
};

export default AdminAvatar;
