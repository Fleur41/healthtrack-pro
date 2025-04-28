import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <div className="text-2xl font-bold text-blue-600">HealthTrack Pro</div>
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="text-gray-700 hover:underline">Dashboard</Link>
        <Link to="/clients" className="text-gray-700 hover:underline">Clients</Link>
        <Link to="/programs" className="text-gray-700 hover:underline">Programs</Link>
        <button
          onClick={logout}
          className="text-red-500 hover:underline font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;







// import { Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const Navbar = () => {
//   const { logout } = useAuth();

//   return (
//     <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
//       <div className="text-xl font-bold">HealthTrack Pro</div>
//       <div className="flex items-center space-x-6">
//         <Link to="/dashboard" className="hover:underline">Dashboard</Link>
//         <Link to="/clients" className="hover:underline">Clients</Link>
//         <Link to="/programs" className="hover:underline">Programs</Link>
//         <button onClick={logout} className="text-red-500 hover:underline">Logout</button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
