"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { AppProvider } from "@/components/AppContext";
import HomeMenu from "@/components/layout/HomeMenu";
export default function Home() {

  return (
    <section className="mt-8">
      <HomeMenu />
    </section>
  );
}
