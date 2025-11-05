"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/auth");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await api.get("auth/me/");
        setUser(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
        router.push("/auth");
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  if (!user)
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-purple-400">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <div className="bg-neutral-900 p-8 rounded-2xl shadow-lg border border-purple-700 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-purple-400 mb-4">
          Welcome, {user.first_name || "Student"}!
        </h1>
        <p className="text-gray-300 mb-2">Moodle ID: {user.moodleID}</p>
        <p className="text-gray-300 mb-4">Email: {user.email || "Not provided"}</p>

        <button
          onClick={handleLogout}
          className="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
