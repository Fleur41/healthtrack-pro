import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CreateProgramModal from '../components/CreateProgramModal';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPrograms = async () => {
    try {
      const data = await api.programs.getAll();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleProgramCreated = () => {
    fetchPrograms();
  };

  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero section with search */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Fitness Programs
        </h1>
        <div className="max-w-xl mx-auto">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search programs..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="search-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="results-count">
          {filteredPrograms.length} {filteredPrograms.length === 1 ? 'program' : 'programs'} found
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="action-button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Program
        </button>
      </div>

      {/* Programs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <div key={program.id} className="card group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600">
                  {program.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Duration: {program.duration} weeks
                </p>
              </div>
              <span className={`badge ${program.isActive ? 'badge-success' : 'badge-warning'}`}>
                {program.isActive ? 'Active' : 'Draft'}
              </span>
            </div>

            <p className="mt-4 text-gray-600 line-clamp-3">
              {program.description}
            </p>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {program.enrolledClients} clients enrolled
              </div>
              <Link
                to={`/programs/${program.id}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <CreateProgramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProgramCreated={handleProgramCreated}
      />
    </div>
  );
};

export default Programs;