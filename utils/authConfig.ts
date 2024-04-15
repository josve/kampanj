import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
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
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith(process.env.ALLOWED_DOMAIN);
      }
      return false;
    }
  }
};

export { authOptions };
