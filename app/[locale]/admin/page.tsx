import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function Page({ params: { locale } }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/api/auth/signin');
  }
  console.log(session);

  return <>protected</>;
}
