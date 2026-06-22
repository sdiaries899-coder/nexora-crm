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
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        
        <div className="hidden md:block space-y-6">
          <img src={logo} alt="Udyogkart" className="w-64" />

          <div>
            <h1 className="text-4xl font-bold">
              Powering Udyogkart Sales & Operations
            </h1>
            <p className="text-gray-400 mt-3">
              Manage Leads, Enquiries, Procurement & Customer Relationships from One Platform
            </p>
          </div>

          <div className="space-y-3 text-gray-300">
            <p>✓ Lead & Enquiry Management</p>
            <p>✓ Sales Pipeline Tracking</p>
            <p>✓ Procurement & Vendor Management</p>
            <p>✓ Reports & Performance Dashboard</p>
          </div>

          <p className="text-sm text-yellow-400">
            "Connecting Sales, Procurement and Operations in One Platform"
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-sm mx-auto space-y-4 shadow-xl"
        >
          <div className="text-center space-y-2">
            <img src={logo} alt="Udyogkart" className="w-44 mx-auto" />
            <h2 className="text-2xl font-semibold">Create Account</h2>
            <p className="text-sm text-gray-400">
              Register to access your CRM
            </p>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-cyan-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none focus:border-cyan-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 p-3 rounded-lg font-medium"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-400">
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