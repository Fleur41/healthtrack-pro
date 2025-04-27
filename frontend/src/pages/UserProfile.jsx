import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.users.getProfile(id);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="relative h-40 bg-primary-600">
          {profile.coverImage && (
            <img
              src={profile.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        
        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-center -mt-16">
            <div className="relative w-32 h-32">
              <img
                src={profile.avatar || '/default-avatar.png'}
                alt={profile.username}
                className="w-full h-full rounded-full border-4 border-white object-cover"
              />
              {profile.isOnline && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <h1 className="mt-4 text-2xl font-bold">{profile.username}</h1>
            <p className="text-gray-600">{profile.role}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Bio</h3>
                <p className="mt-2 text-gray-600">{profile.bio || 'No bio available'}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-gray-600">Email: {profile.email}</p>
                  <p className="text-gray-600">Phone: {profile.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Stats</h3>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">{profile.clientsCount || 0}</p>
                    <p className="text-sm text-gray-600">Clients</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-600">{profile.programsCount || 0}</p>
                    <p className="text-sm text-gray-600">Programs</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Recent Activity</h3>
                <div className="mt-2 space-y-2">
                  {profile.recentActivity?.map((activity, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mr-2"></div>
                      <p>{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;