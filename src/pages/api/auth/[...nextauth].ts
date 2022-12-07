import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: <string>process.env.GITHUB_ID,
      clientSecret: <string>process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_ID,
      clientSecret: <string>process.env.GOOGLE_SECRET,
    }),
  ],
});
