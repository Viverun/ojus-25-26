import Navbar from "@/myComponents/Navbar";
import "./globals.css";

import { SmoothCursor } from "@/components/ui/smooth-cursor";

export const metadata = {
  title: "Ojus 2025",
  description: "Made by the Ojus Tech Team 26",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white overflow-x-hidden">
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
