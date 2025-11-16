//Listing out all the registrations using drop-down menu
"use client";
import React, { useEffect, useState } from "react";
import api from "@/api/api";

// hardcoded example
const AVAILABLE_SPORTS = [
  { slug: "chess-masters", name: "Chess Masters" },
  { slug: "valorant-tournament", name: "Valorant Tournament" },
  { slug: "table-tennis-championship", name: "Table Tennis Championship" },
  { slug: "badminton-singles", name: "Badminton Singles" },
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
    <div style={{ padding: "1rem" }}>
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
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#282828",
              color: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#1a1a1a" }}>
                <th style={tableHeaderStyle}>Sport</th>
                <th style={tableHeaderStyle}>Student Name</th>
                <th style={tableHeaderStyle}>Moodle ID</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Year</th>
                <th style={tableHeaderStyle}>Branch</th>
                <th style={tableHeaderStyle}>Team Based</th>
                <th style={tableHeaderStyle}>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr
                  key={reg.id}
                  style={{
                    borderBottom: "1px solid #444",
                  }}
                >
                  <td style={tableCellStyle}>{reg.sport.name}</td>
                  <td style={tableCellStyle}>{reg.student.username}</td>
                  <td style={tableCellStyle}>{reg.student.moodleID}</td>
                  <td style={tableCellStyle}>{reg.student.email}</td>
                  <td style={tableCellStyle}>{reg.year}</td>
                  <td style={tableCellStyle}>{reg.branch}</td>
                  <td style={tableCellStyle}>
                    {reg.sport.isTeamBased ? "Yes" : "No"}
                  </td>
                  <td style={tableCellStyle}>
                    {new Date(reg.registered_on).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No registrations found.</div>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  padding: "0.75rem 1rem",
  textAlign: "left",
  fontWeight: "600",
  borderBottom: "2px solid #444",
};

const tableCellStyle = {
  padding: "0.75rem 1rem",
  textAlign: "left",
};