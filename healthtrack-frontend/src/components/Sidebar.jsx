import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="h-screen w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">HealthTrackPro</div>
      <nav className="flex-1">
        <Link to="/dashboard/programs" className="block p-4 hover:bg-blue-700">Programs</Link>
        <Link to="/dashboard/clients" className="block p-4 hover:bg-blue-700">Clients</Link>
      </nav>
      <button
        onClick={handleLogout}
        className="p-4 bg-red-500 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
