export default function withAuth(middleware, reqAuth) {
    return async (req, next) => {
        console.log("aasd");
        
        return middleware(req, next)
    }
}