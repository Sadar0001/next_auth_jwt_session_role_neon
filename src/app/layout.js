import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth Neon",
  description: "A modern neon-styled NextAuth app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white bg-black`}>
        {/* Animated background layers */}
        <div className="fixed inset-0 -z-20 bg-neon-gradient" />
        <div className="fixed inset-0 -z-10 bg-dot-grid opacity-40" />

        <AuthProvider>
          <Navbar />
          <main className="min-h-screen relative pt-8 pb-16">
            <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
              <div
                className="absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,211,238,.25), transparent 60%)",
                }}
              />
              <div
                className="absolute -bottom-24 -right-24 h-[40rem] w-[40rem] rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,58,237,.25), transparent 60%)",
                }}
              />
            </div>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
