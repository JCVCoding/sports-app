import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

export const authOptions = [
  GitHubProvider({
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
    authorization: '',
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   profile(profile) {
    //     return {
    //       Return all the profile information you need.
    //       The only truly required field is `id`
    //       to be able identify the account when added to a database
    //     }
    //   }
  }),
];

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise, { databaseName: 'UserOAuthData' }),
  providers: authOptions,
});
