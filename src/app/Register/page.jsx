"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthProvider/AuthProvider";

export default function Register() {
  const { createUser } = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors while typing
    if (name === "password" || name === "confirmPassword") {
      setPassError("");
    }

    setError("");
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setPassError("");

    // Check password
    if (data.password !== data.confirmPassword) {
      setPassError("Passwords do not match.");
      return;
    }

    if (data.password.length < 6) {
      setPassError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Firebase registration
      await createUser(data.email, data.password).then((result) => {
        
        toast.success("Registration Successfull!");
      });

      // Clear form
      setData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend text-xl">Register</legend>

        {/* Name */}
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="input w-full"
          placeholder="Name"
          required
        />

        {/* Email */}
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="input w-full"
          placeholder="Email"
          required
        />

        {/* Password */}
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="input w-full"
          placeholder="Password"
          required
        />

        {/* Confirm Password */}
        <label className="label">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          className="input w-full"
          placeholder="Confirm Password"
          required
        />

        {/* Password Error */}
        {passError && <p className="text-error mt-1 text-sm">{passError}</p>}

        {/* Firebase Error */}
        {error && <p className="text-error mt-1 text-sm">{error}</p>}

        {/* Register Button */}
        <button
          type="submit"
          className="btn btn-neutral mt-4"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
