"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Trophy,
  Medal,
  Crown,
  Loader2,
  AlertCircle,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import api from "@/api/api";


import "./page.css";

const BRANCH_NAMES = {
  'COMPS': 'Computer Engineering',
  'IT': 'Information Technology',
  'AIML': 'CSE AI/ML',
  'DS': 'CSE Data Science',
  'MECH': 'Mechanical Engineering',
  'CIVIL': 'Civil Engineering',
};

const getRankIcon = (index) => {
  if (index === 0) return <Crown className="lb-icon-crown" />;
  if (index === 1) return <Medal className="lb-icon-silver" />;
  if (index === 2) return <Medal className="lb-icon-bronze" />;
  return <span className="lb-rank-text">#{index + 1}</span>;
};

export default function DepartmentLeaderboardPage() {
  const router = useRouter();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sports, setSports] = useState([]);
  const [sportsLoading, setSportsLoading] = useState(true);

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

  const handleSportSelect = (sport) => {
    if (sport.slug) {
      router.push(`/sports/leaderboard/${sport.slug}`);
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('api/leaderboard/department/');
        setStandings(res.data);   
        console.log({standingsDAta : res.data});
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
    <div className="lb-container">
      <div className="lb-content-wrapper">

        {/* Go to Dashboard Button */}
        <div className="lb-back-wrapper">
          <Link href="/auth/dashboard" className="lb-back-link">
            <ArrowLeft className="lb-back-icon" />
            <span>Go to Dashboard</span>
          </Link>
        </div>

        {/* Header */}
        <div className="lb-header-section">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lb-title"
          >
            CHAMPIONSHIP
          </motion.h1>
          <p className="lb-subtitle">Department Standings 2025-26</p>
        </div>

        {/* Sports Selector */}
        <div className="lb-sports-section">
          <h2 className="lb-sports-title">View Sport-Specific Leaderboard</h2>

          {sportsLoading ? (
            <div className="lb-loader-wrapper">
              <Loader2 className="lb-spinner lb-spinner-purple" />
            </div>
          ) : sports.length > 0 ? (
            <div className="lb-sports-grid">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportSelect(sport)}
                  className="lb-sport-btn"
                >
                  <span className="lb-sport-name">{sport.name}</span>
                  <ChevronRight className="lb-chevron" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No sports available.</p>
          )}
        </div>

        {/* Standings List */}
        {loading ? (
          <div className="lb-loading-container">
            <Loader2 className="lb-spinner lb-spinner-blue" />
          </div>
        ) : error ? (
          <div className="lb-error">
            <AlertCircle className="w-6 h-6 mr-3" /> {error}
          </div>
        ) : standings.length === 0 ? (
          <div className="lb-empty">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <p>No finalized points awarded yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="lb-table-header">
              <div className="lb-col-rank">Rank</div>
              <div className="lb-col-dept">Department</div>
              <div className="lb-col-points">Points</div>
            </div>

            {/* Rows */}
            {standings && standings.map((dept, index) => (
              <motion.div
                key={dept.branch}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                // Conditional class for 1st place vs others
                className={`lb-rank-row ${
                  index === 0 ? 'lb-row-first' : 'lb-row-standard'
                }`}
              >
                <div className="lb-col-rank">
                  {getRankIcon(index)}
                </div>
                <div className="lb-col-dept">
                  <h3 className={`lb-dept-title ${
                      index === 0 ? 'lb-text-gold' : 'lb-text-gray'
                  }`}>
                    {dept.branch}
                  </h3>
                  <p className="lb-dept-sub">
                    {BRANCH_NAMES[dept.branch]}
                  </p>
                </div>
                <div className="lb-col-points">
                  <span className={`lb-pts-val ${
                      index === 0 ? 'lb-pts-gold' : 'lb-pts-white'
                  }`}>
                    {dept.total_points}
                  </span>
                  <span className="lb-pts-label">PTS</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}