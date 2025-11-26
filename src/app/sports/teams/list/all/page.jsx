"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamCard from "../../../TeamCard"; // Adjust if needed
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

import {
  Plus,
  Search,
  Trophy,
  LayoutGrid,
  ArrowLeft,
  Sparkles,
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
        if (e.response?.status === 401) router.push("/auth/login");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchTeams();
    return () => (mounted = false);
  }, [router, authLoading, isAuthenticated]);

  // Handle delete from TeamCard
  const handleTeamDeleted = (deletedId) => {
    setTeams((prev) => prev.filter((t) => t.id !== deletedId));
  };

  // Filtering
  const filteredTeams = teams.filter((team) => {
    const term = searchTerm.toLowerCase();
    return (
      team.name?.toLowerCase().includes(term) ||
      team.sport?.name?.toLowerCase().includes(term)
    );
  });

  if (authLoading || loading) return <TeamsSkeleton />;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden selection:bg-purple-500/30">
      {/* Background Effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-[40%] right-[30%] w-[30%] h-[30%] bg-indigo-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/auth/dashboard/")}
            className="group flex items-center gap-2 font-medium text-slate-400 hover:text-purple-400 transition-all"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-slate-900/50 border border-slate-800 rounded-lg group-hover:border-purple-500/50 group-hover:bg-slate-900/80 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-2 text-sm uppercase tracking-wider font-medium">
              <LayoutGrid className="w-4 h-4" />
              Team Directory
            </div>

            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent tracking-tight">
              All Teams
            </h1>

            <p className="text-slate-400 mt-2 flex items-center gap-2">
              Browse all registered teams across departments
              {teams.length > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-purple-400 border border-purple-500/20 bg-purple-500/10 rounded-full">
                  <Sparkles className="w-3 h-3" />
                  {teams.length} {teams.length === 1 ? "team" : "teams"}
                </span>
              )}
            </p>
          </div>

          {/* Search + Create */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative group w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />

              <input
                type="text"
                placeholder="Find team or sport..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 text-slate-200 pl-10 pr-9 py-3 rounded-xl focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-slate-600 hover:bg-slate-900/70 backdrop-blur-sm"
              />

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Create Button */}
            <button
              onClick={() => router.push("/sports/teams/create")}
              className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 rounded-xl text-white font-semibold transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Plus className="w-5 h-5" />
              Create Team
            </button>
          </div>
        </div>

        {/* Content */}
        {teams.length === 0 ? (
          <EmptyTeams />
        ) : filteredTeams.length === 0 ? (
          <EmptySearch searchTerm={searchTerm} clear={() => setSearchTerm("")} />
        ) : (
          <TeamsGrid
            filteredTeams={filteredTeams}
            onDeleted={handleTeamDeleted}
          />
        )}
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUBCOMPONENTS                               */
/* -------------------------------------------------------------------------- */

function TeamsGrid({ filteredTeams, onDeleted }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredTeams.map((t) => (
        <div
          key={t.id}
          className="group transition-all duration-300 hover:-translate-y-2"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
            <TeamCard team={t} onDeleted={onDeleted} />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyTeams() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl backdrop-blur-sm">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-slate-800/40 rounded-full flex items-center justify-center">
          <Trophy className="w-10 h-10 text-slate-600" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500/20 rounded-full animate-ping" />
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">
        No Teams Created Yet
      </h3>

      <p className="text-slate-400 max-w-md mb-6">
        Be the first to create a team and start the competition!
      </p>

      <button className="flex items-center gap-2 px-4 py-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition">
        Start a Team <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

function EmptySearch({ searchTerm, clear }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-slate-600" />
      </div>

      <p className="text-lg text-slate-300 font-semibold">No matches found</p>

      <p className="text-slate-500 mb-4">
        No team or sport matches{" "}
        <span className="text-purple-400">"{searchTerm}"</span>
      </p>

      <button
        onClick={clear}
        className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
      >
        Clear search
      </button>
    </div>
  );
}

function TeamsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
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
          {[...Array(8)].map((_, i) => (
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
