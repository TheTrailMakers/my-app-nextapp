import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


type Metadata = {
  title: string;
  description: string;
  keywords: string;
};



export default function RootLayout({ metadata, children }: { metadata: Metadata; children: React.ReactNode; }) {
  const { title, description, keywords } = metadata;

  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </head>
      <body className="poppins">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
