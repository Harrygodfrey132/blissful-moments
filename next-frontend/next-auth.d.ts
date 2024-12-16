import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    isVerified?: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken?: string;
      isVerified?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    userId?: string;
    email?: string;
    name?: string;
    isVerified?: boolean;
  }
}
