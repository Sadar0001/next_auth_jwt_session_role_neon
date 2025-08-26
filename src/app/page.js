"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="mx-auto max-w-6xl px-4">
      <section className="text-center pt-10 pb-16">
        <p className="inline-flex items-center gap-2 badge border-white/20 bg-white/5 text-white/80">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />{" "}
          Secure Auth, Modern UI
        </p>
        <h1 className="mt-6 text-5xl sm:text-6xl font-black tracking-tight gradient-text neon-text">
          Welcome to NextAuth Neon
        </h1>
        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Production-ready authentication wrapped in a futuristic neon
          interface. Beautiful, fast, and accessible.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          {session ? (
            <Link href="/dashboard" className="btn-neon">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-neon">
                Sign In
              </Link>
              <Link href="/register" className="btn-neon">
                Create Account
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Role-based access",
            desc: "Admin & user roles visualized with glowing badges and protected routes.",
          },
          {
            title: "Secure sessions",
            desc: "NextAuth sessions with JWTs, CSRF protection and httpOnly cookies.",
          },
          {
            title: "Beautiful by default",
            desc: "Glassmorphism, neon glow, and animated backgrounds out of the box.",
          },
        ].map((f, i) => (
          <div key={i} className="glass gradient-border p-6 card-hover">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-white/70">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
