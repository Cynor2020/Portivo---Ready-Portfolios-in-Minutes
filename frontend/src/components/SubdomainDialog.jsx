import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

const SubdomainDialog = ({ isOpen, onClose, currentSubdomain, onSave }) => {
  const [subdomain, setSubdomain] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubdomain(currentSubdomain || '');
      setError('');
    }
  }, [isOpen, currentSubdomain]);

  const checkSubdomain = async () => {
    if (!subdomain || subdomain.length < 3) {
      setError('Subdomain must be at least 3 characters');
      return false;
    }

    if (!/^[a-z0-9-]+$/.test(subdomain)) {
      setError('Subdomain can only contain lowercase letters, numbers, and hyphens');
      return false;
    }

    setChecking(true);
    setError('');
    try {
      const response = await api.get(`/profiles/check-subdomain/${subdomain}`);
      if (!response.data.available) {
        setError('Subdomain already taken');
        setChecking(false);
        return false;
      }
      setChecking(false);
      return true;
    } catch (error) {
      setError(error.response?.data?.message || 'Error checking subdomain');
      setChecking(false);
      return false;
    }
  };

  const handleSave = async () => {
    const isValid = await checkSubdomain();
    if (!isValid) return;

    setSaving(true);
    try {
      const response = await api.put('/profiles/me/subdomain', { subdomain });
      onSave(response.data.data);
      onClose();
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving subdomain');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card rounded-xl p-6 border border-zinc-800 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-text-primary">
            Set Your Subdomain
          </h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Subdomain
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={subdomain}
              onChange={(e) => {
                setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                setError('');
              }}
              className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:border-purple-main"
              placeholder="username"
            />
            <span className="text-text-secondary">.portivo.in</span>
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
          <p className="text-xs text-text-secondary mt-2">
            Your portfolio will be available at: {subdomain || 'username'}.portivo.in
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || checking || !subdomain}
            className="flex-1 px-4 py-2 bg-purple-main hover:bg-purple-hover text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : checking ? 'Checking...' : 'Save & Deploy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubdomainDialog;

