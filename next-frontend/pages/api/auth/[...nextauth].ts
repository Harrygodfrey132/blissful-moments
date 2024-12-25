import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { API } from "../../../utils/api";
import { toast } from "sonner";
import { JWT } from "next-auth/jwt";
import { ROUTES } from "../../../utils/routes";

interface ErrorResponse {
  message: string;
}

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
          const { data: loginResponse } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${API.Login}`,
            credentials,
            { headers: { "Content-Type": "application/json" } }
          );

          const { user, token } = loginResponse;

          if (!user || !token) {
            throw new Error("Invalid credentials or missing response data.");
          }

          // Ensure userDetails is either undefined or a valid object
          const userDetails =
            user.user_details && Object.keys(user.user_details).length > 0
              ? user.user_details
              : undefined; // Set to undefined instead of null

          return {
            ...user,
            accessToken: token,
            isVerified: user.isVerified,
            subscriptionStatus: user.subscription_status,
            userDetails: userDetails, // userDetails will now be undefined if not available
          };
        } catch (error) {
          const axiosError = error as AxiosError<ErrorResponse>;
          toast.error("Authorization failed:");
          throw new Error(
            axiosError.response?.data?.message ||
              axiosError.message ||
              "Authorization failed"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken || token.accessToken;
        token.userId = user.id || token.userId;
        token.email = user.email || token.email;
        token.name = user.name || token.name;
        token.isVerified = user.isVerified || token.isVerified;
        token.userDetails = user.userDetails || token.userDetails;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.userId || "",
        name: token.name || "",
        email: token.email || "",
        accessToken: token.accessToken || "",
        isVerified: token.isVerified || false,
        userDetails: token.userDetails || undefined, // Ensure it's either undefined or a valid object
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
