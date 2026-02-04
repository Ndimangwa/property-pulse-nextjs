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
        //Invoked on successful sign-in
        async signIn({profile}: profileProps) {
            //1. connect to database
            await connectDB();
            //2. check if the user exists
            const userExists = await User.findOne({ email: profile.email });
            //3. if not create user
            if (! userExists)   {
                const username = profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                });
            }
            //4. return true to allow sign-in
            return true;
        },
        //Session callback, modify the session object
        async session({session})    {
            //1. get user from database
            const user = User.findOne({
                email: session.user.email
            });
            //2. assign user id from the session
            session.user.id = user._id.toString();
            //3. return the session
            return session;
        }
    }
};