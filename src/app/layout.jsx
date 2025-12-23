import Navbar from "@/myComponents/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export const metadata = {
  title: "Ojus 2026",
  description: "Made by the Ojus Tech Team 26",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white overflow-x-hidden">
        <AuthProvider>
          <SmoothCursor />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
