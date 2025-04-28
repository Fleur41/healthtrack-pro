import { useState, useEffect } from "react";
import { createClient, updateClient, fetchPrograms } from "../api/api";

export default function ClientFormModal({ client, onClose }) {
  const [form, setForm] = useState({ 
    first_name: "", 
    last_name: "",
    email: "",
    program_ids: [] // Set this as an array to hold program IDs
  });
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProgramsLoading, setIsProgramsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load programs on component mount
    const loadPrograms = async () => {
      try {
        const res = await fetchPrograms();
        setPrograms(res.data);
      } catch (err) {
        console.error("Failed to load programs:", err);
        setError("Failed to load programs. Please try again.");
      } finally {
        setIsProgramsLoading(false);
      }
    };
    
    loadPrograms();

    // If a client is provided, populate the form with their existing data
    if (client) {
      setForm({
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        program_ids: client.program_ids || [], // Populate the program_ids if the client already has them
      });
    }
  }, [client]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProgramChange = (e) => {
    // Update the selected programs
    const selectedPrograms = Array.from(e.target.selectedOptions, option => option.value);
    setForm({ ...form, program_ids: selectedPrograms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim() || form.program_ids.length === 0) {
      setError("All fields are required");
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      if (client) {
        // Update the existing client
        await updateClient(client.id, form);
      } else {
        // Create a new client
        await createClient(form);
      }
      onClose();
    } catch (err) {
      console.error("Error creating/updating client:", err);
      setError(err.response?.data?.message || "Failed to create/update client");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{client ? "Edit Client" : "Add Client"}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Enter first name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Enter last name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="program_ids" className="block text-sm font-medium text-gray-700 mb-1">
              Programs *
            </label>
            {isProgramsLoading ? (
              <p className="text-sm text-gray-500">Loading programs...</p>
            ) : programs.length === 0 ? (
              <p className="text-sm text-red-500">No programs available. Please create a program first.</p>
            ) : (
              <select
                id="program_ids"
                name="program_ids"
                value={form.program_ids}
                onChange={handleProgramChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                multiple // Allow multiple selections
                required
              >
                <option value="">Select programs</option>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
              disabled={isLoading || isProgramsLoading || programs.length === 0}
            >
              {isLoading ? "Saving..." : client ? "Update Client" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



// import { useState, useEffect } from "react";
// import { createClient, fetchPrograms } from "../api/api";

// export default function ClientFormModal({ onClose }) {
//   const [form, setForm] = useState({ 
//     name: "", 
//     email: "",
//     program_id: ""
//   });
//   const [programs, setPrograms] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isProgramsLoading, setIsProgramsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadPrograms = async () => {
//       try {
//         const res = await fetchPrograms();
//         setPrograms(res.data);
//       } catch (err) {
//         console.error("Failed to load programs:", err);
//         setError("Failed to load programs. Please try again.");
//       } finally {
//         setIsProgramsLoading(false);
//       }
//     };
    
//     loadPrograms();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!form.name.trim() || !form.email.trim() || !form.program_id) {
//       setError("All fields are required");
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       setError(null);
//       await createClient(form);
//       onClose();
//     } catch (err) {
//       console.error("Error creating client:", err);
//       setError(err.response?.data?.message || "Failed to create client");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Add Client</h2>
//           <button 
//             onClick={onClose} 
//             className="text-gray-500 hover:text-gray-700"
//           >
//             &times;
//           </button>
//         </div>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Client Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter client name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email *
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter email address"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label htmlFor="program_id" className="block text-sm font-medium text-gray-700 mb-1">
//               Program *
//             </label>
//             {isProgramsLoading ? (
//               <p className="text-sm text-gray-500">Loading programs...</p>
//             ) : programs.length === 0 ? (
//               <p className="text-sm text-red-500">No programs available. Please create a program first.</p>
//             ) : (
//               <select
//                 id="program_id"
//                 name="program_id"
//                 value={form.program_id}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//                 required
//               >
//                 <option value="">Select a program</option>
//                 {programs.map(program => (
//                   <option key={program.id} value={program.id}>
//                     {program.name}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           <div className="flex justify-end space-x-2 mt-6">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
//               disabled={isLoading || isProgramsLoading || programs.length === 0}
//             >
//               {isLoading ? "Saving..." : "Add Client"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";
// import API from "../api/api";

// export default function ClientFormModal({ onClose }) {
//   const [form, setForm] = useState({ name: "", email: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post("/clients", form);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
//       <div className="bg-white p-6 rounded w-96">
//         <h2 className="text-xl font-bold mb-4">Add Client</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Client Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-2 mb-4 border rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-2 mb-4 border rounded"
//             required
//           />
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
