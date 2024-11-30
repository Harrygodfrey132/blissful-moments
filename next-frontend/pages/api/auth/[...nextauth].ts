import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosError } from "axios";
import { API } from "../../../utils/api";
import { ROUTES } from "../../../utils/routes";
import { toast } from "sonner";
import { JWT } from "next-auth/jwt";

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
          const axiosError = error as AxiosError<ErrorResponse>;
          toast.error("Authorization failed:");
          // Extract and re-throw error messages for better debugging
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
        token.accessToken = user.accessToken;
        token.userId = user.id || "";
        token.email = user.email || "";
        token.name = user.name || "";
        token.isVerified = user.isVerified;
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
