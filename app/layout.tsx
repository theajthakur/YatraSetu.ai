import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import SOSButton from "@/components/safety/SOSButton";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YatraSetu — Intelligent Indian Travel Companion",
  description:
    "Seamless Indian journey planning powered by intelligent contextual routing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable, jakarta.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
        <SOSButton />
      </body>
    </html>
  );
}
