"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";

import {
  Trophy,
  Users,
  Calendar,
  ShieldCheck,
  LogOut,
  Mail,
  Hash,
  LayoutDashboard,
  Activity,
  ChevronRight,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="text-slate-400">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-slate-200 font-medium truncate text-sm">{value}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ title, subtitle, href, icon: Icon, highlight }) {
  return (
    <a
      href={href}
      className={`relative group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        ${
          highlight
            ? "bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/30 hover:border-purple-500/50"
            : "bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700"
        }`}
    >
      <div
        className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center transition-colors 
        ${
          highlight
            ? "bg-purple-500 text-white"
            : "bg-slate-800 text-slate-400 group-hover:bg-purple-600 group-hover:text-white"
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <h4
        className={`font-bold text-lg mb-1 
        ${highlight ? "text-purple-300" : "text-slate-200 group-hover:text-white"}`}
      >
        {title}
      </h4>

      <p className="text-sm text-slate-500 group-hover:text-slate-400 leading-snug">
        {subtitle}
      </p>
    </a>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-purple-400 font-medium animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();

  const [registrations, setRegistrations] = useState([]);
  const [regLoading, setRegLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  // Fetch registrations
  useEffect(() => {
    if (user && isAuthenticated) {
      const fetchRegistrations = async () => {
        try {
          const res = await api.get("api/user-registration-info/");
          setRegistrations(res.data.registrations || []);
        } catch (err) {
          console.error("Failed to fetch registrations:", err);
          setRegistrations([]);
        } finally {
          setRegLoading(false);
        }
      };
      fetchRegistrations();
    }
  }, [user, isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isManager = user?.is_managing;

  if (loading || !user) return <DashboardSkeleton />;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-2 font-medium tracking-wider text-sm uppercase">
              <LayoutDashboard className="w-4 h-4" />
              <span>Student Dashboard</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {user.first_name || "Student"}
              </span>
            </h1>

            <p className="text-slate-400 max-w-xl">
              Track your sports registrations, manage your profile, and keep up
              with upcoming events.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 flex items-center gap-2 shadow-lg">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  user.is_active ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm font-medium text-slate-300">
                {user.is_active ? "System Active" : "Inactive"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card - 380px Height */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4 shadow-2xl relative group sticky top-6 h-[380px] flex flex-col overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl" />

              <div className="flex flex-col items-center text-center mb-3 mt-2">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                    {user.first_name?.charAt(0) ||
                      user.username?.charAt(0) ||
                      "?"}
                  </div>
                </div>

                <h2 className="mt-2 text-base font-bold text-white">
                  {user.username}
                </h2>
                <p className="text-purple-400 font-medium text-xs">{user.branch}</p>

                {isManager && (
                  <span className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-xs border border-purple-500/20">
                    <ShieldCheck className="w-3 h-3" /> Manager
                  </span>
                )}
              </div>

              {/* Profile Info - Compact */}
              <div className="space-y-2 flex-1 min-h-0">
                <InfoItem icon={Hash} label="Moodle ID" value={user.moodleID} />
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem icon={Calendar} label="Year" value={user.year} />
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex-shrink-0">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg transition-all border border-red-500/20 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Registrations Section - 380px Height with Scroll */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-5 shadow-2xl h-[380px] flex flex-col">
              <div className="flex justify-between items-center mb-4 flex-shrink-0">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-purple-400" />
                  </div>
                  My Registrations
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20">
                  {registrations.length} {registrations.length === 1 ? 'Sport' : 'Sports'}
                </span>
              </div>

              {/* Loading */}
              {regLoading ? (
                <div className="space-y-2.5 flex-1 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-slate-800/50 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              ) : registrations.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-800 rounded-2xl min-h-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-3 text-purple-400">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">No Registrations Yet</h4>
                  <p className="text-slate-400 mb-4 max-w-sm text-xs px-4">
                    You haven't registered for any sports yet. Start your journey by exploring available sports!
                  </p>
                  <a
                    href="/sports#arena"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-lg hover:shadow-purple-500/50 text-sm"
                  >
                    Browse Sports <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
                  <div className="space-y-2.5">
                    {registrations.map((reg) => (
                      <div
                        key={reg.id}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-purple-500/30 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0">
                            <Trophy className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                              {reg.sport?.name || "Sport"}
                            </h4>

                            <div className="flex gap-2 text-xs text-slate-400 mt-0.5">
                              <span className="truncate">{reg.branch}</span>
                              <span className="w-1 h-1 bg-slate-600 rounded-full self-center flex-shrink-0"></span>
                              <span className="flex-shrink-0">Year {reg.year}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 sm:mt-0 flex items-center gap-2.5 flex-shrink-0">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                              reg.sport?.isTeamBased
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}
                          >
                            {reg.sport?.isTeamBased ? "Team" : "Individual"}
                          </span>

                          <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase tracking-wide whitespace-nowrap">Registered</p>
                            <p className="text-xs font-medium text-slate-300 whitespace-nowrap">
                              {new Date(reg.registered_on).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Quick Actions</h3>
          <p className="text-slate-400">Navigate to different sections of the platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Browse Sports"
            subtitle="Explore all available sports"
            href="/sports#arena"
            icon={Trophy}
          />
          <QuickActionCard
            title="My Teams"
            subtitle="View and manage your teams"
            href="/sports/teams/list/all"
            icon={Users}
          />
          <QuickActionCard
            title="Events Calendar"
            subtitle="Check upcoming schedules"
            href="/sports"
            icon={Calendar}
          />
          {isManager ? (
            <QuickActionCard
              title="Admin Panel"
              subtitle="Access manager controls"
              href="/admin"
              icon={ShieldCheck}
              highlight
            />
          ) : (
            <QuickActionCard
              title="Leaderboard"
              subtitle="View department standings"
              href="/sports#leaderboard"
              icon={Activity}
            />
          )}
        </div>
      </div>
    </main>
  );
}