"use client";
import { useState, useEffect } from "react";
import api from "@/api/api";

export default function TeamForm({ onSubmit, submitLabel = "Submit", initial = {} }) {
  const [name, setName] = useState(initial.name || "");
  const [branch, setBranch] = useState(initial.branch || "COMPS");
  const [sportId, setSportId] = useState(initial.sport_id || "");
  const [memberIds, setMemberIds] = useState(initial.member_ids || []);
  const [captainId, setCaptainId] = useState(initial.captain_id || "");
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchSports() {
      try {
        setLoading(true);
        const res = await api.get("api/sports/");
        if (mounted) setSports(res.data);
      } catch (e) {
        console.error(e);
        if (mounted) setError("Failed to load sports");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchSports();
    return () => (mounted = false);
  }, []);

  function addMemberId() {
    const id = prompt("Enter user id (pk) to add as member");
    if (!id) return;
    setMemberIds((prev) => [...prev, Number(id)]);
  }

  function removeMemberId(id) {
    setMemberIds((prev) => prev.filter((m) => m !== id));
  }

  async function submit(e) {
    e.preventDefault();
    const payload = {
      name,
      branch,
      sport_id: Number(sportId),
      member_ids: memberIds,
      ...(captainId ? { captain_id: Number(captainId) } : {}),
    };
    await onSubmit(payload);
  }

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <form onSubmit={submit} style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: 8, borderRadius: 4 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Branch</label>
        <select
          className="bg-black text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          style={{ width: "100%", padding: 8, borderRadius: 4 }}
        >
          <option value="COMPS">Computer Engineering</option>
          <option value="IT">Information Technology</option>
          <option value="AIML">CSE AI/ML</option>
          <option value="DS">CSE Data Science</option>
          <option value="MECH">Mechanical Engineering</option>
          <option value="CIVIL">Civil Engineering</option>
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Sport</label>
        <select
          className="bg-black text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 rounded-md"
          value={sportId}
          onChange={(e) => setSportId(e.target.value)}
          required
          style={{ width: "100%", padding: 8, borderRadius: 4 }}
          disabled={loading}
        >
          <option value="">Select sport</option>
          {sports.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Members</label>
        <button type="button" onClick={addMemberId} style={{ padding: "6px 12px", marginBottom: 8 }}>
          Add member by id
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {memberIds.map((m) => (
            <li
              key={m}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 6,
                border: "1px solid #ddd",
                marginBottom: 4,
                borderRadius: 4,
              }}
            >
              <span>User ID: {m}</span>
              <button type="button" onClick={() => removeMemberId(m)} style={{ cursor: "pointer" }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", marginBottom: 4 }}>Captain (user id, optional)</label>
        <input
          value={captainId}
          onChange={(e) => setCaptainId(e.target.value)}
          placeholder="Leave empty for manager to be captain"
          style={{ width: "100%", padding: 8, borderRadius: 4 }}
        />
      </div>
      <div>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
