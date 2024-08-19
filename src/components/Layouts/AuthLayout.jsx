import Toast from "../Elements/Toast"

const AuthLayout = (props) => {
    const { title, children } = props
    return (
        <section className='flex flex-col p-4 gap-4 w-screen h-screen items-center justify-center bg-white'>
            <h1 className="text-black text-3xl">{title}</h1>
            {children}
        </section>
    )
}

export default AuthLayout