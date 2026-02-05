import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import connectDB from '@/config/database';
import User from '@/models/User';

type profileProps = {
    profile: {
        name: string;
        email: string;
        picture: string;
    }
};

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ profile }) {
            await connectDB();

            const userExists = await User.findOne({ email: profile.email });

            if (!userExists) {
                const username = profile.name?.slice(0, 20) || "user";
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture,
                });
            }

            return true;
        },

        async session({ session }) {
            if (!session.user?.email) return session;

            await connectDB();

            const user = await User.findOne({
                email: session.user.email,
            });

            if (user) {
                session.user.id = user._id.toString();
            }

            return session;
        },
    },
};