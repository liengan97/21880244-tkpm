import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from '../../../lib/axios';
import { randomUUID } from "crypto";

const handler = NextAuth({
  secret: 'ACC',
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith"
        },
        password: { label: "Password", type: "password" },
      },



      async authorize(credentials) {

        const { status, data } = await axios.post("/auth/login", {
          email: credentials?.email,
          password: credentials?.password,
          userType: 'staff'
        });

        if (status === 401) {
          return null;
        }

        const user = {
          id: randomUUID(),
          email: credentials?.email,
          name: credentials?.email,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken
        }

        if (user) {
          return user;
        }

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login"
  },
  session: {
    strategy: 'jwt',
  }
});

export { handler as GET, handler as POST };