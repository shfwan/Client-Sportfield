import axios from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


const authOption = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const body = {
                    user: credentials?.user,
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
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {            
            session.user = token
            
            return session
        }
    }
}
const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
