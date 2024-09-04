import MainLayout from '@/components/Layouts/MainLayout'
import SideNavbarLayout from '@/components/Layouts/NavigationBar/SideNavbarLayout'

const layout = ({ children }) => {
  return (
    <>
      {/* <SideNavbarLayout/> */}
      <MainLayout>
        {children}
      </MainLayout>
    </>
  )
}

export default layout