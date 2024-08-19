import axios from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const body = {
                    email: credentials?.email,
                    password: credentials?.password
                }

                return axios.post("/api/v1/auth/login", body).then((res) => {
                    return res.data.data
                }).catch((error) => {
                    throw new Error(error.response.data.message)
                }) || null
            },
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token
            return session
        }
    }
})
