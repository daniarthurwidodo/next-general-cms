'use client';

import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { menuItems } from '@/config/menu';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        className="border-r border-[var(--border)]"
        width={256}
      >
        <div className="p-4 flex items-center justify-center">
          <Image 
            src="/next.svg" 
            alt="Logo" 
            className="h-8 w-auto transition-all duration-300 dark:invert"
            width={32}
            height={32}
            priority
          />
        </div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['overview']} 
          mode="inline" 
          items={menuItems} 
          onClick={({key}) => router.push(`/dashboard/${key}`)}
          className="border-none"
        />
      </Sider>
      <Layout>
        <Header className="site-header px-6 flex items-center justify-between">
          {/* Add header content here */}
        </Header>
        <Content className="m-6">
          <div className="p-6 bg-[var(--background)] min-h-[360px] rounded-lg border border-[var(--border)] shadow-sm fade-in">
            {children}
          </div>
        </Content>
        <Footer className="site-footer">
          Next.js Admin Dashboard ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}