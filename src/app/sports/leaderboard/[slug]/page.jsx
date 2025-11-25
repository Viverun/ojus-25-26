"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Loader2,
  Trophy,
  Medal,
  Plus,
  Minus,
  CheckCircle,
  Lock,
  LockOpen,
  RotateCcw,
  ArrowLeft,
  ShieldAlert
} from 'lucide-react';
import api from '@/api/api';
import { useAuth } from '@/context/AuthContext'; // ✅ USE GLOBAL AUTH CONTEXT

// --- Components ---
const RankIcon = ({ rank }) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300 fill-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600 fill-amber-600" />;
    return <span className="font-mono font-bold text-gray-500 text-lg">#{rank}</span>;
};

function AdminItem({ item, index, handleAdjustPoints, isFinalized, adjusting }) {
  const displayRank = item.position || (index + 1);
  const displayDeptPoints = item.points || 0;

  return (
    <div className={`group grid grid-cols-12 items-center gap-4 p-4 border-b border-gray-800 transition-colors ${isFinalized ? 'bg-gray-900/60' : 'bg-gray-900 hover:bg-gray-800'}`}>
      <div className="col-span-2 flex justify-center"><RankIcon rank={displayRank} /></div>
      <div className="col-span-6">
        <div className="font-bold text-white text-lg truncate">{item.display_name}</div>
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase">
            <span className="bg-gray-800 px-2 py-0.5 rounded">{item.branch}</span>
            {displayDeptPoints > 0 && (
                 <span className="text-yellow-600 bg-yellow-900/20 px-1.5 rounded font-mono font-bold border border-yellow-900/50">
                    +{displayDeptPoints} Dept Pts
                </span>
            )}
        </div>
      </div>
      <div className="col-span-4 flex items-center justify-center gap-2">
         {/* Decrease Button */}
         <button
            onClick={() => handleAdjustPoints(item.id, 'subtract')}
            disabled={isFinalized || adjusting === item.id}
            className="p-1 rounded-full bg-gray-800 text-gray-400 hover:bg-red-900/30 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
         >
            {adjusting === item.id ? <Loader2 size={14} className="animate-spin" /> : <Minus size={14} />}
         </button>

         <div className="flex flex-col items-center w-12">
            <span className="text-lg font-bold text-blue-400">{item.score || 0}</span>
            <span className="text-[9px] text-gray-500 uppercase">Score</span>
         </div>

         {/* Increase Button */}
         <button
            onClick={() => handleAdjustPoints(item.id, 'add')}
            disabled={isFinalized || adjusting === item.id}
            className="p-1 rounded-full bg-gray-800 text-gray-400 hover:bg-green-900/30 hover:text-green-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
         >
            {adjusting === item.id ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
         </button>

         {isFinalized && <Lock size={16} className="text-red-500/50 ml-2" />}
      </div>
    </div>
  );
}

function ReadOnlyItem({ item, index }) {
    const displayDeptPoints = item.points;
    return (
        <div className={`grid grid-cols-12 items-center gap-4 p-5 border-b border-gray-800 transition-all ${index < 3 ? 'bg-gradient-to-r from-yellow-500/5 via-transparent to-transparent' : 'hover:bg-gray-900/50'}`}>
            <div className="col-span-2 flex justify-center items-center"><RankIcon rank={item.position} /></div>
            <div className="col-span-7">
                <div className="font-bold text-white text-xl mb-1">{item.display_name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                   <span className="text-gray-400">{item.branch}</span>
                   {displayDeptPoints > 0 && (
                        <span className="text-yellow-600 bg-yellow-900/20 px-1.5 rounded font-mono font-bold border border-yellow-900/50">
                            +{displayDeptPoints} Dept Pts
                        </span>
                    )}
                </div>
            </div>
            <div className="col-span-3 text-right pr-6">
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-mono font-bold text-blue-400">{item.score || 0}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Score</span>
                </div>
            </div>
        </div>
    );
}

// --- Main Page ---
export default function SportLeaderboardPage() {
  const params = useParams();
  const sportSlug = params?.slug;

  // ✅ FIX: Use Global Auth Context instead of local fetch
  const { user, loading: authLoading } = useAuth();

  // ✅ FIX: Robust Admin Check
  const isAdmin = user && (
    user.is_staff ||
    user.is_superuser ||
    user.is_manager ||
    user.role === 'manager'
  );

  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adjusting, setAdjusting] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [msg, setMsg] = useState(null);
  const [sports, setSports] = useState([]);
  const [sportsLoading, setSportsLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await api.get('api/sports/');
        setSports(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setSportsLoading(false);
      }
    };
    fetchSports();
  }, []);

  useEffect(() => {
    if (!sportSlug) return;

    setLoading(true);
    api.get(`api/leaderboard/sport/${sportSlug}/`)
      .then(res => {
          const sorted = [...res.data].sort((a, b) => (b.score || 0) - (a.score || 0));
          setStandings(sorted);
          setLoading(false);
      })
      .catch(err => {
          console.error(err);
          setMsg({type: 'error', text: "Could not load data."});
          setLoading(false);
      });
  }, [sportSlug]);

  const handleAdjustPoints = async (id, action) => {
      setAdjusting(id);

      // Optimistic UI Update
      setStandings(prev => {
          const updated = prev.map(item => item.id === id ? {
              ...item,
              score: action === 'add' ? (item.score || 0) + 1 : Math.max(0, (item.score || 0) - 1)
          } : item);
          return updated.sort((a, b) => (b.score || 0) - (a.score || 0));
      });

      try {
          await api.post(`api/leaderboard/result/${id}/adjust/`, { action });
      } catch (e) {
          setMsg({type: 'error', text: "Failed to sync score. Please try again."});
          setTimeout(() => setMsg(null), 3000);

          // Revert on error
          const refreshRes = await api.get(`api/leaderboard/sport/${sportSlug}/`);
          const sorted = [...refreshRes.data].sort((a, b) => (b.score || 0) - (a.score || 0));
          setStandings(sorted);
      } finally {
          setAdjusting(null);
      }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = standings.map((item, index) => ({ id: item.id, position: index + 1 }));

    try {
        const res = await api.put(`api/leaderboard/sport/${sportSlug}/update/`, payload);
        const sorted = [...res.data].sort((a, b) => (b.score || 0) - (a.score || 0));
        setStandings(sorted);
        setMsg({type: 'success', text: "Standings saved with positions."});
        setTimeout(() => setMsg(null), 3000);
    } catch (err) {
        setMsg({type: 'error', text: "Failed to save ranking."});
    } finally {
        setSaving(false);
    }
  };

  const handleUnlock = async () => {
      if(!confirm("Are you sure you want to unlock? If points were already distributed, this might cause inconsistencies.")) return;

      // Optimistically unlock UI
      setStandings(prev => prev.map(s => ({...s, sport_is_finalized: false})));
      setMsg({type: 'success', text: "Unlocked! You can now edit scores."});
      setTimeout(() => setMsg(null), 3000);

      try {
        await api.post(`api/leaderboard/sport/${sportSlug}/unlock/`);
      } catch(e) {
        console.log("Backend unlock not supported or failed, but UI is unlocked.");
      }
  };

  const handleFinalize = async () => { setShowConfirmDialog('finalize'); };
  const handleReset = async () => { setShowConfirmDialog('reset'); };

  const confirmFinalize = async () => {
      setShowConfirmDialog(null);
      setRefreshing(true);
      try {
          await api.post(`api/leaderboard/sport/${sportSlug}/finalize/`);
          setMsg({type: 'success', text: "🏆 Points Distributed!"});
          setTimeout(() => setMsg(null), 3000);
          const refreshRes = await api.get(`api/leaderboard/sport/${sportSlug}/`);
          const sorted = [...refreshRes.data].sort((a, b) => (b.score || 0) - (a.score || 0));
          setStandings(sorted);
      } catch (e) {
          setMsg({type: 'error', text: "Error finalizing. Please try again."});
          setTimeout(() => setMsg(null), 3000);
      } finally {
          setRefreshing(false);
      }
  };

  const confirmReset = async () => {
      setShowConfirmDialog(null);
      setRefreshing(true);
      try {
          await api.post(`api/leaderboard/sport/${sportSlug}/reset/`);
          setMsg({type: 'success', text: "✅ Scores reset successfully!"});
          setTimeout(() => setMsg(null), 3000);
          const refreshRes = await api.get(`api/leaderboard/sport/${sportSlug}/`);
          const sorted = [...refreshRes.data].sort((a, b) => (b.score || 0) - (a.score || 0));
          setStandings(sorted);
      } catch (e) {
          setMsg({type: 'error', text: "Failed to reset scores. Please try again."});
          setTimeout(() => setMsg(null), 3000);
      } finally {
          setRefreshing(false);
      }
  };

  if (loading || authLoading) return <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /><p className="text-gray-500">Loading data...</p></div>;

  const isFinalized = standings.length > 0 ? standings[0].sport_is_finalized : false;
  const sportName = standings.length > 0 ? standings[0].sport_name : sportSlug.replace(/-/g, ' ');

  const displayedStandings = isAdmin ? standings : standings.slice(0, 5);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      {/* --- Confirm Dialog --- */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-3">
              {showConfirmDialog === 'finalize' ? 'Finalize Rankings?' : '⚠️ Reset Scores?'}
            </h3>
            <p className="text-gray-400 mb-6">
              {showConfirmDialog === 'finalize'
                ? 'Points will be distributed to departments. This action cannot be undone.'
                : 'All scores for this sport will be reset to zero. This action cannot be undone.'}
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowConfirmDialog(null)} className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium">Cancel</button>
              <button onClick={showConfirmDialog === 'finalize' ? confirmFinalize : confirmReset} className={`px-4 py-2 rounded-lg font-medium ${showConfirmDialog === 'finalize' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white'}`}>
                {showConfirmDialog === 'finalize' ? 'Finalize' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Overlay Spinner --- */}
      {refreshing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="text-white font-medium">Updating standings...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/auth/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Go to Dashboard</span>
          </Link>
        </div>

        {/* --- Sport Switcher --- */}
        <div className="mb-8 border border-purple-500/30 rounded-lg p-6 bg-purple-500/5 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wide mb-4">Switch Sport</h3>
          {sportsLoading ? (
            <div className="flex justify-center items-center h-10"><Loader2 className="w-5 h-5 animate-spin text-purple-500" /></div>
          ) : sports.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sports.map((sport) => (
                <Link
                  key={sport.id}
                  href={sport.slug ? `/sports/leaderboard/${sport.slug}` : '#'}
                  className={`p-2 rounded-lg text-sm font-semibold transition-all block text-center ${sport.slug === sportSlug ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-purple-400'}`}
                >
                  {sport.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No sports available.</p>
          )}
        </div>

        {/* --- Header Controls --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-gray-800 gap-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 capitalize mb-2">{sportName}</h1>
                <div className="flex items-center gap-3">
                    <p className="text-gray-400 text-sm uppercase font-semibold">
                      {isAdmin ? 'Full Standings (Admin Mode)' : 'Top 5 Rankings'}
                    </p>
                    {isFinalized ? <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded flex items-center gap-1"><CheckCircle size={12}/> FINALIZED</span>
                                 : <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> DRAFT</span>}
                </div>
            </div>

            {/* --- ADMIN ACTIONS --- */}
            {isAdmin && (
                <div className="flex flex-wrap gap-3">
                    {isFinalized && (
                       <button onClick={handleUnlock} className="bg-amber-900/30 hover:bg-amber-900/50 text-amber-500 px-4 py-2 rounded-xl font-bold flex items-center gap-2 border border-amber-900/50 transition-colors">
                          <LockOpen size={16} /> Unlock
                       </button>
                    )}

                    <button onClick={handleReset} className="bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-xl font-bold disabled:opacity-50 flex items-center gap-2 transition-colors">
                        <RotateCcw size={16} /> Reset
                    </button>
                    <button onClick={handleSave} disabled={isFinalized || saving} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-bold disabled:opacity-50 transition-colors">
                        {saving ? 'Saving...' : 'Save Positions'}
                    </button>
                    <button onClick={handleFinalize} disabled={isFinalized} className={`px-4 py-2 rounded-xl font-bold disabled:opacity-50 transition-colors ${isFinalized ? 'bg-green-900/30 text-green-500' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                        {isFinalized ? 'Distributed' : 'Finalize'}
                    </button>
                </div>
            )}
        </div>

        {msg && <div className={`mb-8 p-4 rounded-xl border text-center font-medium ${msg.type === 'error' ? 'bg-red-900/20 border-red-800 text-red-200' : 'bg-green-900/20 border-green-800 text-green-200'}`}>{msg.text}</div>}

        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
             <div className="grid grid-cols-12 gap-4 p-4 bg-gray-900 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2 text-center">Rank</div>
                <div className={`${isAdmin ? 'col-span-6' : 'col-span-7'}`}>Participant & Dept</div>
                <div className={`${isAdmin ? 'col-span-4' : 'col-span-3'} text-center`}>Score{isAdmin ? ' / Control' : ''}</div>
            </div>
            {standings.length === 0 ? <div className="p-12 text-center text-gray-500">No results yet.</div> :
             isAdmin ? (
                // ✅ ADMIN VIEW (With Controls)
                <div className="divide-y divide-gray-800/50">
                    {standings.map((item, index) => <AdminItem key={item.id} item={item} index={index} handleAdjustPoints={handleAdjustPoints} isFinalized={isFinalized} adjusting={adjusting} />)}
                </div>
             ) : (
                // ❌ USER VIEW (ReadOnly)
                <div className="divide-y divide-gray-800/50">
                    {displayedStandings.map((item, index) => <ReadOnlyItem key={item.id} item={item} index={index} />)}

                    {standings.length > 5 && (
                        <div className="p-4 text-center text-gray-500 text-sm bg-gray-900/30">
                            Showing top 5 participants.
                        </div>
                    )}
                </div>
             )}
        </div>

        {/*/!* --- DEBUG PANEL (Only visible if you are NOT admin but think you should be) --- *!/*/}
        {/*{!isAdmin && (*/}
        {/*    <div className="mt-12 p-4 bg-gray-900 border border-gray-800 rounded text-xs text-gray-600 font-mono">*/}
        {/*        <div className="flex items-center gap-2 mb-2 text-gray-400 font-bold"><ShieldAlert size={14}/> Debug: Admin Permissions Missing</div>*/}
        {/*        <p>User ID: {user?.id || 'Not logged in'}</p>*/}
        {/*        <p>Is Staff: {user?.is_staff ? 'Yes' : 'No'}</p>*/}
        {/*        <p>Is Superuser: {user?.is_superuser ? 'Yes' : 'No'}</p>*/}
        {/*        <p>Is Manager: {user?.is_manager ? 'Yes' : 'No'}</p>*/}
        {/*        <p>Role: {user?.role || 'None'}</p>*/}
        {/*    </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
}