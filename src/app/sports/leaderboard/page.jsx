"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Trophy, Medal, Crown, Loader2, AlertCircle, ChevronRight } from "lucide-react";

// --- CONFIGURATION ---
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const BRANCH_NAMES = {
    'COMPS': 'Computer Engineering',
    'IT': 'Information Technology',
    'AIML': 'CSE AI/ML',
    'DS': 'CSE Data Science',
    'MECH': 'Mechanical Engineering',
    'CIVIL': 'Civil Engineering',
};

const getRankIcon = (index) => {
    if (index === 0) return <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400" />;
    if (index === 1) return <Medal className="w-8 h-8 text-gray-300 fill-gray-300" />;
    if (index === 2) return <Medal className="w-8 h-8 text-amber-600 fill-amber-600" />;
    return <span className="font-bold text-gray-500 text-xl">#{index + 1}</span>;
};

export default function DepartmentLeaderboardPage() {
  const router = useRouter();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sports, setSports] = useState([]);
  const [sportsLoading, setSportsLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState('');

  // Fetch sports list
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/sports/`);
        if (!res.ok) throw new Error('Failed to fetch sports');
        const data = await res.json();
        setSports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setSportsLoading(false);
      }
    };
    fetchSports();
  }, []);

  const handleSportSelect = (sport) => {
    if (sport.slug) {
      router.push(`/sports/leaderboard/${sport.slug}`);
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
        try {
            // CRITICAL: Fetches points ONLY from FINALIZED sports on the backend
            const res = await fetch(`${API_BASE_URL}/api/leaderboard/department/`);
            if (!res.ok) throw new Error('Failed to fetch leaderboard data');
            const data = await res.json();
            setStandings(data);
        } catch (err) {
            console.error(err);
            setError("Unable to load department standings.");
        } finally {
            setLoading(false);
        }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
            >
            CHAMPIONSHIP
            </motion.h1>
            <p className="text-gray-400 text-lg uppercase tracking-widest">Department Standings 2025-26</p>
        </div>

        {/* Sports Selector Section */}
        <div className="mb-12 border border-purple-500/30 rounded-lg p-8 bg-purple-500/5 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">View Sport-Specific Leaderboard</h2>
          {sportsLoading ? (
            <div className="flex justify-center items-center h-12">
              <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
            </div>
          ) : sports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportSelect(sport)}
                  className="flex items-center justify-between p-4 bg-gray-900 border border-purple-500/30 hover:border-purple-500/60 rounded-lg hover:bg-gray-800 transition-all duration-300 group"
                >
                  <span className="font-semibold text-gray-300 group-hover:text-purple-400 transition-colors">{sport.name}</span>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No sports available.</p>
          )}
        </div>

        {/* Department Standings */}
        {loading ? (
             <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
             </div>
          ) : error ? (
            <div className="flex items-center justify-center p-8 bg-red-950/30 border border-red-900 rounded-2xl text-red-400">
                <AlertCircle className="w-6 h-6 mr-3" /> {error}
            </div>
          ) : standings.length === 0 ? (
            <div className="text-center p-12 bg-gray-900/50 rounded-3xl border border-gray-800">
                <Trophy className="w-16 h-16 mx-auto text-gray-700 mb-4" />
                <p className="text-gray-500">No finalized points awarded yet. Finalized sports will contribute here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2 text-center">Rank</div>
                <div className="col-span-7">Department</div>
                <div className="col-span-3 text-right">Points</div>
              </div>

              {/* Rows */}
              {standings.map((dept, index) => (
                <motion.div
                  key={dept.branch}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid grid-cols-12 items-center gap-4 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${
                    index === 0 
                        ? 'bg-gradient-to-r from-yellow-900/20 to-transparent border-yellow-700/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]' 
                        : 'bg-gray-900/40 border-gray-800 hover:bg-gray-800/60'
                  }`}
                >
                  <div className="col-span-2 flex justify-center items-center">
                    {getRankIcon(index)}
                  </div>
                  <div className="col-span-7">
                    <h3 className={`text-xl md:text-2xl font-bold ${index === 0 ? 'text-yellow-100' : 'text-gray-200'}`}>
                        {dept.branch}
                    </h3>
                    <p className="text-sm text-gray-500 hidden md:block">{BRANCH_NAMES[dept.branch]}</p>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className={`text-3xl font-black font-mono ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                      {dept.total_points}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">PTS</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}