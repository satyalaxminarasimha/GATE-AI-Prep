import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-code",
});


export const metadata: Metadata = {
  title: "GATE AI Prep",
  description:
    "AI-powered GATE exam preparation with tailored MCQs and explanations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          sourceCodePro.variable
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
