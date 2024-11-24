import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API } from "../../../utils/api";
import { ROUTES } from "../../../utils/routes";

export default NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${API.Login}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
              credentials: "include",
            }
          );

          const responseData = await response.json();

          if (!response.ok) {
            console.error("Login API error:", responseData);
            throw new Error(responseData.message || "Invalid credentials");
          }

          const user = responseData.user;
          const accessToken = responseData.token;

          // Return user and accessToken as part of the response
          return { ...user, accessToken };
        } catch (error) {
          console.error("Authorization failed:", error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          accessToken: user.accessToken,
          userId: user.id,
          email: user.email,
          name: user.name,
        };
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId,
        name: token.name,
        email: token.email,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ROUTES.Login,
  },
});
