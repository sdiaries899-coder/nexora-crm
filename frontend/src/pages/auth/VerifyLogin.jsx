import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";

const VerifyLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    otp: "",
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

    if (!form.email || !form.otp) {
      return showError("All fields are required");
    }

    if (form.otp.length !== 6) {
      return showError("OTP must be 6 digits");
    }

    try {
      setLoading(true);

      const res = await API.post("/otp/verify", form);

      showSuccess(res?.data?.message || "Login verified");

      navigate("/login");
    } catch (err) {
      showError(err?.response?.data?.message || "Verification failed");
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
        <h2 className="text-xl font-semibold text-center">Verify Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800"
        />

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={handleChange}
          className="w-full p-2 rounded bg-zinc-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 p-2 rounded"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyLogin;