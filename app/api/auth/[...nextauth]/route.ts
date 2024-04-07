import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const providers = [];

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
    providers.push(
        GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      })
    );
}

const handler = NextAuth({
    providers: providers,
    },
)

export { handler as GET, handler as POST }

