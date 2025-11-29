"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeft,
  Trophy,
  Users,
  Crown,
  Copy,
  Check,
  Trash2,
  LogOut,
  UserPlus,
  ShieldAlert,
  Calendar,
} from "lucide-react";

// The DetailSkeleton component must be defined BEFORE it is used in TeamDetails
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center pt-20">
      <div className="w-full max-w-5xl space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-slate-800 rounded"></div>
        <div className="h-48 w-full bg-slate-900 rounded-3xl border border-slate-800"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-slate-900 rounded-3xl border border-slate-800"></div>
          <div className="h-64 bg-slate-900 rounded-3xl border border-slate-800"></div>
        </div>
      </div>
    </div>
  );
}

export default function TeamDetails() {
  // useParams() automatically grabs the value from the [id] folder
  const params = useParams();
  const id = params?.id;

  const router = useRouter();
  const { user } = useAuth();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Requests state (visible only to manager)
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [reqActionLoading, setReqActionLoading] = useState(false);
  
  async function fetchRequests() {
    if (!id) return;
    setLoadingRequests(true);
    try {
      const res = await api.get(`api/teams/${id}/requests/`);
      setRequests(res.data);
    } catch (err) {
      // if not authorized, just clear requests
      console.warn("Could not fetch requests", err);
      setRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  }
  
  // 1. Fetch Team Details on ID change
  useEffect(() => {
    // Safety check: If for some reason ID isn't ready, wait for it
    if (!id) return;
    async function fetchTeam() {
      try {
        const res = await api.get(`api/teams/${id}/`);
        setTeam(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Team not found or access denied.");
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, [id]);

  // 2. Fetch Requests when team data is available and user is potentially the manager
  // THIS IS THE CRITICAL ADDITION/CHANGE
  useEffect(() => {
    if (team && user && id && team.manager && user.username === team.manager.username) {
        fetchRequests();
    }
  }, [team, user, id]);

  async function respondToRequest(requestId, action) {
    setReqActionLoading(true);
    try {
      await api.post(`api/team-requests/${requestId}/respond/`, { action });
      // refresh requests and team data
      await fetchRequests();
      // refresh team roster
      try {
        const fresh = await api.get(`api/teams/${id}/`);
        setTeam(fresh.data);
      } catch (e) {
        console.warn("Failed refresh team", e);
      }
    } catch (err) {
      console.error("Respond failed", err);
      alert(err.response?.data?.error || "Action failed");
    } finally {
      setReqActionLoading(false);
    }
  }

  // --- Helpers ---
  // Check if current user is the captain
  const isCaptain =
    user && team?.captain && user.username === team.captain.username;
  // Check if current user is already a member
  const isMember =
    user && team?.members?.some((m) => m.username === user.username);
  // Check if team is full
  const isFull = team?.members?.length >= (team?.sport?.max_players || 99);

  // --- Handlers ---
  const handleCopyCode = () => {
    if (team?.team_code) {
      navigator.clipboard.writeText(team.team_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleJoin = async () => {
    setActionLoading(true);
    try {
      // FIX: Ensure correct API prefix if necessary
      await api.post(`api/teams/${id}/join/`, { team_code: team.team_code }); 
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to join team");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLeave = async () => {
    if (!confirm("Are you sure you want to leave this team?")) return;
    setActionLoading(true);
    try {
      // FIX: Ensure correct API prefix if necessary
      await api.post(`api/teams/${id}/leave/`);
      router.push("/sports/teams/list/all");
    } catch (err) {
      alert("Failed to leave team");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("WARNING: This will disband the team permanently. Continue?"))
      return;
    setActionLoading(true);
    try {
      // FIX: Ensure correct API prefix if necessary
      await api.delete(`api/teams/${id}/`);
      router.push("/sports/teams/list/all");
    } catch (err) {
      alert("Failed to delete team");
    } finally {
      setActionLoading(false);
    }
  };

  // --- Render States ---
  if (loading) return <DetailSkeleton />;

  if (error)
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
        <ShieldAlert className="w-12 h-12 mb-4 text-red-500" />
        <h2 className="text-xl text-white font-bold">{error}</h2>
        <button
          onClick={() => router.push("/auth/dashboard")}
          className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );

  // --- Main Render ---
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden selection:bg-purple-500/30">
      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[30%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-12">
        {/* Navigation Button */}
        <button
          onClick={() => router.push("/auth/dashboard")}
          className="group flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-700 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Info & Roster */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="w-3 h-3" />
                    {team.sport?.name || "Sport"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${
                      isFull
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {isFull ? "Team Full" : "Recruiting"}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                  {team.name}
                </h1>
                <p className="text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Created on{" "}
                  {new Date(team.created_at || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Team Code (Private) */}
            {(isMember || isCaptain) && (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-purple-500/30 transition-all">
                <div>
                  <h3 className="text-sm text-slate-400 uppercase tracking-wider font-semibold mb-1">
                    Team Code
                  </h3>
                  <p className="text-xs text-slate-500">
                    Share this code to invite members
                  </p>
                </div>

                <div
                  onClick={handleCopyCode}
                  className="cursor-pointer flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-xl px-5 py-3 hover:border-purple-500/50 transition-all active:scale-95 w-full sm:w-auto justify-between"
                >
                  <span className="text-2xl font-mono text-white tracking-widest">
                    {team.team_code}
                  </span>
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-400 hover:text-purple-400" />
                  )}
                </div>
              </div>
            )}

            {/* Roster List */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Team Roster
                </h3>
                <span className="text-slate-400 text-sm">
                  {team.members?.length} / {team.sport?.max_players || "?"}{" "}
                  Members
                </span>
              </div>

              <div className="space-y-3">
                {team.members?.map((member) => (
                  <div
                    key={member.username}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-white border border-slate-700">
                        {member.first_name?.[0] || member.username[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200 flex items-center gap-2">
                          {member.first_name
                            ? `${member.first_name} ${member.last_name || ""}`
                            : member.username}
                          {team.captain?.username === member.username && (
                            <Crown className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          )}
                        </p>
                        <p className="text-xs text-slate-500">
                          {member.branch || "Student"}
                        </p>
                      </div>
                    </div>
                    {team.captain?.username === member.username && (
                      <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">
                        Captain
                      </span>
                    )}
                  </div>
                ))}

                {/* Open Slots */}
                {Array.from({
                  length: Math.max(
                    0,
                    (team.sport?.max_players || 0) -
                      (team.members?.length || 0)
                  ),
                }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-800 text-slate-600"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-900/50 flex items-center justify-center">
                      <UserPlus className="w-4 h-4 opacity-50" />
                    </div>
                    <span className="text-sm font-medium italic">
                      Open Slot
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4">
                  Team Actions
                </h3>

                <div className="space-y-3">
                  {isCaptain ? (
                    <button
                      onClick={handleDelete}
                      disabled={actionLoading}
                      className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                    >
                      {actionLoading ? (
                        <span className="animate-spin">⌛</span>
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                      Disband Team
                    </button>
                  ) : isMember ? (
                    <button
                      onClick={handleLeave}
                      disabled={actionLoading}
                      className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                    >
                      {actionLoading ? (
                        <span className="animate-spin">⌛</span>
                      ) : (
                        <LogOut className="w-5 h-5" />
                      )}
                      Leave Team
                    </button>
                  ) : !isFull ? (
                    <button
                      onClick={handleJoin}
                      disabled={actionLoading}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-900/20 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02]"
                    >
                      {actionLoading ? (
                        <span className="animate-spin">⌛</span>
                      ) : (
                        <UserPlus className="w-5 h-5" />
                      )}
                      Join Team
                    </button>
                  ) : (
                    <div className="w-full py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-500 text-center font-medium cursor-not-allowed">
                      Team is Full
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <h4 className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">
                    Captain
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {team.captain?.first_name
                          ? `${team.captain.first_name} ${
                              team.captain.last_name || ""
                            }`
                          : team.captain?.username}
                      </p>
                      <p className="text-xs text-slate-400">
                        {team.captain?.email || "No contact info"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Requests - visible only to team manager */}
              {user && team?.manager && user.username === team.manager.username && (
                <div className="mt-6 bg-slate-900/40 border border-white/5 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-white mb-3">
                    Pending Join Requests
                  </h4>
                  {loadingRequests && (
                    <div className="text-sm text-slate-400">
                      Loading requests...
                    </div>
                  )}
                  {!loadingRequests && requests.length === 0 && (
                    <div className="text-sm text-slate-500">
                      No pending requests.
                    </div>
                  )}
                  <div className="space-y-3">
                    {requests.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center justify-between bg-slate-800/30 p-3 rounded"
                      >
                        <div>
                          <div className="font-medium text-white">
                            {r.student?.first_name
                              ? `${r.student.first_name} ${
                                  r.student.last_name || ""
                                }`
                              : r.student?.username}
                          </div>
                          <div className="text-xs text-slate-400">
                            MoodleID: {r.student?.moodleID || "—"}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            disabled={reqActionLoading}
                            onClick={() => respondToRequest(r.id, "accept")}
                            className="px-3 py-1 bg-emerald-500 text-white rounded"
                          >
                            Accept
                          </button>
                          <button
                            disabled={reqActionLoading}
                            onClick={() => respondToRequest(r.id, "decline")}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}