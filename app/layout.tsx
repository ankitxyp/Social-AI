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
        <Toaster position="top-center" theme="dark"/>
      </body>
    </html>
  );
}