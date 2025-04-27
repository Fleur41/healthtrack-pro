import { useState } from 'react';
import api from '../services/api';

const CreateProgramModal = ({ isOpen, onClose, onProgramCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: 'beginner',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.programs.create(formData);
      onProgramCreated();
      onClose();
      setFormData({
        name: '',
        description: '',
        duration: '',
        difficulty: 'beginner',
        isActive: true
      });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create program');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-6">
          <div className="modal-header">
            <h2 className="text-xl font-bold text-gray-900">Create New Program</h2>
            <button 
              onClick={onClose}
              className="icon-button"
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
              <label htmlFor="name" className="form-label">Program Name *</label>
              <input
                id="name"
                type="text"
                className="input"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter program name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description *</label>
              <textarea
                id="description"
                className="input min-h-[100px]"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter program description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration" className="form-label">Duration (weeks) *</label>
              <input
                id="duration"
                type="number"
                min="1"
                className="input"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Enter program duration"
              />
            </div>

            <div className="form-group">
              <label htmlFor="difficulty" className="form-label">Difficulty Level</label>
              <select
                id="difficulty"
                className="select"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <span className="text-sm text-gray-700">Activate program immediately</span>
              </label>
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
                {loading ? 'Creating...' : 'Create Program'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProgramModal;