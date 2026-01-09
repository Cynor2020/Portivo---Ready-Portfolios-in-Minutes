import { ExternalLink, CheckCircle2, XCircle, Edit, Power } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LiveDeploymentCard = ({ profile, onUpdate }) => {
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [subdomain, setSubdomain] = useState(profile?.subdomain || '');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deactivating, setDeactivating] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const checkSubdomain = async () => {
    if (!subdomain || subdomain.length < 3) {
      setError('Subdomain must be at least 3 characters');
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

  const handleSaveSubdomain = async () => {
    const isValid = await checkSubdomain();
    if (!isValid) return;

    setSaving(true);
    try {
      const response = await api.put('/profiles/me/subdomain', { subdomain });
      onUpdate(response.data.data);
      setShowEditDialog(false);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating subdomain');
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async () => {
    if (!confirm('Are you sure you want to deactivate your portfolio? It will no longer be publicly accessible.')) {
      return;
    }

    setDeactivating(true);
    try {
      const response = await api.put('/profiles/deactivate');
      onUpdate(response.data.data);
      alert('Portfolio deactivated successfully');
    } catch (error) {
      alert('Error deactivating portfolio');
    } finally {
      setDeactivating(false);
    }
  };

  return (
    <>
      <div className="bg-card rounded-xl p-6 border border-zinc-800 hover:scale-[1.02] transition-transform duration-200">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Live Deployment
        </h3>

        {profile?.subdomain ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              {profile.active ? (
                <>
                  <CheckCircle2 className="text-green-main" size={20} />
                  <span className="text-sm text-green-main font-medium">Online</span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500" size={20} />
                  <span className="text-sm text-red-500 font-medium">Deactivated</span>
                </>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm text-text-secondary mb-1">Your Portfolio URL</p>
              <a
                href={`http://localhost:5173/${profile.subdomain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-main hover:text-purple-hover font-medium flex items-center gap-2 break-all"
              >
                https://{profile.subdomain}.portivo.com
                <ExternalLink size={16} />
              </a>
            </div>

            {profile.deployment?.deployedAt && (
              <div className="mb-4">
                <p className="text-sm text-text-secondary mb-1">Deployed on</p>
                <p className="text-text-primary font-medium">
                  {formatDate(profile.deployment.deployedAt)}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSubdomain(profile.subdomain);
                  setShowEditDialog(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg font-medium transition-all"
              >
                <Edit size={16} />
                Edit Subdomain
              </button>
              {profile.active && (
                <button
                  onClick={handleDeactivate}
                  disabled={deactivating}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
                >
                  <Power size={16} />
                  {deactivating ? 'Deactivating...' : 'Deactivate'}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-text-secondary mb-4">Not Deployed</p>
            <p className="text-sm text-text-secondary mb-4">
              Save your profile and set a subdomain to publish your portfolio
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 bg-purple-main hover:bg-purple-hover text-white rounded-lg font-medium transition-all"
            >
              Go to Profile
            </button>
          </div>
        )}
      </div>

      {/* Edit Subdomain Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-6 border border-zinc-800 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Edit Subdomain
            </h3>

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
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEditDialog(false);
                  setError('');
                }}
                className="flex-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSubdomain}
                disabled={saving || checking}
                className="flex-1 px-4 py-2 bg-purple-main hover:bg-purple-hover text-white rounded-lg font-medium transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : checking ? 'Checking...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveDeploymentCard;
