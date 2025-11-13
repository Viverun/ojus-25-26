"use client";
import React, { useState, useEffect } from "react";
import api from "@/api/api";
import { useRouter } from "next/navigation";

export default function Page() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get username from user profile in localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.replace("/auth");
      return;
    }
    api.get(`/api/user-registration-info/${username}/`)
      .then(res => setUserInfo(res.data))
      .catch(() => setUserInfo(null))
      .finally(() => setLoading(false));
  }, [username, router]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>
        {userInfo ? `${userInfo.username} (${userInfo.moodleID})` : "User Registered Sports"}
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : userInfo ? (
        userInfo.registrations.length ? (
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
                marginTop: "1rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#1a1a1a" }}>
                  <th style={tableHeaderStyle}>Sport</th>
                  <th style={tableHeaderStyle}>Year</th>
                  <th style={tableHeaderStyle}>Branch</th>
                  <th style={tableHeaderStyle}>Team Based</th>
                  <th style={tableHeaderStyle}>Primary Coordinator</th>
                  <th style={tableHeaderStyle}>Registered On</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    style={{
                      borderBottom: "1px solid #444",
                    }}
                  >
                    <td style={tableCellStyle}>{reg.sport.name}</td>
                    <td style={tableCellStyle}>{reg.year}</td>
                    <td style={tableCellStyle}>{reg.branch}</td>
                    <td style={tableCellStyle}>
                      {reg.sport.isTeamBased ? "Yes" : "No"}
                    </td>
                    <td style={tableCellStyle}>{reg.sport.primary.username}</td>
                    <td style={tableCellStyle}>
                      {new Date(reg.registered_on).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No registrations found for this user.</div>
        )
      ) : (
        <div>User not found.</div>
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