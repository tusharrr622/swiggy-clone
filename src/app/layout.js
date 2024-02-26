import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/components/AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Order Food Online from India&apos;s Best Food Delivery Service | Swiggy',
  favicon: '/favicon.ico',
}



export default function RootLayout({ children }) {

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <main>
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
          <ToastContainer />
        </main>
      </body>
    </html>

  );
}
