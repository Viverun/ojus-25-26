//Filter out the registrations done by the user
"use client";
import React, { useState, useEffect } from "react";
import api from "@/api/api";

// Adjust this to get username from auth/session/store
const DEFAULT_USERNAME = "TestStudent";

export default function Page() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = DEFAULT_USERNAME; // Replace with logic to get currently logged-in user

  useEffect(() => {
    async function fetchUserInfo() {
      setLoading(true);
      try {
        const res = await api.get(`/api/user-registration-info/${username}/`);
        setUserInfo(res.data);
      } catch (err) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, [username]);

  return (
    <div>
      <h2>
        {userInfo ? `${userInfo.username} (${userInfo.moodleID})` : "User Registered Sports"}
      </h2>
      {loading ? (
        <div>Loading...</div>
      ) : userInfo ? (
        userInfo.registrations.length ? (
          userInfo.registrations.map(reg => (
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
              <h4>{reg.sport.name} ({reg.year} - {reg.branch})</h4>
              <p>
                <strong>Team Based:</strong> {reg.sport.isTeamBased ? "Yes" : "No"}
              </p>
              <p>
                <strong>Primary Coordinator:</strong> {reg.sport.primary.username}
              </p>
              <p>
                <strong>Registered On:</strong> {new Date(reg.registered_on).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div>No registrations found for this user.</div>
        )
      ) : (
        <div>User not found.</div>
      )}
    </div>
  );
}
