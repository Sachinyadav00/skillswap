import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-100 to-pink-100" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-white/70 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 bg-transparent">
        <Navbar />
        <main className="min-h-[80vh]">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* Toasts */}
    </div>
  );
};

export default MainLayout;
