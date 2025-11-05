"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function LoginPage() {
  const [moodleID, setMoodleID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("auth/login/", { moodleID, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const profileRes = await api.get("auth/me/");
      localStorage.setItem("user", JSON.stringify(profileRes.data));

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid Moodle ID or Password.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-lg p-8 border border-purple-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Student Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Moodle ID"
            value={moodleID}
            onChange={(e) => setMoodleID(e.target.value)}
            className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 outline-none"
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-400 hover:text-purple-300 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
