import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import MainNavBarLayout from "@/components/Layouts/NavigationBar/MainNavBarLayout"
import MainLayout from "@/components/Layouts/MainLayout";
import Toast from "@/components/Elements/Toast";
import Link from "next/link";
import { SessionProvider } from "next-auth/react"
import Footer from "@/components/Layouts/Footer";


export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: false
    }
  });
  const disableNavigation = ["/auth/login", "/auth/register"]
  const pathname = usePathname()



  const handleLayoutAuth = () => {
    const crumbPathname = pathname?.split("/").filter((path) => path !== "")

    const disableBreadcrums = ["/", "/pemesanan", "/riwayat", "/profil"]
    const breadcrumbs = () => (
      <div className="breadcrumbs text-sm mb-2 w-fit p-4">
        <ul>
          {
            crumbPathname?.map((item, i) => (
              <li key={i}>
                <Link key={i} replace={true} href={`/`}>{item == "lapangan" ? item : item.split("_", item.length).flatMap((item) => item + " ")}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    )

    if (pathname === "/auth/login" || pathname === "/auth/register") {
      return <Component {...pageProps} />
    } else {
      return (
        <>
          <MainLayout>
            {/* {disableBreadcrums.includes(pathname) ? "" : breadcrumbs()} */}
            <Component {...pageProps} />
          </MainLayout>
          <Footer/>
        </>
      )
    }
  }

  return (
    // Next Auth
    <SessionProvider>
      {/* Tanstack Query */}
      <QueryClientProvider client={queryClient}>
        {disableNavigation.includes(pathname) ? "" : <MainNavBarLayout />}
        <div className="bg-slate-50">
          {handleLayoutAuth()}
          <Toast className="bg-error">Error:</Toast>
        </div>
      </QueryClientProvider>

    </SessionProvider>
  );
}
