//In order to fetch username in current session authentication from Local Storage , we use JWT Decode

import jwt_decode from "jwt-decode";

// Extract current username from JWT access token in localStorage
export function getCurrentUsername() {
  const token = localStorage.getItem("access");
  if (!token) return null;
  try {
    const decoded = jwt_decode(token);
    return decoded.username || decoded.user_id || decoded.sub || null;
  } catch {
    return null;
  }
}
