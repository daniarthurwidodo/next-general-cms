/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Here you would typically:
    // 1. Validate the credentials
    // 2. Check against your database
    // 3. Generate a JWT token
    // This is a simplified example

    // For demo purposes, just check if email and password exist
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 }
      );
    }

    // Mock successful response
    return NextResponse.json({
      token: 'mock_jwt_token',
      user: {
        id: '1',
        email,
        username: email.split('@')[0],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}