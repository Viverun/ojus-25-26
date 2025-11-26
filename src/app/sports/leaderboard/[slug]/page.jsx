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
import { useAuth } from '@/context/AuthContext';

// Import the CSS file
import "./page.css";

// --- Components ---
const RankIcon = ({ rank }) => {
    if (rank === 1) return <Trophy className="sl-icon-gold" />;
    if (rank === 2) return <Medal className="sl-icon-silver" />;
    if (rank === 3) return <Medal className="sl-icon-bronze" />;
    return <span className="sl-rank-text">#{rank}</span>;
};

function AdminItem({ item, index, handleAdjustScore, isFinalized, adjusting }) {
  const displayRank = item.position || (index + 1);
  const displayDeptPoints = item.points || 0;

  return (
    <div className={`sl-row ${isFinalized ? 'sl-bg-final' : 'sl-bg-dark'}`}>
      <div className="sl-col-rank">
        <RankIcon rank={displayRank} />
      </div>
      <div className="sl-col-name-admin">
        <div className="sl-participant-name">{item.display_name}</div>
        <div className="sl-participant-meta">
            <span className="sl-dept-badge">{item.branch}</span>
            {displayDeptPoints > 0 && (
                 <span className="sl-dept-pts">
                    +{displayDeptPoints} Dept Pts
                </span>
            )}
        </div>
      </div>
      <div className="sl-col-ctrl-admin">
         {/* Decrease Button */}
         <button
            onClick={() => handleAdjustScore(item.id, 'subtract')}
            disabled={isFinalized || adjusting === item.id}
            className="sl-adjust-btn"
            aria-label="Decrease score"
         >
            {adjusting === item.id ? <Loader2 size={14} className="sl-spin" /> : <Minus size={14} />}
         </button>

         <div className="sl-score-admin-box">
            <span className="sl-score-admin-val">{item.score || 0}</span>
            <span className="sl-score-admin-lbl">Score</span>
         </div>

         {/* Increase Button */}
         <button
            onClick={() => handleAdjustScore(item.id, 'add')}
            disabled={isFinalized || adjusting === item.id}
            className="sl-adjust-btn sl-plus"
            aria-label="Increase score"
         >
            {adjusting === item.id ? <Loader2 size={14} className="sl-spin" /> : <Plus size={14} />}
         </button>

         {isFinalized && <Lock size={16} style={{color: 'rgba(239, 68, 68, 0.5)', marginLeft: '0.5rem'}} />}
      </div>
    </div>
  );
}

function ReadOnlyItem({ item, index }) {
    const displayDeptPoints = item.points || 0;
    return (
        <div className={`sl-row sl-row-user ${index < 3 ? 'sl-grad-gold' : 'sl-hover-std'}`}>
            <div className="sl-col-rank">
                <RankIcon rank={item.position} />
            </div>
            <div className="sl-col-name-user">
                <div className="sl-participant-name">{item.display_name}</div>
                <div className="sl-participant-meta">
                   <span className="sl-dept-badge">{item.branch}</span>
                   {displayDeptPoints > 0 && (
                        <span className="sl-dept-pts">
                            +{displayDeptPoints} Dept Pts
                        </span>
                    )}
                </div>
            </div>
            <div className="sl-col-score-user">
                <div className="flex flex-col items-end">
                    <span className="sl-score-user-val">{item.score || 0}</span>
                    <span className="sl-score-user-lbl">Score</span>
                </div>
            </div>
        </div>
    );
}

