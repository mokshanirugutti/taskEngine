import type { Metadata } from "next";
import {  Inter, Dancing_Script, Delius } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const inter = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

const DancingScript = Dancing_Script({
  variable :"--font-dancing-script",
  subsets : ["latin"],
});

const delius = Delius({
  weight :"400",
  variable : "--font-delius"
})

export const metadata: Metadata = {
  title: "Task Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${DancingScript.variable} ${delius.variable}`}
      >
             <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>            
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
