// pages/api/auth/[...nextauth].ts
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
          // Step 1: Authenticate the user via your API
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

          // Step 2: Perform server-side validation of the user account
          const validationResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${API.CheckVerification}/${user.id}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          const validationData = await validationResponse.json();
          // Return user and token
          return {
            ...user,
            accessToken,
            isValidated: validationData.isValidated,
          };
        } catch (error) {
          console.error("Authorization failed:", error.message);
          throw new Error(error.message || "Authorization failed");
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
          isValidated: user.isValidated, // Include validation status
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
        isValidated: token.isValidated, // Include validation status
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ROUTES.Login, // Redirect to a custom login page
    error: ROUTES.Login, // Redirect to login page on error
  },
});
