'use client';

import { Avatar, Dropdown, Menu, Typography, Space } from 'antd';

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
      <Typography.Text style={{ marginRight: 'auto' }}>
        ADMINISTRATOR
      </Typography.Text>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar
          style={{
            cursor: 'pointer',
            backgroundColor: '#F6E400',
            color: 'black',
          }}
          size="large"
        >
          {username}
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default AdminAvatar;
