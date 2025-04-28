import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to HealthTrack Pro</h1>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md">Login</Link>
        <Link to="/register" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md">Register</Link>
      </div>
    </div>
  );
}













// import { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// const Landing = () => {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);

//   const features = [
//     {
//       title: "Program Management",
//       description: "Create and manage fitness programs easily",
//       icon: "📋"
//     },
//     {
//       title: "Client Tracking",
//       description: "Monitor client progress and personalized goals",
//       icon: "👥"
//     },
//     {
//       title: "Data Analytics",
//       description: "Analyze performance with real-time metrics",
//       icon: "📊"
//     }
//   ];

//   return (
//     <div 
//       className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/background.jpg')"
//       }}
//     >
//       {/* Main Landing Content */}
//       <main className="flex-grow flex flex-col items-center justify-center px-4">
//         {/* Card */}
//         <div className="max-w-md w-full mx-auto p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in-up">
//           <div className="text-center">
//             {/* Logo */}
//             <div className="w-32 h-32 mx-auto mb-8">
//               <img
//                 src="/assets/logo.png"
//                 alt="HealthTrack Pro Logo"
//                 className="w-full h-full object-contain drop-shadow-lg"
//               />
//             </div>
//             {/* Title */}
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               HealthTrack Pro
//             </h1>
//             <p className="text-gray-600 mb-8">
//               Streamline your fitness business with our comprehensive management platform.
//             </p>

//             {/* Buttons */}
//             <div className="space-y-4">
//               <Link
//                 to="/login"
//                 className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="block w-full py-3 px-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-semibold transition-all duration-300"
//               >
//                 Register
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
//           {features.map((feature) => (
//             <div
//               key={feature.title}
//               className="p-6 bg-white/80 backdrop-blur-md rounded-xl text-center shadow-md hover:scale-105 transform transition duration-300"
//             >
//               <div className="text-4xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="py-6 text-center text-white/80">
//         <p>© 2025 HealthTrack Pro. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Landing;

