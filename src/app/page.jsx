
import Footer from "@/components/Layouts/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  return (
    <main className="flex flex-col h-full items-center justify-between">
      <h1>Landing Page</h1>
      <Footer />
    </main>
  );
}
