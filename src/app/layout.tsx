import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: "The Trail Makers - Explore new routes in the Himalayas",
  description: "Join for unforgettable journeys with The Trail Makers, your ultimate destination for immersive trekking and hiking experiences. Discover breathtaking landscapes, explore challenging trails, and forge lasting memories in the great outdoors.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {


  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
