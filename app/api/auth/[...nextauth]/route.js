import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToBD } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToBD();
        // check if the user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        // if not, create new user
        if (!userExists) {
            let username = profile.name.replace(/\s/g, "").toLowerCase();
            username = username.replace(/[àáâãäå]/g, "e");
            username = username.replace(/[èéêë]/g, "e");
            username = username.replace(/[ìíîï]/g, "e");
            username = username.replace(/[òóôõö]/g, "e");
            username = username.replace(/[ùúûü]/g, "e");
            username = username.replace(/[ýÿ]/g, "e");
            username = username.replace(/[ç]/g, "e");
          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
