import { Inter } from "next/font/google";
import LapanganLayout from "@/components/Layouts/Home/LapanganLayout";
import Search from "@/components/Fragments/Search";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {  
  return (
    <main className="flex flex-col">
      <h1>Landing Page</h1>
    </main>
  );
}
