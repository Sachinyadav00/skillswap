import React, { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux-store/slices/user"; // import logout action
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      // Clear user state instantly
      dispatch(logout());

      // Call backend to end session
      await axiosInstance.get("/api/v1/users/logout");

      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header>
      <nav className="p-4 h-18 w-full flex justify-between items-center font-sans shadow-sm">
        {/* Logo */}
        <div className="flex gap-2 justify-center items-center">
          <div className="w-10 h-10 text-lg font-bold rounded-lg text-white bg-gradient-to-bl from-emerald-400 to-emerald-600 flex items-center justify-center">
            S
          </div>
          <h2 className="text-lg font-bold">SKILLSWAP</h2>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10 text-gray-700 text-nowrap text-lg">
          <Link to="/skills">Skills</Link>
          <a>Bookmarks</a>
          <a>Services</a>
          <a>Pricing</a>
          <a>My Requests</a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5 text-sm text-nowrap">
          {token ? (
            <>
              <span className="font-semibold text-gray-700">
                {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-900 border border-gray-800 group font-semibold text-white px-3 py-1.5 rounded-xl flex items-center gap-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-950 font-semibold hover:text-gray-500 duration-100"
              >
                Sign in
              </Link>
              <button
                onClick={() => navigate("/register")}
                className="bg-gray-900 border border-gray-800 group font-semibold text-white px-3 py-1.5 rounded-xl flex items-center gap-2"
              >
                Register
                <LuArrowRight className="text-gray-500 group-hover:translate-x-1 duration-300" />
              </button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <FaBars
            className="md:hidden w-6 h-6 text-gray-700 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                  duration: 0.4,
                }}
                id="nav_dialog"
                className="md:hidden z-10 bg-[#f4f4f4] w-full inset-0 fixed p-4"
              >
                {/* Mobile Header */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 justify-center items-center">
                    <div className="w-10 h-10 text-lg font-bold rounded-lg text-white bg-gradient-to-bl from-emerald-400 to-emerald-600 flex items-center justify-center">
                      S
                    </div>
                    <h2 className="text-lg font-bold">SKILLSWAP</h2>
                  </div>
                  <FaTimes
                    className="md:hidden w-6 h-6 text-gray-700 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />
                </div>

                {/* Mobile Links */}
                <div className="flex w-full h-[100vh] flex-col justify-center items-center gap-8 font-semibold text-gray-700 text-nowrap text-sm">
                  <a>Skills</a>
                  <a>Bookmarks</a>
                  <a>Services</a>
                  <a>Pricing</a>
                  <a>My Requests</a>

                  <div className="opacity-4 border-t border-gray-950 w-full"></div>

                  {token ? (
                    <>
                      <span className="text-gray-950 font-semibold">
                        {user?.username}
                      </span>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="bg-gray-900 border border-gray-800 group font-semibold text-white px-3 py-1.5 rounded-xl flex items-center gap-2"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-gray-950 font-semibold hover:text-gray-500 duration-100 border border-gray-800 px-4 py-2 rounded-xl"
                      >
                        Sign in
                      </Link>
                      <button
                        onClick={() => {
                          navigate("/register");
                          setIsOpen(false);
                        }}
                        className="bg-gray-900 border border-gray-800 group font-semibold text-white px-4 py-2 rounded-xl flex items-center gap-2"
                      >
                        Register
                        <LuArrowRight className="text-gray-500 group-hover:translate-x-1 duration-300" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
