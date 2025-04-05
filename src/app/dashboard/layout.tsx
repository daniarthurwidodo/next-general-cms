'use client';

import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  UserOutlined,
  FileOutlined,
  TeamOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      key: 'overview',
      icon: <PieChartOutlined />,
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
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="p-4">
          <Image 
            src="/next.svg" 
            alt="Logo" 
            className="h-8 w-auto dark:invert"
            width={32}
            height={32}
          />
        </div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['overview']} 
          mode="inline" 
          items={menuItems} 
          onClick={({key}) => router.push(`/dashboard/${key}`)}
        />
      </Sider>
      <Layout>
        <Header className="bg-white dark:bg-[#141414] p-4" />
        <Content className="m-4">
          <div className="p-6 bg-white dark:bg-[#141414] min-h-[360px] rounded-lg">
            {children}
          </div>
        </Content>
        <Footer className="text-center">
          Next.js Admin Dashboard ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}