import { useState, useEffect } from "react";
import API, { fetchPrograms as apiFetchPrograms, createProgram } from "../api/api";
import ProgramFormModal from "../components/ProgramFormModal";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgramData = async () => {
    try {
      setIsLoading(true);
      const res = await apiFetchPrograms(); // Use the exported function from your API
      setPrograms(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch programs:", err);
      setError("Failed to load programs. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProgram = async (id) => {
    if (confirm("Delete this program?")) {
      try {
        await API.delete(`/api/programs/${id}`); // Fix the API path
        fetchProgramData();
      } catch (err) {
        console.error("Failed to delete program:", err);
        alert("Failed to delete program. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchProgramData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Programs</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Program
        </button>
      </div>

      {isLoading ? (
        <p>Loading programs...</p>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      ) : programs.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p>No programs found. Click "Add Program" to create one.</p>
        </div>
      ) : (
        <ul>
          {programs.map(program => (
            <li key={program.id} className="flex justify-between p-4 mb-2 bg-white rounded shadow">
              <div>
                <h2 className="font-bold">{program.name}</h2>
                <p>{program.description}</p>
              </div>
              <button
                onClick={() => deleteProgram(program.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && <ProgramFormModal onClose={() => { setShowModal(false); fetchProgramData(); }} />}
    </div>
  );
}


// import { useState, useEffect } from "react";
// import API from "../api/api";
// import ProgramFormModal from "../components/ProgramFormModal";

// export default function Programs() {
//   const [programs, setPrograms] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const fetchPrograms = async () => {
//     const res = await API.get("/programs");
//     setPrograms(res.data);
//   };

//   const deleteProgram = async (id) => {
//     if (confirm("Delete this program?")) {
//       await API.delete(`/programs/${id}`);
//       fetchPrograms();
//     }
//   };

//   useEffect(() => {
//     fetchPrograms();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Programs</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Program
//         </button>
//       </div>

//       <ul>
//         {programs.map(program => (
//           <li key={program.id} className="flex justify-between p-4 mb-2 bg-white rounded shadow">
//             <div>
//               <h2 className="font-bold">{program.name}</h2>
//               <p>{program.description}</p>
//             </div>
//             <button
//               onClick={() => deleteProgram(program.id)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       {showModal && <ProgramFormModal onClose={() => { setShowModal(false); fetchPrograms(); }} />}
//     </div>
//   );
// }
