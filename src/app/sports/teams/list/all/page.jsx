"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamCard from "../../../TeamCard"; // Adjust path if necessary
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import {
  Plus,
  Search,
  Trophy,
  LayoutGrid,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export default function TeamsListAll() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (authLoading) return;

    let mounted = true;
    async function fetchTeams() {
      try {
        const res = await api.get("api/teams/");
        if (mounted) setTeams(res.data);
      } catch (e) {
        console.error(e);
        if (e.response?.status === 401) {
          router.push("/auth/login");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTeams();
    return () => (mounted = false);
  }, [router, authLoading, isAuthenticated]);

  // ✅ FIX: Handler to update state immediately when a child card is deleted
  const handleTeamDeleted = (deletedId) => {
    setTeams((currentTeams) => currentTeams.filter((t) => t.id !== deletedId));
  };

  // Client-side filtering logic
  const filteredTeams = teams.filter((team) => {
    const term = searchTerm.toLowerCase();
    const teamName = team.name?.toLowerCase() || "";
    const sportName = team.sport?.name?.toLowerCase() || "";
    return teamName.includes(term) || sportName.includes(term);
  });

  // 1. Loading State (Skeleton)
  if (authLoading || loading) {
    return <TeamsSkeleton />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden selection:bg-purple-500/30">
      {/* Enhanced Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[40%] right-[30%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/auth/dashboard/')}
            className="group flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-all duration-200 font-medium"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900/50 border border-slate-800 group-hover:border-purple-500/50 flex items-center justify-center transition-all group-hover:bg-slate-900/80">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-2 font-medium tracking-wider text-sm uppercase">
              <LayoutGrid className="w-4 h-4" />
              <span>Team Directory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
              All Teams
            </h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              Browse all registered teams across all sports departments
              {teams.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-400 font-medium">
                  <Sparkles className="w-3 h-3" />
                  {teams.length} {teams.length === 1 ? 'team' : 'teams'}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Enhanced Search Bar */}
            <div className="relative group w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Find team or sport..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-slate-200 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-600 backdrop-blur-sm hover:bg-slate-900/70"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Enhanced Create Button */}
            <button
              onClick={() => router.push('/sports/teams/create')}
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-900/40 active:scale-95 whitespace-nowrap overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Plus className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Create Team</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {teams.length === 0 ? (
          // Enhanced Empty State: No teams in DB
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gradient-to-br from-slate-900/30 to-slate-900/10 border border-dashed border-slate-800 rounded-3xl backdrop-blur-sm">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-slate-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500/20 rounded-full animate-ping" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Teams Created Yet</h3>
            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
              The directory is currently empty. Be the first to create a team and start the competition!
            </p>
            <button
              onClick={() => router.push('/sports/teams/create')}
              className="group text-purple-400 hover:text-purple-300 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-500/10 transition-all"
            >
              <span>Start a Team</span>
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        ) : filteredTeams.length === 0 ? (
          // Enhanced Empty State: No search results
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/50">
                <Search className="w-8 h-8 text-slate-600" />
             </div>
             <p className="text-lg text-slate-300 font-semibold mb-1">No matches found</p>
             <p className="text-slate-500 mb-4">
               We couldn't find any team or sport matching <span className="text-purple-400 font-medium">"{searchTerm}"</span>
             </p>
             <button
               onClick={() => setSearchTerm("")}
               className="text-purple-400 hover:text-purple-300 font-medium hover:underline underline-offset-4 transition-all"
             >
               Clear search
             </button>
          </div>
        ) : (
          // Enhanced Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeams.map((t) => (
              <div
                key={t.id}
                className="group transition-all duration-300 hover:-translate-y-2 h-full"
              >
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                  <div className="relative">
                    {/* ✅ FIX: Pass the onDeleted handler here */}
                    <TeamCard team={t} onDeleted={handleTeamDeleted} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Enhanced Skeleton Component for loading state
function TeamsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Back button skeleton */}
        <div className="h-10 w-40 bg-slate-800/50 rounded-lg animate-pulse" />

        <div className="flex justify-between items-end">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-slate-800/70 rounded animate-pulse" />
            <div className="h-10 w-64 bg-slate-800/70 rounded animate-pulse" />
            <div className="h-4 w-48 bg-slate-800/50 rounded animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-12 w-72 bg-slate-800/70 rounded-xl animate-pulse" />
            <div className="h-12 w-40 bg-slate-800/70 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-72 bg-slate-900/50 border border-slate-800/50 rounded-2xl animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}