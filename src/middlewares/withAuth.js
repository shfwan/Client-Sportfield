export default function withAuth(middleware, reqAuth) {
    return async (req, next) => {        
        return middleware(req, next)
    }
}