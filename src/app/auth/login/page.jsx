// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import api from "@/api/api";
//
// export default function LoginPage() {
//   const [moodleID, setMoodleID] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); //
//   const router = useRouter();
//
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//
//     try {
//       const res = await api.post("auth/login/", { moodleID, password });
//
//       const accessToken = res.data.access;
//       localStorage.setItem("access", accessToken);
//       localStorage.setItem("refresh", res.data.refresh);
//
//       api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//
//       const profileRes = await api.get("auth/me/");
//     router.replace("/auth/dashboard");
//     } catch (err) {
//       console.error(err);
//
//       if (err.response && err.response.data) {
//         setError(err.response.data.detail || "Invalid credentials.");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
//       <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-lg p-8 border border-purple-700">
//         <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Student Login</h1>
//         <form onSubmit={handleLogin} className="flex flex-col gap-5">
//           <input
//             type="text"
//             placeholder="Moodle ID"
//             value={moodleID}
//             onChange={(e) => setMoodleID(e.target.value)}
//             className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 outline-none"
//             required
//             disabled={loading} // Disable input while loading
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 outline-none"
//             required
//             disabled={loading}
//           />
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//
//           <button
//             type="submit"
//             disabled={loading} // Disable button while loading
//             className={`font-semibold py-2 rounded-lg transition-all ${
//               loading
//                 ? "bg-purple-900 text-gray-400 cursor-not-allowed"
//                 : "bg-purple-700 hover:bg-purple-800 text-white"
//             }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//
//         <p className="text-center text-sm text-gray-400 mt-4">
//           Don’t have an account?{" "}
//           <Link href="/signup" className="text-purple-400 hover:text-purple-300 underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
//


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/api/api";

export default function LoginPage() {
  const [moodleID, setMoodleID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("Attempting login for:", moodleID);
      const res = await api.post("auth/login/", { moodleID, password });
      console.log("Login response received");

      const accessToken = res?.data?.access;
      if (!accessToken) {
        setError("Login failed: no access token returned.");
        setLoading(false);
        return;
      }

      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", res.data.refresh || "");
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Fetch and store user profile
      console.log("Fetching user profile...");
      const profileRes = await api.get("auth/me/");
      console.log("Profile fetched successfully");
      localStorage.setItem("user", JSON.stringify(profileRes.data));

      // Navigate to dashboard - use window.location for reliable redirect
      console.log("Redirecting to dashboard...");
      if (typeof window !== "undefined") {
        window.location.href = "/auth/dashboard";
      } else {
        // Fallback for SSR (shouldn't happen in form submission)
        router.push("/auth/dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);
      if (err?.response?.data) {
        setError(err.response.data.detail || "Invalid credentials.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl shadow-lg p-8 border border-purple-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">
          Student Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Moodle ID"
            value={moodleID}
            onChange={(e) => setMoodleID(e.target.value)}
            className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 outline-none"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:border-purple-500 outline-none"
            required
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`font-semibold py-2 rounded-lg transition-all ${
              loading
                ? "bg-purple-900 text-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

         
      </div>
    </div>
  );
}