const MainLayout = (props) => {
    const { name, children } = props
    return (
        <section id={name} title={name} className='container relative mx-auto flex flex-col bg-white text-black h-full p-4 z-10 shadow-md'>
            {children}
        </section>
    )
}

export default MainLayout