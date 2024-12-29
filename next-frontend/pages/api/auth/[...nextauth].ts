import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { API } from "../../../utils/api";
import { toast } from "sonner";
import { JWT } from "next-auth/jwt";
import { ROUTES } from "../../../utils/routes";

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${API.Login}`,
            credentials,
            { headers: { "Content-Type": "application/json" } }
          );

          const { user, token } = response.data;

          if (!user || !token) {
            throw new Error("Invalid credentials or missing response data.");
          }

          return {
            ...user,
            accessToken: token,
            userDetails: user.user_details || undefined,
          };
        } catch (error: any) {
          const message =
            error.response?.data?.message || "Authorization failed.";
          toast.error(message);
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          userId: user.id || "",
          email: user.email || null,
          name: user.name || null,
          isVerified: user.isVerified || false,
          userDetails: user.userDetails || undefined,
        } as JWT; // Explicitly cast to JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId || "",
        name: token.name || "",
        email: token.email || "",
        accessToken: token.accessToken || "",
        isVerified: token.isVerified || false,
        userDetails: token.userDetails || undefined,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? url
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ROUTES.Login,
    error: ROUTES.Login,
  },
};

export default NextAuth(authOptions);
