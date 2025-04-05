'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

// Dummy credentials - move to environment variables in production
const DUMMY_USER = {
  username: 'admin',
  password: 'admin123',
  token: 'dummy-jwt-token'
};

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Simulate authentication
    localStorage.setItem('user', JSON.stringify(DUMMY_USER));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Redirect to dashboard with a small delay to simulate auth check
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Spin size="large" tip="Authenticating..." />
    </div>
  );
}
