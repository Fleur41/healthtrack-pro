import { useState, useEffect, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import api from '../services/api';

const CreateClientModal = ({ isOpen, onClose, onClientCreated }) => {
  const [programs, setPrograms] = useState([]);
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    program_id: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await api.programs.getAll();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    if (isOpen) {
      fetchPrograms();
    }
  }, [isOpen]);

  const filteredPrograms = query === ''
    ? programs
    : programs.filter((program) =>
        program.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProgram) {
      setError('Please select a program');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.clients.create({
        ...formData,
        program_ids: [selectedProgram.id]
      });
      onClientCreated();
      onClose();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      program_id: null
    });
    setSelectedProgram(null);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-6">
          <div className="modal-header">
            <h2 className="text-xl font-bold text-gray-900">Add New Client</h2>
            <button 
              onClick={onClose}
              className="icon-button text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name *</label>
              <input
                id="firstName"
                type="text"
                className="input"
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="Enter first name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name *</label>
              <input
                id="lastName"
                type="text"
                className="input"
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Enter last name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                id="email"
                type="email"
                className="input"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Program *</label>
              <Combobox value={selectedProgram} onChange={setSelectedProgram}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                      displayValue={(program) => program?.name}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Select a program"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg 
                        className="h-5 w-5 text-gray-400" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M7 7l3-3 3 3m0 6l-3 3-3-3" 
                        />
                      </svg>
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                      {filteredPrograms.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredPrograms.map((program) => (
                          <Combobox.Option
                            key={program.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-primary-600 text-white' : 'text-gray-900'
                              }`
                            }
                            value={program}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {program.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-primary-600'
                                    }`}
                                  >
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Client'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateClientModal;