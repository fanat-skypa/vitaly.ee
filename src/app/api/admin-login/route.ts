// src/app/api/admin-login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  console.log('ADMIN_USERNAME:', ADMIN_USERNAME);
  console.log('ADMIN_PASSWORD_HASH:', ADMIN_PASSWORD_HASH);

  if (username !== ADMIN_USERNAME) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!match) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

  return NextResponse.json({ message: 'Login successful' });
}
