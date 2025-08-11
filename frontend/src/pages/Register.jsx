import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance"; // Adjust path to your axios setup

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleEmailSignup(e) {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error("Please fill in username, email, and password");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/v1/users/register", {
        username,
        email,
        password,
      });

      toast.success("Register successful! Please log in.");
      console.log("✅ Register success:", res.data);

      navigate("/login");
    } catch (err) {
      let errorMessage =
        err.response?.data?.error?.details?.[0]?.message || // <-- backend details message
        err.response?.data?.message || // fallback to message
        "Register failed. Please try again."; // default

      toast.error(errorMessage, { autoClose: 3000 });
      console.error("❌ Register failed:", errorMessage);
    }
  }

  function handleGoogleSignup() {
    console.log("Google signup clicked");
    // TODO: integrate Google Auth
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Pastel gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-100 to-pink-100" />

      {/* Central radial white glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-white/70 rounded-full blur-3xl"></div>
      </div>

      {/* Additional subtle pastel blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>

      {/* Signup card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/50">
        {/* Brand Name */}
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
          SkillSwap
        </h1>

        <h2 className="text-lg font-medium text-center mb-6 text-gray-700">
          Create your account
        </h2>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-transparent py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign up with Email
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
