//Listing out all the registrations using drop-down menu
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// hardcoded example
const AVAILABLE_SPORTS = [
  { slug: "chess-masters", name: "Chess Masters" },
  { slug: "valorant-tournament", name: "Valorant Tournament" },
  { slug: "table-tennis-championship", name: "Table Tennis Championship" },
  { slug: "badminton-singles", name: "Badminton Singles" },
];

export default function RegistrationsAllTest() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState(AVAILABLE_SPORTS[0].slug);
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    async function fetchRegs() {
      setLoading(true);
      try {
        const res = await api.get(`/api/registrations/sport/${selectedSport}/`);
        setRegistrations(res.data);
      } catch (err) {
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRegs();
  }, [selectedSport]);

  // Check if user has is_managing permission
  if (!authLoading && (!isAuthenticated || !user)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center text-red-400 text-lg">You must be logged in to view this page.</div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-purple-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user?.is_managing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center text-red-400 text-lg">You don't have permission to view all registrations. Only managers can access this page.</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/sports" className="text-purple-400 hover:text-purple-300 text-sm mb-4 inline-block">
            ← Back to Sports
          </Link>
          <h1 className="text-5xl md:text-6xl font-black mb-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            REGISTRATIONS
          </h1>
          <p className="text-gray-400 text-lg">Manager view - All registrations by sport</p>
        </div>

        {/* Sport Filter */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-purple-400 mb-3 uppercase tracking-wide">Select Sport</label>
          <select
            value={selectedSport}
            onChange={e => setSelectedSport(e.target.value)}
            className="w-full md:w-80 bg-gray-900 border-2 border-purple-500/40 text-white px-4 py-3 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
          >
            {AVAILABLE_SPORTS.map(sport => (
              <option key={sport.slug} value={sport.slug}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>

        {/* Registrations Grid */}
        <div>
          <h2 className="text-2xl font-bold text-purple-400 mb-6 uppercase tracking-wide">
            Registrations - {AVAILABLE_SPORTS.find(s => s.slug === selectedSport)?.name}
          </h2>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading registrations...</div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">No registrations found for this sport.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="relative p-px bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg hover:from-purple-600/40 hover:to-purple-800/40 transition-all"
                >
                  <div className="relative bg-gray-900 border border-purple-500/30 p-6 rounded-lg hover:border-purple-500/60 transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Student</p>
                        <p className="font-bold text-purple-400">{reg.student?.username}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Moodle ID</p>
                        <p className="font-semibold text-white">{reg.student?.moodleID}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Year / Branch</p>
                        <p className="font-semibold text-white">{reg.year} - {reg.branch}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Registered</p>
                        <p className="font-semibold text-white">{new Date(reg.registered_on).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
