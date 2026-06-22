// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../services/api";
// import { showSuccess, showError } from "../../utils/toast";

// const Register = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.email || !form.password) {
//       return showError("All fields are required");
//     }

//     try {
//       setLoading(true);

//       const res = await API.post("/auth/register", form);

//       showSuccess(res?.data?.message || "Registered successfully");

//       // redirect to OTP verification
//       navigate("/verify-register", { state: { email: form.email } });

//     } catch (err) {
//       showError(err?.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-black text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-zinc-900 p-6 rounded-xl w-80 space-y-4"
//       >
//         <h2 className="text-xl font-semibold text-center">Register</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-zinc-800"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-zinc-800"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 p-2 rounded"
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>

//         <p className="text-sm text-center text-gray-400">
//           Already have an account?{" "}
//           <span
//             className="text-blue-500 cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { showSuccess, showError } from "../../utils/toast";
import logo from "../../assets/logo.png";

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

      navigate("/verify-register", {
        state: { email: form.email },
      });
    } catch (err) {
      showError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side */}
        <div className="hidden md:block space-y-6">
          <img
            src={logo}
            alt="Udyogkart"
            className="w-72"
          />

          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Udyogkart CRM
            </h1>

            <p className="text-gray-400 text-lg mt-4">
              Manage Leads, Procurement & Customer Relationships
              from a Single Platform.
            </p>
          </div>

          <div className="space-y-4 text-gray-300">
            <div>✓ Lead & Enquiry Management</div>
            <div>✓ Customer Follow-ups & Activities</div>
            <div>✓ Procurement & Vendor Tracking</div>
            <div>✓ Team Collaboration</div>
            <div>✓ Business Performance Dashboard</div>
            <div>✓ Real-time Reports & Analytics</div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-cyan-400">
                25K+
              </h3>
              <p className="text-xs text-gray-400">
                SKUs Managed
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-cyan-400">
                5K+
              </h3>
              <p className="text-xs text-gray-400">
                Customers
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <h3 className="text-2xl font-bold text-cyan-400">
                PAN
              </h3>
              <p className="text-xs text-gray-400">
                India Network
              </p>
            </div>
          </div>

          <p className="text-sm text-cyan-400">
            Connecting Sales, Procurement & Operations
          </p>
        </div>

        {/* Register Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md mx-auto shadow-2xl"
        >
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="Udyogkart"
              className="w-48 mx-auto mb-4"
            />

            <h2 className="text-3xl font-bold">
              Create Account
            </h2>

            <p className="text-gray-400 mt-2">
              Register to access Udyogkart CRM
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-cyan-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-cyan-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 p-3 rounded-lg font-semibold transition"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>
          </div>

          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <span
              className="text-cyan-400 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;