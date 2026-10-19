import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/JTG/Navbar";
import Footer from "@/components/JTG/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-landing-bg flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}