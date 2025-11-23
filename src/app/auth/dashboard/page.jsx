"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/api";

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [regLoading, setRegLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

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

  const isManager = user?.is_managing || user?.is_managing;

  if (loading || !user)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-purple-400">
        <div className="text-2xl font-bold">Loading your dashboard...</div>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Welcome, {user.first_name || "Student"}!
          </h1>
          <p className="text-gray-400 text-lg">Manage your profile and track your registrations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="relative p-px bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}>
              <div className="relative bg-gray-900 p-8 rounded-2xl" style={{ clipPath: "inherit" }}>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">{user.first_name?.charAt(0) || user.username?.charAt(0) || "?"}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-purple-400 mb-1">{user.username}</h2>
                  <p className="text-gray-400 text-sm">{user.branch}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <InfoItem label="Moodle ID" value={user.moodleID} />
                  <InfoItem label="Email" value={user.email || "Not provided"} />
                  <InfoItem label="Year" value={user.year || "N/A"} />
                  <InfoItem label="Phone" value={user.phone_number || "Not provided"} />
                  <InfoItem label="Status" value={user.is_active ? "Active" : "Inactive"} status={user.is_active} />
                  {user.is_managing && <InfoItem label="Role" value="Manager" status={true} badge />}
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Registrations Section */}
          <div className="lg:col-span-2">
            <div className="relative p-px bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}>
              <div className="relative bg-gray-900 p-8 rounded-2xl" style={{ clipPath: "inherit" }}>
                <h3 className="text-2xl font-black text-purple-400 mb-6 uppercase tracking-wide">Registered Sports</h3>
                
                {regLoading ? (
                  <div className="text-center py-8 text-gray-400">Loading registrations...</div>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">You haven't registered for any sports yet.</p>
                    <a href="/sports" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-all">
                      Browse Sports
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {registrations.map((reg) => (
                      <div
                        key={reg.id}
                        className="bg-gradient-to-r from-gray-800 to-gray-800/50 border border-purple-500/30 p-4 rounded-lg hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-purple-400">{reg.sport?.name || "Unknown Sport"}</h4>
                          <span className="text-xs bg-purple-700 text-white px-3 py-1 rounded-full">
                            {reg.sport?.isTeamBased ? "Team-based" : "Individual"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                          <div>
                            <span className="text-gray-500">Year:</span> {reg.year}
                          </div>
                          <div>
                            <span className="text-gray-500">Branch:</span> {reg.branch}
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-500">Registered:</span> {new Date(reg.registered_on).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <QuickActionCard title="Browse Sports" subtitle="Explore all available sports" href="/sports" icon="⚽" />
          <QuickActionCard title="My Teams" subtitle="View and manage your teams" href="/sports/teams/list/all" icon="👥" />
          <QuickActionCard title="Events" subtitle="Check upcoming events" href="/sports" icon="📅" />
          <QuickActionCard title="Leaderboard" subtitle="See department standings" href="/sports/leaderboard" icon="🏆" />
          {isManager && (
            <QuickActionCard title="Admin Panel" subtitle="Manager controls" href="/admin" icon="🛠️" />
          )}
        </div>
      </div>
    </main>
  );
}

function InfoItem({ label, value, status, badge }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}:</span>
      <span className={`font-semibold ${status ? "text-green-400" : badge ? "text-purple-400" : "text-gray-300"}`}>
        {value}
      </span>
    </div>
  );
}

function QuickActionCard({ title, subtitle, href, icon }) {
  return (
    <a
      href={href}
      className="relative p-px group"
      style={{ clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" style={{ clipPath: "inherit" }}></div>
      <div
        className="relative bg-gray-900 p-6 flex flex-col items-center justify-center text-center hover:bg-gray-800 transition-all duration-300 border border-purple-500/30 group-hover:border-purple-500/60"
        style={{ clipPath: "inherit" }}
      >
        <div className="text-4xl mb-2">{icon}</div>
        <h4 className="font-bold text-lg text-purple-400 mb-1">{title}</h4>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </a>
  );
}
