import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const fontMain = localFont({
  src: "../assets/Inter-VariableFont_slnt,wght.ttf",
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "MployClik",
  description: "Transform Your HR Management with Real-Time Insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontMain.variable} antialiased`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
