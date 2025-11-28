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

  // for the add captain id input to hold temp string before adding to actual members array
  const [memberInput, setMemberInput] = useState("");

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
    <form
      onSubmit={submit}
      data-theme="cupcake"
      className="max-w-[720px] mx-auto p-8 rounded-2xl shadow-2xl bg-base-200/60 backdrop-blur-lg space-y-8 border border-base-300"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Team Registration</h2>

      {/* Name */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Name</span>
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input input-bordered w-full input-primary"
          placeholder="Enter your full name"
        />
      </div>

      {/* Row: Branch + Sport */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Branch */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Branch</span>
          </label>

          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="select select-bordered w-full select-primary"
          >
            <option value="COMPS">Computer Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="AIML">CSE AI/ML</option>
            <option value="DS">CSE Data Science</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
          </select>
        </div>

        {/* Sport */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Sport</span>
          </label>

          <select
            value={sportId}
            onChange={(e) => setSportId(e.target.value)}
            required
            disabled={loading}
            className="select select-bordered w-full select-primary"
          >
            <option value="">Select a sport</option>

            {sports.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Members */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Team Members</span>
        </label>

        {/* Input replacing prompt() */}
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            placeholder="Enter user ID (pk)"
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            className="input input-bordered w-full input-secondary"
          />

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (!memberInput.trim()) return;
              setMemberIds((prev) => [...prev, Number(memberInput)]);
              setMemberInput(""); // clear input
            }}
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {memberIds.map((m) => (
            <li
              key={m}
              className="flex justify-between items-center p-3 rounded-lg bg-base-100 border border-base-300 shadow-sm"
            >
              <span className="text-sm font-medium">User ID: {m}</span>
              <button type="button" onClick={() => removeMemberId(m)} className="btn btn-error btn-xs">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Captain */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Captain (optional)</span>
        </label>

        <input
          value={captainId}
          onChange={(e) => setCaptainId(e.target.value)}
          placeholder="Leave empty to auto-assign"
          className="input input-bordered w-full input-accent"
        />
      </div>

      {/* Submit */}
      <button type="submit" className="btn btn-primary w-full text-lg mt-4">
        {submitLabel}
      </button>
    </form>
  );
}
