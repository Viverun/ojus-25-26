"use client";
import { useState } from "react";
import api from "@/api/api"; // Your axios instance with JWT

export default function AdminRegistrationSearch() {
  const [moodleID, setMoodleID] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const res = await api.get(`/api/registration-search/${moodleID}/`);
      setResult(res.data);
    } catch (err) {
      setError("No user found or you do not have admin access.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Enter Moodle ID"
          value={moodleID}
          onChange={(e) => setMoodleID(e.target.value)}
          className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 w-64"
          required
        />
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg transition-all"
        >
          Search
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      {result && (
        <div className="bg-neutral-900 p-6 mt-4 rounded-xl border border-purple-700 w-full max-w-6xl">
          <h2 className="mb-4 text-purple-400 font-bold text-xl">
            Registrations for {result.username} ({result.moodleID})
          </h2>
          {result.registrations.length ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-neutral-800 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-neutral-900 border-b-2 border-purple-700">
                    <th className="p-3 text-left font-semibold text-purple-400">Sport</th>
                    <th className="p-3 text-left font-semibold text-purple-400">Year</th>
                    <th className="p-3 text-left font-semibold text-purple-400">Branch</th>
                    <th className="p-3 text-left font-semibold text-purple-400">Team Based</th>
                    <th className="p-3 text-left font-semibold text-purple-400">Primary Coordinator</th>
                    <th className="p-3 text-left font-semibold text-purple-400">Registered On</th>
                  </tr>
                </thead>
                <tbody>
                  {result.registrations.map((reg) => (
                    <tr
                      key={reg.id}
                      className="border-b border-neutral-700 hover:bg-neutral-750 transition-colors"
                    >
                      <td className="p-3">{reg.sport.name}</td>
                      <td className="p-3">{reg.year}</td>
                      <td className="p-3">{reg.branch}</td>
                      <td className="p-3">{reg.sport.isTeamBased ? "Yes" : "No"}</td>
                      <td className="p-3">{reg.sport.primary.username}</td>
                      <td className="p-3">{new Date(reg.registered_on).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No registrations found for this user.</div>
          )}
        </div>
      )}
    </div>
  );
}