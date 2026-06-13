import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";
import { useAuth } from "../../context/AuthContext";

const VerifyRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const{fetchUser} = useAuth();

  const [form, setForm] = useState({
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setForm((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
  }, [location.state]);

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

      showSuccess(res?.data?.message || "Verification successful");
      await fetchUser

      navigate("/login");
    } catch (err) {
      showError(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!form.email) {
      return showError("Email required to resend OTP");
    }

    try {
      setLoading(true);

      await API.post("/otp/send", { email: form.email });

      showSuccess("OTP resent successfully");
    } catch (err) {
      showError(err?.response?.data?.message || "Failed to resend OTP");
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
        <h2 className="text-xl font-semibold text-center">
          Verify Registration
        </h2>

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

        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="w-full bg-zinc-700 p-2 rounded"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyRegister;