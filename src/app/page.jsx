"use client"
import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Vercel from '../../public/vercel.svg'
import DashboardLogo from '../../public/dashboard.png'
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();
  return (
    <main>
      <Container>
        <Navbar session={session}></Navbar>
        <div className="flex-grow text-center p-10 bg-violet-100">
          <h3 className="text-5xl">Dashboard System</h3>
          <p>Become full-stack developer with NextJS</p>
          <div className="flex justify-center my-10">
            <Image src={DashboardLogo} height={0} width={500} alt="Dashboard"></Image>

          </div>
          
        </div>
        <Footer></Footer>

      </Container>
      
    </main>
    
  );
}
