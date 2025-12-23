"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Search, Loader2, Trophy, Calendar, User, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import api from '@/api/api';

export default function UserRegistrationSearchPage() {
  const [moodleID, setMoodleID] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!moodleID || moodleID.trim() === '') {
      setError('Please enter a Moodle ID');
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const res = await api.get(`api/registration-search/${moodleID.trim()}/`);
      setUserData(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Student not found. Please check the Moodle ID.');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch registrations. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMoodleID('');
    setUserData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/auth/dashboard"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 mb-2">
            Student Registration Lookup
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Search for a student's sports registrations using their Moodle ID
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={moodleID}
                onChange={(e) => setMoodleID(e.target.value)}
                placeholder="Enter Moodle ID (e.g., 24102115)"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Search
                </>
              )}
            </button>
            {userData && (
              <button
                type="button"
                onClick={handleClear}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {/* User Data Card */}
        {userData && (
          <div className="space-y-6">
            {/* Student Info Card */}
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{userData.username}</h2>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Mail size={14} />
                    <span>Moodle ID: {userData.moodleID}</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-medium">Total Registrations</span>
                  <span className="text-2xl font-bold text-purple-400">{userData.registrations.length}</span>
                </div>
              </div>
            </div>

            {/* Registrations List */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Trophy size={24} className="text-yellow-400" />
                Sport Registrations
              </h3>

              {userData.registrations.length === 0 ? (
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-12 text-center">
                  <Trophy size={48} className="mx-auto mb-4 text-gray-700" />
                  <p className="text-gray-500 text-lg">No registrations found for this student.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userData.registrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-white">
                              {registration.sport?.name || 'Unknown Sport'}
                            </h4>
                            <CheckCircle size={20} className="text-green-400" />
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                              <span className="text-gray-400">Year:</span>
                              <span className="text-white font-semibold">{registration.year}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                              <span className="text-gray-400">Branch:</span>
                              <span className="text-white font-semibold">{registration.branch}</span>
                            </div>
                            {registration.sport?.isTeamBased !== undefined && (
                              <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                                <span className="text-gray-400">Type:</span>
                                <span className="text-white font-semibold">
                                  {registration.sport.isTeamBased ? 'Team Sport' : 'Individual Sport'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Calendar size={14} />
                            <span>
                              Registered: {new Date(registration.registered_on).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          {registration.sport?.slug && (
                            <Link
                              href={`/sports/leaderboard/${registration.sport.slug}`}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all"
                            >
                              View Leaderboard
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Card - Show when no search has been made */}
        {!userData && !loading && !error && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
            <Search size={48} className="mx-auto mb-4 text-gray-700" />
            <h3 className="text-xl font-bold text-white mb-2">Search for a Student</h3>
            <p className="text-gray-400">
              Enter a Moodle ID above to view all sports registrations for that student.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


