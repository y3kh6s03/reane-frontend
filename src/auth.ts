import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const config: NextAuthConfig = {
  theme: {
    logo: "logo.svg"
  },
  providers: [Google],
  pages: {
    signIn: "/login"
  },
  basePath: "/api/auth",
  callbacks: {
    authorized({ auth }) {
      try {
        return !!auth;
      } catch (e) {
        return false;
      }
    },
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config);