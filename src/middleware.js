import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";
import { getToken } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

export async function middleware(req) {


    const reqAuth = ["/riwayat", "/pemesanan", "/profil", "/dashboard"]
    const adminOnly = ["/dashboard", "/riwayat", "/pemesanan", "/profil", "/management"]

    if (reqAuth.includes(req.nextUrl.pathname)) {
        const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

        if (session) {
            const { role } = jwtDecode(session.token)

            // if(role !== "provider" && adminOnly.includes(req.nextUrl.pathname)) {
            //     return NextResponse.redirect(new URL("/", req.url))
            // }

        } else {
            return NextResponse.redirect(new URL("/", req.url))
        }

    }
    return NextResponse.next()
}

// export default withAuth(middleware, ["/riwayat", "/pemesanan"])
export const config = {
    matcher: ["/riwayat", "/pemesanan", "/pemesanan/:path*", "/profil", "/dashboard"],
}