import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aatmanirbhar Nari",
  description: "Empowering women-led home businesses through technology and community.",
};
import Navbar from "@/components/Navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
    <body className="bg-[var(--color-brand-cream)] text-[var(--color-brand-text)] min-h-screen relative selection:bg-brand-peach selection:text-brand-pink">
      {/* Ambient Background Blobs & Cute Doodles */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Glow Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-brand-pink)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-[var(--color-brand-coral)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-[var(--color-brand-peach)] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob" style={{ animationDelay: "4s" }}></div>
        
        {/* Cute Doodles */}
        {/* Sparkle 1 */}
        <svg className="absolute top-[15%] left-[10%] w-8 h-8 text-brand-pink/30 animate-float" style={{ animationDelay: "0s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
        {/* Sparkle 2 */}
        <svg className="absolute top-[25%] right-[15%] w-12 h-12 text-brand-coral/20 animate-float" style={{ animationDelay: "2s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
        {/* Sparkle 3 */}
        <svg className="absolute bottom-[20%] left-[25%] w-6 h-6 text-brand-peach/40 animate-float" style={{ animationDelay: "1s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
        {/* Little Heart */}
        <svg className="absolute bottom-[30%] right-[20%] w-8 h-8 text-brand-pink/30 animate-float" style={{ animationDelay: "3s" }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      
      <Navbar />
      <main className="pt-24">
        {children}
      </main>
    </body>  
    </html>
  );
}
