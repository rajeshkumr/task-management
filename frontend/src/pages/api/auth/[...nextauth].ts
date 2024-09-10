// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        // Implement login logic with your backend
        const user = { id: 1, name: 'User' }; // Dummy data
        if (user) {
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
});
