import React, { ReactNode } from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined
} from '@ant-design/icons';

interface MenuItem {
  key: string;
  icon: ReactNode;
  label: string;
}

export const menuItems: MenuItem[] = [
  {
    key: 'overview',
    icon: <DashboardOutlined />,
    label: 'Overview',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Users',
  },
  {
    key: 'teams',
    icon: <TeamOutlined />,
    label: 'Teams',
  },
  {
    key: 'files',
    icon: <FileOutlined />,
    label: 'Files',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  }
];