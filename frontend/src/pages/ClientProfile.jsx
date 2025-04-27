import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { getInitials, getAvatarColor } from '../utils/helpers';

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await api.clients.getById(id);
        setClient(data);
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!client) return <div>Client not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-card">
        <div className="md:flex">
          <div className="md:w-1/3 p-6 border-r">
            <div className="text-center">
              <div className={`client-initial-avatar mx-auto ${
                getAvatarColor(`${client.first_name}${client.last_name}`)
              }`}>
                {getInitials(client.first_name, client.last_name)}
              </div>
              <h1 className="mt-4 text-2xl font-bold">
                {client.first_name} {client.last_name}
              </h1>
              <p className="text-gray-600">{client.email}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Personal Information</h3>
                <div className="mt-2 space-y-2 text-sm text-gray-600">
                  <p>Age: {client.age || 'Not provided'}</p>
                  <p>Height: {client.height || 'Not provided'}</p>
                  <p>Weight: {client.weight || 'Not provided'}</p>
                  <p>Blood Type: {client.bloodType || 'Not provided'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Emergency Contact</h3>
                <div className="mt-2 space-y-2 text-sm text-gray-600">
                  <p>Name: {client.emergencyContact?.name || 'Not provided'}</p>
                  <p>Phone: {client.emergencyContact?.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Enrolled Programs</h2>
                <div className="mt-4 grid gap-4">
                  {client.programs?.map((program) => (
                    <div key={program.id} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-primary-600">{program.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">{program.description}</p>
                      <div className="mt-2">
                        <span className="badge badge-success">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">Progress Photos</h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {client.progressPhotos?.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={photo.url}
                        alt={`Progress photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2">
                        {new Date(photo.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">Health Metrics</h2>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Add health metrics charts/graphs here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;