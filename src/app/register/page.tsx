/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: RegisterFormData) => {
    setLoading(true);
    try {
      // Add your registration logic here
      console.log('Registration values:', values);
      message.success('Registration successful!');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <Image
            src="/next.svg"
            alt="Logo"
            width={180}
            height={37}
            className="mx-auto dark:invert"
          />
          <h2 className="mt-6 text-2xl font-bold">Create your account</h2>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          scrollToFirstError
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                pattern: /^[0-9\-+()]*$/,
                message: 'Please enter a valid phone number!',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone (optional)" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Register
            </Button>
          </Form.Item>

          <div className="text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}