import { useState, useEffect } from "react";
import { fetchClients } from "../api/api";
import API from "../api/api";
import ClientFormModal from "../components/ClientFormModal";
import { useNavigate } from "react-router-dom";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);  // For editing a client
  const navigate = useNavigate();

  const fetchClientData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchClients();
      setClients(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
      setError("Failed to load clients. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteClient = async (id) => {
    if (confirm("Delete this client?")) {
      try {
        await API.delete(`/api/clients/${id}`);
        fetchClientData(); // Refresh the client list
      } catch (err) {
        console.error("Failed to delete client:", err);
        alert("Failed to delete client. Please try again.");
      }
    }
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "??";
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  };

  const viewClientDetails = (id) => {
    navigate(`/clients/${id}`);
  };

  const editClient = (client) => {
    setSelectedClient(client); // Set client data to be edited
    setShowModal(true); // Open the modal for editing
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button
          onClick={() => {
            setSelectedClient(null); // Clear selected client for a new client
            setShowModal(true); // Open modal for adding a new client
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Client
        </button>
      </div>

      {isLoading ? (
        <p>Loading clients...</p>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded text-center">
          <p>No clients found. Click "Add Client" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4 cursor-pointer"
                onClick={() => viewClientDetails(client.id)}
              >
                {getInitials(client.first_name, client.last_name)}
              </div>
              <h2 className="font-semibold text-lg">{client.first_name} {client.last_name}</h2>
              <p className="text-gray-600">{client.email}</p>
              <div className="flex justify-between w-full mt-4">
                <button
                  onClick={() => editClient(client)}  // Open modal to edit the client
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteClient(client.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ClientFormModal
          client={selectedClient}  // Pass selected client data for editing
          onClose={() => {
            setShowModal(false);
            fetchClientData(); // Refresh client list after adding/updating
          }}
        />
      )}
    </div>
  );
}





// import { useState, useEffect } from "react";
// import { fetchClients } from "../api/api";
// import API from "../api/api";
// import ClientFormModal from "../components/ClientFormModal";
// import { useNavigate } from "react-router-dom";

// export default function Clients() {
//   const [clients, setClients] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchClientData = async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetchClients();
//       setClients(res.data);
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch clients:", err);
//       setError("Failed to load clients. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteClient = async (id) => {
//     if (confirm("Delete this client?")) {
//       try {
//         await API.delete(`/api/clients/${id}`);
//         fetchClientData(); // Refresh the client list
//       } catch (err) {
//         console.error("Failed to delete client:", err);
//         alert("Failed to delete client. Please try again.");
//       }
//     }
//   };

//   const getInitials = (firstName, lastName) => {
//     if (!firstName || !lastName) return "??";
//     return firstName[0].toUpperCase() + lastName[0].toUpperCase();
//   };

//   const viewClientDetails = (id) => {
//     navigate(`/clients/${id}`);
//   };

//   useEffect(() => {
//     fetchClientData();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Clients</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add Client
//         </button>
//       </div>

//       {isLoading ? (
//         <p>Loading clients...</p>
//       ) : error ? (
//         <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
//           {error}
//         </div>
//       ) : clients.length === 0 ? (
//         <div className="bg-gray-100 p-4 rounded text-center">
//           <p>No clients found. Click "Add Client" to create one.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {clients.map((client) => (
//             <div
//               key={client.id}
//               className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
//             >
//               <div
//                 className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mb-4 cursor-pointer"
//                 onClick={() => viewClientDetails(client.id)}
//               >
//                 {getInitials(client.first_name, client.last_name)}
//               </div>
//               <h2 className="font-semibold text-lg">{client.first_name} {client.last_name}</h2>
//               <p className="text-gray-600">{client.email}</p>
//               <div className="flex justify-between w-full mt-4">
//                 <button
//                   onClick={() => deleteClient(client.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && (
//         <ClientFormModal
//           onClose={() => {
//             setShowModal(false);
//             fetchClientData(); // Refresh client list after adding a new one
//           }}
//         />
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { fetchClients } from "../api/api";
// import API from "../api/api";
// import ClientFormModal from "../components/ClientFormModal";
// import { useNavigate } from "react-router-dom";

// export default function Clients() {
//   const [clients, setClients] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchClientData = async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetchClients();
//       setClients(res.data);
//       setError(null);
//     } catch (err) {
//       console.error("Failed to fetch clients:", err);
//       setError("Failed to load clients. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteClient = async (id) => {
//     if (confirm("Delete this client?")) {
//       try {
//         await API.delete(`/api/clients/${id}`);
//         fetchClientData();
//       } catch (err) {
//         console.error("Failed to delete client:", err);
//         alert("Failed to delete client. Please try again.");
//       }
//     }
//   };

//   const getFirstLetter = (name) => {
//     if (typeof name !== "string" || name.trim() === "") return "?";
//     return name.trim()[0].toUpperCase();
//   };

//   const viewClientDetails = (id) => {
//     navigate(`/clients/${id}`);
//   };

//   useEffect(() => {
//     fetchClientData();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Clients</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add Client
//         </button>
//       </div>

//       {isLoading ? (
//         <p>Loading clients...</p>
//       ) : error ? (
//         <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
//           {error}
//         </div>
//       ) : clients.length === 0 ? (
//         <div className="bg-gray-100 p-4 rounded text-center">
//           <p>No clients found. Click "Add Client" to create one.</p>
//         </div>
//       ) : (
//         <ul>
//           {clients.map((client) => (
//             <li
//               key={client.id}
//               className="flex justify-between p-4 mb-2 bg-white rounded shadow"
//             >
//               <div className="flex items-center">
//                 <div
//                   className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 cursor-pointer"
//                   onClick={() => viewClientDetails(client.id)}
//                 >
//                   {getFirstLetter(client.name)}
//                 </div>
//                 <div>
//                   <h2 className="font-bold">{client.name}</h2>
//                   <p className="text-gray-600">{client.email}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => deleteClient(client.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 h-8"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {showModal && (
//         <ClientFormModal
//           onClose={() => {
//             setShowModal(false);
//             fetchClientData();
//           }}
//         />
//       )}
//     </div>
//   );
// }

