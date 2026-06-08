import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return showError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", form);

      showSuccess(res?.data?.message || "Registered successfully");

      // redirect to OTP verification
      navigate("/verify-register", { state: { email: form.email } });

    } catch (err) {
      showError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Register</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 p-2 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;