// --- Main Page ---
export default function SportLeaderboardPage() {
  const params = useParams();
  const sportSlug = params?.slug;

  const { user, loading: authLoading } = useAuth();

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

  // Fetch all sports for switcher
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await api.get('api/sports/');
        setSports(res.data);
      } catch (err) {
        console.error('Failed to fetch sports:', err);
      } finally {
        setSportsLoading(false);
      }
    };
    fetchSports();
  }, []);

  // Fetch leaderboard data
  useEffect(() => {
    if (!sportSlug) return;

    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await api.get(`api/leaderboard/sport/${sportSlug}/`);
        // ✅ FIX: Backend now returns data sorted by position, so no need to re-sort by score
        setStandings(res.data);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
        setMsg({type: 'error', text: "Could not load leaderboard data."});
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [sportSlug]);

  // ✅ FIX: Renamed from handleAdjustPoints to handleAdjustScore (matches backend)
  const handleAdjustScore = async (id, action) => {
      setAdjusting(id);

      try {
          const res = await api.post(`api/leaderboard/result/${id}/adjust/`, { action });

          // ✅ Update only the specific item's score from backend response
          setStandings(prev => prev.map(item =>
              item.id === id ? { ...item, score: res.data.score } : item
          ));

          setMsg({type: 'success', text: res.data.message || 'Score updated successfully'});
          setTimeout(() => setMsg(null), 3000);

      } catch (err) {
          const errorMsg = err.response?.data?.error || "Failed to adjust score. Please try again.";
          setMsg({type: 'error', text: errorMsg});
          setTimeout(() => setMsg(null), 3000);

          // ✅ Refresh from backend on error to ensure consistency
          try {
              const refreshRes = await api.get(`api/leaderboard/sport/${sportSlug}/`);
              setStandings(refreshRes.data);
          } catch (refreshErr) {
              console.error('Failed to refresh data:', refreshErr);
          }
      } finally {
          setAdjusting(null);
      }
  };

  const handleSave = async () => {
    setSaving(true);

    // ✅ Sort by score (highest first), then assign positions
    const sortedByScore = [...standings].sort((a, b) => (b.score || 0) - (a.score || 0));
    const payload = sortedByScore.map((item, index) => ({
        id: item.id,
        position: index + 1  // Assign positions 1, 2, 3... based on score order
    }));

    try {
        const res = await api.put(`api/leaderboard/sport/${sportSlug}/update/`, payload);
        setStandings(res.data); // Backend returns sorted by position
        setMsg({type: 'success', text: "✅ Rankings saved! Positions assigned based on scores."});
        setTimeout(() => setMsg(null), 3000);
    } catch (err) {
        const errorMsg = err.response?.data?.error || "Failed to save rankings.";
        setMsg({type: 'error', text: errorMsg});
        setTimeout(() => setMsg(null), 3000);
    } finally {
        setSaving(false);
    }
};

  // ✅ FIX: Added unfinalize endpoint support
  const handleUnfinalize = async () => {
      if(!confirm("Are you sure you want to unfinalize? This will allow editing rankings again.")) return;

      setRefreshing(true);
      try {
          await api.post(`api/leaderboard/sport/${sportSlug}/unfinalize/`);
          setMsg({type: 'success', text: "🔓 Unlocked! You can now edit scores."});
          setTimeout(() => setMsg(null), 3000);

          // Refresh data to update finalization status
          const refreshRes = await api.get(`api/leaderboard/sport/${sportSlug}/`);
          setStandings(refreshRes.data);
      } catch(err) {
          const errorMsg = err.response?.data?.error || "Failed to unfinalize. Please try again.";
          setMsg({type: 'error', text: errorMsg});
          setTimeout(() => setMsg(null), 3000);
      } finally {
          setRefreshing(false);
      }
  };

  const handleFinalize = () => { setShowConfirmDialog('finalize'); };
  const handleReset = () => { setShowConfirmDialog('reset'); };

  const confirmFinalize = async () => {
      setShowConfirmDialog(null);
      setRefreshing(true);
      try {
          const res = await api.post(`api/leaderboard/sport/${sportSlug}/finalize/`);
          setMsg({type: 'success', text: res.data.message || "🏆 Rankings finalized!"});
          setTimeout(() => setMsg(null), 3000);

          // Refresh to get updated finalization status
          const refreshRes = await api.get(`api/leaderboard/sport/${sportSlug}/`);
          setStandings(refreshRes.data);
      } catch (err) {
          const errorMsg = err.response?.data?.error || "Failed to finalize. Please try again.";
          setMsg({type: 'error', text: errorMsg});
          setTimeout(() => setMsg(null), 3000);
      } finally {
          setRefreshing(false);
      }
  };

  const confirmReset = async () => {
      setShowConfirmDialog(null);
      setRefreshing(true);
      try {
          const res = await api.post(`api/leaderboard/sport/${sportSlug}/reset/`);
          setMsg({type: 'success', text: res.data.message || "✅ Leaderboard reset successfully!"});
          setTimeout(() => setMsg(null), 3000);

          // Refresh data after reset
          const refreshRes = await api.get(`api/leaderboard/sport/${sportSlug}/`);
          setStandings(refreshRes.data);
      } catch (err) {
          const errorMsg = err.response?.data?.error || "Failed to reset. Please try again.";
          setMsg({type: 'error', text: errorMsg});
          setTimeout(() => setMsg(null), 3000);
      } finally {
          setRefreshing(false);
      }
  };

  if (loading || authLoading) return (
      <div className="sl-loading-screen">
          <Loader2 className="sl-spin" style={{ width: 40, height: 40, color: '#3b82f6' }} />
          <p>Loading leaderboard...</p>
      </div>
  );

  const isFinalized = standings.length > 0 ? standings[0].sport_is_finalized : false;
  const sportName = standings.length > 0 ? standings[0].sport_name : sportSlug?.replace(/-/g, ' ') || 'Sport';

  const displayedStandings = isAdmin ? standings : standings.slice(0, 5);

  return (
    <div className="sl-container">
      {/* --- Confirm Dialog --- */}
      {showConfirmDialog && (
        <div className="sl-overlay">
          <div className="sl-modal">
            <h3 className="sl-modal-title">
              {showConfirmDialog === 'finalize' ? '🏆 Finalize Rankings?' : '⚠️ Reset Scores?'}
            </h3>
            <p className="sl-modal-text">
              {showConfirmDialog === 'finalize'
                ? 'Department points will be locked and counted towards the overall leaderboard. This action cannot be undone without unfinalizing first.'
                : 'All scores and positions for this sport will be reset. Rankings will return to their default order. This action cannot be undone.'}
            </p>
            <div className="sl-modal-actions">
              <button onClick={() => setShowConfirmDialog(null)} className="sl-modal-btn-cancel">Cancel</button>
              <button
                  onClick={showConfirmDialog === 'finalize' ? confirmFinalize : confirmReset}
                  className={`sl-modal-btn-confirm ${showConfirmDialog === 'finalize' ? 'sl-btn-blue' : 'sl-btn-red'}`}
              >
                {showConfirmDialog === 'finalize' ? 'Finalize' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Overlay Spinner --- */}
      {refreshing && (
        <div className="sl-overlay sl-overlay-light">
          <div className="sl-spinner-box">
            <Loader2 className="sl-spin sl-spinner-lg" />
            <p className="sl-spinner-text">Processing...</p>
          </div>
        </div>
      )}

      <div className="sl-wrapper">
        <div className="sl-back-section">
          <Link href="/auth/dashboard" className="sl-back-link">
            <ArrowLeft className="sl-back-icon" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* --- Sport Switcher --- */}
        <div className="sl-switcher-container">
          <h3 className="sl-switcher-title">Switch Sport</h3>
          {sportsLoading ? (
            <div className="flex justify-center items-center h-10">
                <Loader2 className="sl-spin" style={{width: 20, height: 20, color: '#a855f7'}} />
            </div>
          ) : sports.length > 0 ? (
            <div className="sl-switcher-grid">
              {sports.map((sport) => (
                <Link
                  key={sport.id}
                  href={sport.slug ? `/sports/leaderboard/${sport.slug}` : '#'}
                  className={`sl-sport-chip ${
                      sport.slug === sportSlug ? 'sl-chip-active' : 'sl-chip-inactive'
                  }`}
                >
                  {sport.name}
                </Link>
              ))}
            </div>
          ) : (
            <p style={{color: '#6b7280'}}>No sports available.</p>
          )}
        </div>

        {/* --- Header Controls --- */}
        <div className="sl-header-row">
            <div className="sl-title-group">
                <h1 className="sl-main-title">{sportName}</h1>
                <div className="sl-status-row">
                    <p className="sl-mode-label">
                      {isAdmin ? 'Full Standings (Admin Mode)' : 'Top 5 Rankings'}
                    </p>
                    {isFinalized ? (
                        <span className="sl-badge sl-badge-final">
                            <CheckCircle size={12}/> FINALIZED
                        </span>
                    ) : (
                        <span className="sl-badge sl-badge-draft">
                            <Loader2 size={12} className="sl-spin"/> DRAFT
                        </span>
                    )}
                </div>
            </div>

            {/* --- ADMIN ACTIONS --- */}
            {isAdmin && (
                <div className="sl-admin-toolbar">
                    {/* ✅ FIX: Changed from Unlock to Unfinalize */}
                    {isFinalized && (
                       <button onClick={handleUnfinalize} className="sl-btn sl-btn-unlock">
                          <LockOpen size={16} /> Unfinalize
                       </button>
                    )}

                    <button
                        onClick={handleReset}
                        disabled={isFinalized}
                        className="sl-btn sl-btn-reset"
                    >
                        <RotateCcw size={16} /> Reset
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={isFinalized || saving}
                        className="sl-btn sl-btn-save"
                    >
                        {saving ? <><Loader2 size={16} className="sl-spin" /> Saving...</> : 'Save Positions'}
                    </button>

                    <button
                        onClick={handleFinalize}
                        disabled={isFinalized}
                        className={`sl-btn ${isFinalized ? 'sl-btn-distributed' : 'sl-btn-finalize'}`}
                    >
                        {isFinalized ? <><CheckCircle size={16} /> Finalized</> : 'Finalize'}
                    </button>
                </div>
            )}
        </div>

        {/* --- Messages --- */}
        {msg && (
            <div className={`sl-msg ${msg.type === 'error' ? 'sl-msg-error' : 'sl-msg-success'}`}>
                {msg.text}
            </div>
        )}

        {/* --- Table --- */}
        <div className="sl-table-card">
             <div className="sl-table-head">
                <div className="sl-col-rank">Rank</div>
                <div className={`${isAdmin ? 'sl-col-name-admin' : 'sl-col-name-user'}`}>Participant & Dept</div>
                <div className={`${isAdmin ? 'sl-col-ctrl-admin' : 'sl-col-score-user'}`}>
                    Score{isAdmin ? ' / Control' : ''}
                </div>
            </div>

            {standings.length === 0 ? (
                <div className="sl-empty-msg">No participants yet. Registrations will appear here automatically.</div>
            ) : isAdmin ? (
                // ✅ ADMIN VIEW (With Controls)
                <div className="sl-row-group">
                    {standings.map((item, index) => (
                        <AdminItem
                            key={item.id}
                            item={item}
                            index={index}
                            handleAdjustScore={handleAdjustScore}
                            isFinalized={isFinalized}
                            adjusting={adjusting}
                        />
                    ))}
                </div>
             ) : (
                // ❌ USER VIEW (ReadOnly)
                <div className="sl-row-group">
                    {displayedStandings.map((item, index) => (
                        <ReadOnlyItem key={item.id} item={item} index={index} />
                    ))}

                    {standings.length > 5 && (
                        <div className="sl-show-more">
                            Showing top 5 participants. {standings.length - 5} more hidden.
                        </div>
                    )}
                </div>
             )}
        </div>
      </div>
    </div>
  );
}