import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
const providers = [];

if (
  !!process.env.DUMMY_LOGIN_ENABLED &&
  !!process.env.DUMMY_LOGIN_USERNAME &&
  !!process.env.DUMMY_LOGIN_PASSWORD
) {
  console.log('Added dumy login');
  providers.push(
    CredentialsProvider({
      name: 'Username & Password',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
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
};

export { authOptions };