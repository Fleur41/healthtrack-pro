import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        setIsLoading(true);
        const res = await API.get(`/api/clients/${id}`);
        setClient(res.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch client details:", err);
        setError("Failed to load client details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientDetails();
  }, [id]);

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return "??";
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading client details...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
        <button
          onClick={() => navigate("/clients")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Clients
        </button>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8">
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-4">
          Client not found.
        </div>
        <button
          onClick={() => navigate("/clients")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Clients
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/clients")}
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full mr-4"
        >
          &larr;
        </button>
        <h1 className="text-2xl font-bold">Client Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl mr-4">
            {getInitials(client.first_name, client.last_name)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {client.first_name} {client.last_name}
            </h2>
            <p className="text-gray-600">{client.email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Programs Enrolled</h3>
          {client.programs && client.programs.length > 0 ? (
            <ul className="list-disc pl-5">
              {client.programs.map((program) => (
                <li key={program.id}>
                  <div className="font-medium">{program.name}</div>
                  <div className="text-sm text-gray-600">{program.description}</div>
                  <div className="text-xs text-gray-400">
                    Started on {new Date(program.created_at).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Not enrolled in any programs</p>
          )}
        </div>
      </div>
    </div>
  );
}



// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/api";

// export default function ClientDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [client, setClient] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchClientDetails = async () => {
//       try {
//         setIsLoading(true);
//         const res = await API.get(`/api/clients/${id}`);
//         setClient(res.data);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch client details:", err);
//         setError("Failed to load client details. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchClientDetails();
//   }, [id]);

//   const getInitials = (name) => {
//     if (!name) return "??";
//     return name
//       .split(" ")
//       .map(word => word[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   if (isLoading) {
//     return <div className="text-center p-8">Loading client details...</div>;
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
//         <button
//           onClick={() => navigate("/clients")}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Back to Clients
//         </button>
//       </div>
//     );
//   }

//   if (!client) {
//     return (
//       <div className="p-8">
//         <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-4">
//           Client not found.
//         </div>
//         <button
//           onClick={() => navigate("/clients")}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Back to Clients
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => navigate("/clients")}
//           className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full mr-4"
//         >
//           &larr;
//         </button>
//         <h1 className="text-2xl font-bold">Client Details</h1>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <div className="flex items-center mb-6">
//           <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl mr-4">
//             {getInitials(client.name)}
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold">{client.name}</h2>
//             <p className="text-gray-600">{client.email}</p>
//           </div>
//         </div>

//         <div className="border-t pt-4">
//           <h3 className="font-semibold mb-2">Program</h3>
//           <p>{client.program ? client.programs.name : "Not assigned to any program"}</p>
//         </div>

//         {/* Additional client information can be added here */}
//         <div className="border-t mt-4 pt-4">
//           <h3 className="font-semibold mb-2">Client Since</h3>
//           <p>{new Date(client.created_at).toLocaleDateString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// }