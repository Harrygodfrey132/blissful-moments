import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
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
          // Step 1: Authenticate the user via your API
          const { data: loginResponse } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${API.Login}`,
            credentials,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          const { user, token } = loginResponse;

          if (!user || !token) {
            throw new Error("Invalid credentials or missing response data.");
          }

          // Step 2: Perform server-side validation of the user account
          const { data: validationResponse } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}${API.CheckVerification}/${user.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Attach validation data to the user object
          return {
            ...user,
            accessToken: token,
            isVerified: validationResponse?.isVerified,
          };
        } catch (error) {
          console.error("Authorization failed:", error);
          // Extract and re-throw error messages for better debugging
          throw new Error(
            error.response?.data?.message || error.message || "Authorization failed"
          );
        }
      },
    }),
  ],
  callbacks: {
    // Attach additional data to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          accessToken: user.accessToken,
          userId: user.id,
          email: user.email,
          name: user.name,
          isVerified: user.isVerified, // Include validation status
        };
      }
      return token;
    },
    // Attach additional data to the session object
    async session({ session, token }) {
      session.user = {
        id: token.userId,
        name: token.name,
        email: token.email,
        accessToken: token.accessToken,
        isVerified: token.isVerified, // Include validation status
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ROUTES.Login,
    error: ROUTES.Login,
  },
});
