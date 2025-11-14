"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/api/api";

export default function RegistrationDetailPage() {
	const params = useParams();
	const id = params?.id;
	const [registration, setRegistration] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;
		let mounted = true;

		async function fetchRegistration() {
			setLoading(true);
			setError(null);
			try {
				const res = await api.get(`/api/registrations/${id}/`);
				if (mounted) setRegistration(res.data);
			} catch (err) {
				if (mounted) setError(err);
			} finally {
				if (mounted) setLoading(false);
			}
		}

		fetchRegistration();
		return () => {
			mounted = false;
		};
	}, [id]);

	if (!id) {
		return <div style={{ padding: "1rem" }}>No registration id provided.</div>;
	}

	return (
		<div style={{ padding: "1rem" }}>
			<h2>Registration detail: {id}</h2>

			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div style={{ color: "#f33" }}>Error loading registration.</div>
			) : !registration ? (
				<div>No registration found for id {id}.</div>
			) : (
				<div
					style={{
						maxWidth: 960,
						backgroundColor: "#282828",
						color: "#fff",
						padding: "1rem",
						borderRadius: 12,
						boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
					}}
				>
					<h3 style={{ marginTop: 0 }}>{registration.sport?.name || "-"}</h3>

					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
						<InfoRow label="Student Name" value={registration.student?.username} />
						<InfoRow label="Moodle ID" value={registration.student?.moodleID} />
						<InfoRow label="Email" value={registration.student?.email} />
						<InfoRow label="Year" value={registration.year} />
						<InfoRow label="Branch" value={registration.branch} />
						<InfoRow label="Team Based" value={registration.sport?.isTeamBased ? "Yes" : "No"} />
						<InfoRow
							label="Registered On"
							value={registration.registered_on ? new Date(registration.registered_on).toLocaleString() : "-"}
						/>
						<InfoRow label="Registration ID" value={registration.id} />
					</div>

					{registration.notes ? (
						<div style={{ marginTop: "1rem" }}>
							<h4>Notes</h4>
							<div style={{ whiteSpace: "pre-wrap" }}>{registration.notes}</div>
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}

function InfoRow({ label, value }) {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div style={{ fontSize: "0.75rem", color: "#bbb", marginBottom: 4 }}>{label}</div>
			<div style={{ fontSize: "1rem" }}>{value ?? "-"}</div>
		</div>
	);
}
