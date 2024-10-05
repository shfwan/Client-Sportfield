import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export async function mainMiddleware(req) {
    return NextResponse.next()
}

export default withAuth(mainMiddleware, ["/profil","/riwayat", "/pemesanan", "/dashboard","/management", "/management/:path*"])