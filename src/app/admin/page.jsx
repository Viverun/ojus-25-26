"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
  //       <div className="text-purple-400 text-lg">Loading...</div>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated || !user?.is_managing) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
  //       <div className="text-center">
  //         <h1 className="text-3xl font-bold text-red-400 mb-4">Access Denied</h1>
  //         <p className="text-gray-400 mb-8">Only managers can access the admin panel.</p>
  //         <a
  //           href="/"
  //           className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg"
  //         >
  //           Back to Home
  //         </a>
  //       </div>
  //     </div>
  //   );
  // }

  const adminControls = [
    {
      category: "Team Management",
      controls: [
        { label: "Create Team", url: "/sports/teams/create", icon: "👥", desc: "Create a new sports team" },
        { label: "View All Teams", url: "/sports/teams/list/all", icon: "📋", desc: "View and manage all teams" },
      ],
    },
    {
      category: "Registrations",
      controls: [
        {
          label: "View All Registrations",
          url: "/sports/registration/list/all",
          icon: "📝",
          desc: "Manage all event registrations",
        },
        {
          label: "User Registrations",
          url: "/sports/registration/user_register_sports",
          icon: "🔍",
          desc: "Search and view user registrations",
        },
      ],
    },
    {
      category: "Sports Events",
      controls: [
        { label: "Indoor Events", url: "/sports/indoor", icon: "🏐", desc: "View all indoor sports events" },
        { label: "Outdoor Events", url: "/sports/outdoor", icon: "⚽", desc: "View all outdoor sports events" },
        { label: "Event Schedule", url: "/sports/schedule", icon: "📅", desc: "View event schedule and timeline" },
      ],
    },
    {
      category: "Account",
      controls: [
        { label: "Dashboard", url: "/auth/dashboard", icon: "📊", desc: "View your profile and stats" },
        { label: "Browse Sports", url: "/sports", icon: "🎯", desc: "Browse all available sports" },
      ],
    },
    {
      category: "Leaderboard",
      controls: [
        {
          label: "Overall Leaderboard",
          url: "sports/leaderboard",
          icon: "🏆",
          desc: "View overall departmental standings",
        },
        {
          label: "Sport Leaderboard",
          url: "/sports/leaderboard/chess-masters",
          icon: "🥇🥈🥉",
          desc: "View individual sport standings",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <a href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
            ← Back to Home
          </a>
          <h1 className="text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            ADMIN PANEL
          </h1>
          <p className="text-gray-400 text-lg">
            Welcome, {user?.first_name || user?.username}! Manage sports events, teams, and registrations.
          </p>
        </div>

        {/* Admin Controls Grid */}
        <div className="space-y-12">
          {adminControls.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-purple-400 mb-6 uppercase tracking-wider">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.controls.map((control, cidx) => (
                  <button key={cidx} onClick={() => router.push(control.url)} className="relative p-px group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                    <div className="relative bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/60 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group-hover:bg-gray-900">
                      <div className="text-4xl mb-3">{control.icon}</div>
                      <h3 className="text-xl font-bold text-purple-400 mb-2">{control.label}</h3>
                      <p className="text-gray-400 text-sm mb-4">{control.desc}</p>
                      <div className="flex items-center text-purple-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Go →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="mt-16 border border-purple-500/30 rounded-lg p-8 bg-purple-500/5">
          <h3 className="text-lg font-bold text-purple-400 mb-3">Manager Permissions</h3>
          <ul className="text-gray-300 space-y-2">
            <li>✓ Create and manage sports teams</li>
            <li>✓ View all event registrations</li>
            <li>✓ Search user registrations by Moodle ID</li>
            <li>✓ Access all sports events and schedules</li>
            <li>✓ Manage team members and roles</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
