import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4100/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("Authenticated successfully!");
        navigate("/items");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !form.email || !form.password}
            className={`w-full py-2 text-white rounded-lg ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
