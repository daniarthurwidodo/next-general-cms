/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { Card, Form, Input, Button, Typography, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

const { Title } = Typography;

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginCredentials | RegisterCredentials) => {
    setLoading(true);
    try {
      if (isLogin) {
        const { status, data } = await authService.login(values as LoginCredentials);
        
        if (status === 200) {
          // Use cookies instead of localStorage
          document.cookie = `token=${data.token}; path=/; max-age=86400; secure; samesite=strict`
          message.success('Login successful!');
          router.push('/dashboard');
        } else {
          message.error('Login failed. Please check your credentials.');
        }
      } else {
        const response = await authService.register(values as RegisterCredentials);
        document.cookie = `token=${response.token}; path=/; max-age=86400; secure; samesite=strict`
        message.success('Registration successful!');
        router.push('/dashboard');
      }
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Image
            src="/next.svg"
            alt="Logo"
            width={180}
            height={37}
            className="dark:invert"
          />
        </div>
        <Title level={2} className="text-center mb-8">
          {isLogin ? 'Sign in to your account' : 'Create new account'}
        </Title>
        
        <Form
          name="auth-form"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          {!isLogin && (
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              {isLogin ? 'Sign in' : 'Register'}
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or</Divider>

        <Button 
          type="link" 
          className="w-full"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Create new account' : 'Sign in to existing account'}
        </Button>
      </Card>
    </div>
  );
}