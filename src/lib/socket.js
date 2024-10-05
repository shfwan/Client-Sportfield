import * as io from "socket.io-client"

export const socketInstance = io.connect(process.env.NEXT_PUBLIC_API)