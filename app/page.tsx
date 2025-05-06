import Image from "next/image";
import Header from "@/app/components/header";
import Hero from "@/app/components/hero";
import ListingsPage from "@/app/components/cards";
import TiltedCard from '@/app/components/TiltedCard';

export default function Home() {
  return (
      <>
        <Header/>
        <Hero/>
        <ListingsPage/>
      </>
  );
}
