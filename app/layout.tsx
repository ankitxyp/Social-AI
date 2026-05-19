import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoodTune | AI Music Matcher",
  description: "Find the perfect music for your Instagram stories.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen pb-16 sm:pb-0`}>
        {children}
        <BottomNav/>
        <Toaster 
  position="top-center" 
  toastOptions={{
    style: {
      background: '#111827', // Gray-900 background matching your UI
      color: '#fff',
      border: '1px solid #1f2937', // Gray-800 border
    },
  }}
/>
      </body>
    </html>
  );
}
