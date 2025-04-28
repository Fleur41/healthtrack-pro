import { useState } from "react";
import { createProgram } from "../api/api";

export default function ProgramFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError("Program name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await createProgram(formData); // Use the exported function
      onClose(); // This will close the modal and trigger fetchPrograms() in the parent
    } catch (err) {
      console.error("Error creating program:", err);
      setError(err.response?.data?.message || "Failed to create program");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Program</h2>
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
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Program Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// import { useState } from 'react';
// // import api from '../services/api';
// import API from '../api/api';

// const ProgramFormModal = ({ isOpen, onClose, onProgramCreated }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     duration: '',
//     difficulty: 'beginner',
//     isActive: true
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await API.programs.create(formData);
//       onProgramCreated();
//       onClose();
//       setFormData({
//         name: '',
//         description: '',
//         duration: '',
//         difficulty: 'beginner',
//         isActive: true
//       });
//     } catch (error) {
//       setError(error.response?.data?.error || 'Failed to create program');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="p-6">
//           <div className="modal-header">
//             <h2 className="text-xl font-bold text-gray-900">Create New Program</h2>
//             <button 
//               onClick={onClose}
//               className="icon-button"
//             >
//               ✕
//             </button>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="form-group">
//               <label htmlFor="name" className="form-label">Program Name *</label>
//               <input
//                 id="name"
//                 type="text"
//                 className="input"
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 placeholder="Enter program name"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description" className="form-label">Description *</label>
//               <textarea
//                 id="description"
//                 className="input min-h-[100px]"
//                 required
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 placeholder="Enter program description"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="duration" className="form-label">Duration (weeks) *</label>
//               <input
//                 id="duration"
//                 type="number"
//                 min="1"
//                 className="input"
//                 required
//                 value={formData.duration}
//                 onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
//                 placeholder="Enter program duration"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
//               <select
//                 id="difficulty"
//                 className="select"
//                 value={formData.difficulty}
//                 onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
//               >
//                 <option value="beginner">Beginner</option>
//                 <option value="intermediate">Intermediate</option>
//                 <option value="advanced">Advanced</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox"
//                   checked={formData.isActive}
//                   onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
//                 />
//                 <span className="text-sm text-gray-700">Activate program immediately</span>
//               </label>
//             </div>

//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="btn btn-secondary"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={loading}
//               >
//                 {loading ? 'Creating...' : 'Create Program'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgramFormModal;

// // import { useState } from "react";
// // import API from "../api/api";

// // export default function ProgramFormModal({ onClose }) {
// //   const [form, setForm] = useState({ name: "", description: "" });

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await API.post("/programs", form);
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
// //       <div className="bg-white p-6 rounded w-96">
// //         <h2 className="text-xl font-bold mb-4">Create Program</h2>
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Program Name"
// //             value={form.name}
// //             onChange={handleChange}
// //             className="w-full p-2 mb-4 border rounded"
// //             required
// //           />
// //           <textarea
// //             name="description"
// //             placeholder="Description"
// //             value={form.description}
// //             onChange={handleChange}
// //             className="w-full p-2 mb-4 border rounded"
// //             required
// //           />
// //           <div className="flex justify-end">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="mr-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
// //             >
// //               Save
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
