import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import connectToDatabase from '../db';

const providers: any = [];

if (
  !!process.env.DUMMY_LOGIN_ENABLED &&
  !!process.env.DUMMY_LOGIN_USERNAME &&
  !!process.env.DUMMY_LOGIN_PASSWORD
) {
  providers.push(
    CredentialsProvider({
      name: 'Username & Password',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any): Promise<any> {
        if (
          credentials &&
          credentials.username === process.env.DUMMY_LOGIN_USERNAME &&
          credentials.password === process.env.DUMMY_LOGIN_PASSWORD
        ) {
          return { id: 1, name: 'Dummy User', email: 'dummy@dummy.com' };
        }

        return null;
      },
    }),
  );
}

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  );
}

const authOptions = {
  providers: providers,
  callbacks: {
    async signIn({ account, profile, user }: any) {
      const db = await connectToDatabase();

      console.log('signIn');
      console.log(JSON.stringify(account));
      console.log(JSON.stringify(profile));
      console.log(JSON.stringify(user));

      let email = user?.email;

      if (account.provider === 'google' && !profile.email_verified) {
        if (!profile.email_verified) {
          return false;
        }

        email = profile.email;
      }

      if (!email) {
        return false;
      }

      const admin = await db.collection('admins').findOne({ email: email });

      return !!admin;
    },
  },
};

export { authOptions };
