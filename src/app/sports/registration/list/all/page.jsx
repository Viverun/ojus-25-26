//Listing out all the registrations using drop-down menu
"use client";
import React, { useEffect, useState } from "react";
import api from "@/api/api";

// Hardcoded example, eventually fetch from backend if you want
const AVAILABLE_SPORTS = [
  { slug: "chess-masters", name: "Chess Masters" },
  { slug: "valorant-tournament", name: "Valorant Tournament" },
  { slug: "table-tennis-championship", name: "Table Tennis Championship" },
    {slug: "badminton-singles", name: "Badminton Singles" },
  // add more sports here as needed
];

export default function RegistrationsAllTest() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSport, setSelectedSport] = useState(AVAILABLE_SPORTS[0].slug);

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

  return (
    <div>
      <h2>Testing Registrations for: {selectedSport}</h2>
      <select
  value={selectedSport}
  onChange={e => setSelectedSport(e.target.value)}
  style={{
    marginBottom: "1rem",
    backgroundColor: "#222",
    color: "#fff",
    border: "1px solid #444",
    padding: "0.5rem",
    borderRadius: "8px",
  }}
>
  {AVAILABLE_SPORTS.map(sport => (
    <option
      key={sport.slug}
      value={sport.slug}
      style={{
        backgroundColor: "#222",
        color: "#fff",
      }}
    >
      {sport.name}
    </option>
  ))}
</select>

      {loading ? (
  <div>Loading...</div>
) : registrations.length ? (
  <div>
    {registrations.map((reg) => (
      <div
        key={reg.id}
        style={{
          background: "#282828",
          color: "#fff",
          borderRadius: "10px",
          marginBottom: "1rem",
          padding: "1rem",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h3 style={{marginBottom: "0.5rem"}}>{reg.sport.name} ({reg.year} - {reg.branch})</h3>
        <p>
          <strong>Student:</strong> {reg.student.username} ({reg.student.moodleID})
        </p>
        <p>
          <strong>Email:</strong> {reg.student.email}
        </p>
        <p>
          <strong>Team Based:</strong> {reg.sport.isTeamBased ? "Yes" : "No"}
        </p>
        {/*<p>*/}
        {/*  <strong>Primary Coordinator:</strong> {reg.sport.primary.username}*/}
        {/*</p>*/}
          <p>
          <p>
          <strong>Registered On:</strong> {new Date(reg.registered_on).toLocaleString()}
        </p></p>
        {/*<p>*/}
        {/*  <strong>Last Modified:</strong> {new Date(reg.registration_modified).toLocaleString()}*/}
        {/*</p>*/}
      </div>
    ))}
  </div>
) : (
  <div>No registrations found.</div>
)}
        </div>
  );

}
