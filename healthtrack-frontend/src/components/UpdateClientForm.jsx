import { useState } from "react";
import { updateClient } from "./API"; // Import your API function

const UpdateClientForm = ({ clientId, existingData }) => {
  const [formData, setFormData] = useState(existingData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClient(clientId, formData); // Update client via API
      alert("Client updated successfully!");
    } catch (error) {
      alert("Error updating client");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* Add more fields as needed */}
      <button type="submit">Update Client</button>
    </form>
  );
};
