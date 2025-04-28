import { Link, useLocation } from 'react-router-dom';
import { fetchClients, fetchPrograms } from '../api/api';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const location = useLocation();
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [clientsRes, programsRes] = await Promise.all([
          fetchClients(),
          fetchPrograms(),
        ]);
        setClients(clientsRes.data);
        setPrograms(programsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      {/* <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold text-indigo-600">Dashboard</div>
          <div className="flex space-x-8">
            <Link
              to="/clients"
              className={`font-medium ${
                location.pathname === '/clients'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-500'
              }`}
            >
              Clients
            </Link>
            <Link
              to="/programs"
              className={`text-sm font-medium ${
                location.pathname === '/programs'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-500'
              }`}
            >
              Programs
            </Link>
          </div>
        </div>
      </nav> */}

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Overview</h2>

        {loading ? (
          <div className="flex justify-center ">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Clients</h3>
              <p className="text-5xl font-bold text-indigo-600">{clients.length}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Programs</h3>
              <p className="text-5xl font-bold text-green-500">{programs.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;









// import { Link, useLocation } from 'react-router-dom';
// import { fetchClients, fetchPrograms } from '../api/api';
// import { useEffect, useState } from 'react';

// const Dashboard = () => {
//   const location = useLocation();
//   const [clients, setClients] = useState([]);
//   const [programs, setPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const [clientsRes, programsRes] = await Promise.all([
//           fetchClients(),
//           fetchPrograms()
//         ]);
//         setClients(clientsRes.data);
//         setPrograms(programsRes.data);
//       } catch (error) {
//         console.error('Failed to fetch data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
//           <div className="flex space-x-6">
//             <Link
//               to="/clients"
//               className={`font-medium ${
//                 location.pathname === '/clients'
//                   ? 'text-indigo-600 border-b-2 border-indigo-600'
//                   : 'text-gray-600 hover:text-indigo-500'
//               }`}
//             >
//               Clients
//             </Link>
//             <Link
//               to="/programs"
//               className={`font-medium ${
//                 location.pathname === '/programs'
//                   ? 'text-indigo-600 border-b-2 border-indigo-600'
//                   : 'text-gray-600 hover:text-indigo-500'
//               }`}
//             >
//               Programs
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Main Dashboard */}
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Overview</h2>

//         {loading ? (
//           <div className="flex justify-center">
//             <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//             <div className="bg-indigo-100 p-8 rounded-lg shadow-md text-center">
//               <h3 className="text-xl font-semibold text-indigo-700 mb-2">Total Clients</h3>
//               <p className="text-5xl font-bold text-indigo-900">{clients.length}</p>
//             </div>
//             <div className="bg-green-100 p-8 rounded-lg shadow-md text-center">
//               <h3 className="text-xl font-semibold text-green-700 mb-2">Total Programs</h3>
//               <p className="text-5xl font-bold text-green-900">{programs.length}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import { Link } from 'react-router-dom';

// import {fetchClients, fetchPrograms} from '../api/api';
// import { useEffect, useState } from 'react';



// const Dashboard = () => {

//   const [clients, setClients] = useState([]);
//   const [programs, setPrograms] = useState([]);

//   useEffect(() => {
//     async function loadData() {
//       const clientsRes = await fetchClients();
//       const programsRes = await fetchPrograms();
//       setClients(clientsRes.data);
//       setPrograms(programsRes.data);
//     }
//     loadData();
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//       <div className="grid grid-cols-2 gap-8">
//         <div className="bg-blue-100 p-6 rounded-lg text-center">
//           <h2 className="text-xl font-semibold">Total Clients</h2>
//           <p className="text-4xl">{clients.length}</p>
//         </div>
//         <div className="bg-green-100 p-6 rounded-lg text-center">
//           <h2 className="text-xl font-semibold">Total Programs</h2>
//           <p className="text-4xl">{programs.length}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
