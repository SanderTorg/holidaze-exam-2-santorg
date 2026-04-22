import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Holidaze",
  description:
    "A vacation rental platform where you can book and browse venues for your next trip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  h-full antialiased`}>
        <div className="min-h-full flex flex-col">
          <header>
            <Navbar />
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
