import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { Provider } from "next-auth/providers";

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      const res = await fetch(`${req.headers?.origin}/api/auth/validate`, {
        method: "post",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });

      const user = await res.json();

      if (res.ok && !user.error) {
        return user;
      } else if (user.error) {
        throw new Error(user.error);
      }
    },
  }),
];

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  session: { strategy: "jwt" },
  providers,
  adapter: MongoDBAdapter(clientPromise, { databaseName: "AuthData" }),
  secret: process.env.AUTH_SECRET,
};
