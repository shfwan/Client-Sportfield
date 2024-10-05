import { jwtDecode } from "jwt-decode"
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export default function withAuth(middleware, reqAuth) {
    return async (req, next) => {

        const pathname = req.nextUrl.pathname
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
        
        if (
            reqAuth.includes(pathname) ||
            pathname.startsWith("/management")
        ) {
            if (session) {
                
                const role = jwtDecode(session.token).role
                
                if (role === "customer" && pathname.startsWith("/management")) {
                    return NextResponse.redirect(new URL("/", req.url))
                }


            } else {
                return NextResponse.redirect(new URL("/", req.url))
            }
        }


        return middleware(req, next)
    }
}