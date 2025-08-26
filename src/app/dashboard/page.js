"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-neon animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Dashboard Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
          ⚡ Dashboard
        </h1>

        {/* User + Session Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Info Card */}
          <div className="glass p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-neon mb-4">
              User Information
            </h2>
            <div className="space-y-3 text-gray-200">
              <p>
                <strong className="text-neon">Name:</strong> {session.user.name}
              </p>
              <p>
                <strong className="text-neon">Email:</strong>{" "}
                {session.user.email}
              </p>
              <p>
                <strong className="text-neon">Role:</strong>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-sm font-bold shadow-md ${
                    session.user.role === "admin"
                      ? "bg-red-500/20 text-red-400 border border-red-400/50"
                      : "bg-blue-500/20 text-blue-400 border border-blue-400/50"
                  }`}
                >
                  {session.user.role || "user"}
                </span>
              </p>
              <p>
                <strong className="text-neon">User ID:</strong>{" "}
                {session.user.id}
              </p>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="glass p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-neon mb-4">
              Session Status
            </h2>
            <div className="space-y-3 text-gray-200">
              <p>
                <strong className="text-neon">Status:</strong>{" "}
                <span className="text-green-400 font-semibold">
                  Authenticated
                </span>
              </p>
              <p>
                <strong className="text-neon">Session Active:</strong> ✅ Yes
              </p>
            </div>
          </div>
        </div>

        {/* Admin / User Panel */}
        <div className="glass p-6 rounded-2xl shadow-xl hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-neon mb-6">
            {session.user.role === "admin" ? "⚡ Admin Panel" : "🎉 Welcome"}
          </h2>

          {session.user.role === "admin" ? (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-5 rounded-xl border border-red-400/40 hover:shadow-red-400/50 hover:scale-105 transition-all">
                <h3 className="font-semibold text-red-400">User Management</h3>
                <p className="text-sm text-gray-300">Manage all users</p>
              </div>
              <div className="glass-card p-5 rounded-xl border border-purple-400/40 hover:shadow-purple-400/50 hover:scale-105 transition-all">
                <h3 className="font-semibold text-purple-400">
                  System Settings
                </h3>
                <p className="text-sm text-gray-300">Configure application</p>
              </div>
              <div className="glass-card p-5 rounded-xl border border-cyan-400/40 hover:shadow-cyan-400/50 hover:scale-105 transition-all">
                <h3 className="font-semibold text-cyan-400">Analytics</h3>
                <p className="text-sm text-gray-300">View system analytics</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-300 leading-relaxed">
              You are successfully logged in to your dashboard. Enjoy full
              access to your account and explore features with this glowing new
              interface. 🚀
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
