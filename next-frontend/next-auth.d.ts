import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken?: string;
    isVerified?: boolean;
    isSuspended?: integer;
    userDetails?: {
      id: number;
      first_name: string;
      last_name: string;
      country: string | null;
      street_address: string | null;
      city: string | null;
      region: string | null;
      postal_code: string | null;
      profile_picture: string | null;
    };
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken?: string;
      isVerified?: boolean;
      isSuspended?: numeric;
      userDetails?: {
        id: number;
        first_name: string;
        last_name: string;
        country: string | null;
        street_address: string | null;
        city: string | null;
        region: string | null;
        postal_code: string | null;
        profile_picture: string | null;
      };
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
    isSuspended?: numeric;
    userDetails?: {
      id: number;
      first_name: string;
      last_name: string;
      country: string | null;
      street_address: string | null;
      city: string | null;
      region: string | null;
      postal_code: string | null;
      profile_picture: string | null;
    };
  }
}
