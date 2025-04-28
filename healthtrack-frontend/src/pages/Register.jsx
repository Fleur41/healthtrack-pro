// src/pages/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.username || !formData.password) {
      setError("Please fill in both fields.");
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      navigate("/login"); // After successful register, go to login
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.error || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-emerald-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-6 w-full py-3 rounded-md text-white font-semibold ${
            isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } transition duration-200`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-green-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;









// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../api/api";

// function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     // Basic validation
//     if (!formData.username || !formData.password) {
//       setError("Please fill in both fields.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await registerUser(formData);
//       navigate("/login"); // after registration, redirect to login
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-500">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-full"
//       >
//         <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">
//           Register
//         </h2>

//         {error && (
//           <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
//         )}

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full py-3 rounded-md text-white ${
//             isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
//           } transition-colors duration-200`}
//         >
//           {isLoading ? (
//             <div className="flex justify-center items-center">
//               <div className="spinner-border animate-spin w-6 h-6 border-t-4 border-b-4 border-white rounded-full"></div>
//               <span className="ml-3">Registering...</span>
//             </div>
//           ) : (
//             "Register"
//           )}
//         </button>

//         <div className="text-center mt-6">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <span
//               className="text-green-600 cursor-pointer"
//               onClick={() => navigate("/login")}
//             >
//               Login here
//             </span>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;




