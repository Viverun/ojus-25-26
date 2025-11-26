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
  Phone,
  Hash,
  LayoutDashboard,
  Activity,
  ChevronRight,
  Flag,
  Timer,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
      <div className="text-slate-400">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
          {label}
        </p>
        <p className="text-slate-200 font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-slate-900/50 border border-white/5 p-4 rounded-2xl flex items-center gap-4 hover:border-white/10 transition-colors">
      <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-white truncate">{value}</p>
        <p className="text-xs text-slate-400 font-medium uppercase truncate">
          {label}
        </p>
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

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Panel */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 shadow-2xl relative group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500" />

              <div className="flex flex-col items-center text-center mb-8 mt-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center text-3xl font-bold text-white border-4 border-slate-800 shadow-xl">
                    {user.first_name?.charAt(0) ||
                      user.username?.charAt(0) ||
                      "?"}
                  </div>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-white">
                  {user.username}
                </h2>
                <p className="text-purple-400 font-medium">{user.branch}</p>

                {isManager && (
                  <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-md bg-purple-500/10 text-purple-300 text-xs border border-purple-500/20">
                    <ShieldCheck className="w-3 h-3" /> Manager Access
                  </span>
                )}
              </div>

              {/* Profile Info */}
              <div className="space-y-4">
                <InfoItem icon={Hash} label="Moodle ID" value={user.moodleID} />
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem icon={Calendar} label="Year" value={user.year} />
                <InfoItem
                  icon={Phone}
                  label="Phone"
                  value={user.phone_number}
                />
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl transition-all border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard
                label="Sports Registered"
                value={registrations.length}
                icon={Trophy}
                color="text-yellow-400"
              />
              <StatCard
                label="Ojus Event"
                value="Sports"
                icon={Timer}
                color="text-blue-400"
              />
              <StatCard
                label="Current Season"
                value="2025"
                icon={Flag}
                color="text-orange-400"
              />
            </div>

            {/* Registrations */}
            <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 shadow-2xl min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" /> My
                  Registrations
                </h3>
                <span className="text-xs text-slate-500 uppercase font-semibold">
                  {registrations.length} Records
                </span>
              </div>

              {/* Loading */}
              {regLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 bg-slate-800/50 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              ) : registrations.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-800 rounded-2xl">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 mb-4">
                    You haven't registered for any sports yet.
                  </p>
                  <a
                    href="/sports"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                  >
                    Browse Sports <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {registrations.map((reg) => (
                    <div
                      key={reg.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                          <Trophy className="w-6 h-6" />
                        </div>

                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-purple-300">
                            {reg.sport?.name || "Sport"}
                          </h4>

                          <div className="flex gap-3 text-sm text-slate-400 mt-1">
                            <span>{reg.branch}</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full self-center"></span>
                            <span>Year {reg.year}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            reg.sport?.isTeamBased
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          {reg.sport?.isTeamBased ? "Team Event" : "Individual"}
                        </span>

                        <div className="text-right">
                          <p className="text-xs text-slate-500">Registered on</p>
                          <p className="text-sm font-medium text-slate-300">
                            {new Date(
                              reg.registered_on
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <QuickActionCard
            title="Browse Sports"
            subtitle="Explore available sports"
            href="/sports"
            icon={Trophy}
          />
          <QuickActionCard
            title="My Teams"
            subtitle="Manage your teams"
            href="/sports/teams/list/all"
            icon={Users}
          />
          <QuickActionCard
            title="Events"
            subtitle="Upcoming schedules"
            href="/sports"
            icon={Calendar}
          />
          <QuickActionCard
            title="Leaderboard"
            subtitle="Department standings"
            href="/sports/leaderboard"
            icon={Activity}
          />
          {isManager && (
            <QuickActionCard
              title="Admin Panel"
              subtitle="Manager controls"
              href="/admin"
              icon={ShieldCheck}
              highlight
            />
          )}
        </div>
      </div>
    </main>
  );
}
