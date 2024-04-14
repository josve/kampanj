import { authOptions } from '@/utils/authConfig';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default async function Page({ params: { locale }}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/api/auth/signin');
    }
    console.log(session);

    return (<>
            protected
         </>);
}
