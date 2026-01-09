import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import DarkTemplate from '../templates/DarkTemplate';
import LightTemplate from '../templates/LightTemplate';
import ModernTemplate from '../templates/ModernTemplate';

const PortfolioView = () => {
  const { subdomain } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolio();
  }, [subdomain]);

  const fetchPortfolio = async () => {
    try {
      // Exclude common routes that shouldn't be treated as subdomains
      const excludedRoutes = ['dashboard', 'profile', 'settings', 'templates', 'login', 'register'];
      if (excludedRoutes.includes(subdomain?.toLowerCase())) {
        setError('Invalid portfolio URL');
        setLoading(false);
        return;
      }

      const response = await api.get(`/profiles/public/${subdomain}`);
      setProfile(response.data.data);
    } catch (error) {
      setError('Portfolio not found or deactivated');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  if (error || !profile || !profile.active) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            Portfolio Not Available
          </h1>
          <p className="text-text-secondary text-lg mb-2">
            This portfolio is deactivated or does not exist.
          </p>
          <p className="text-text-secondary text-sm">
            The portfolio owner may have deactivated it, or the URL may be incorrect.
          </p>
        </div>
      </div>
    );
  }

  // Render template based on user's choice
  const template = profile.template || 'dark';

  switch (template) {
    case 'light':
      return <LightTemplate profile={profile} />;
    case 'modern':
      return <ModernTemplate profile={profile} />;
    case 'dark':
    default:
      return <DarkTemplate profile={profile} />;
  }
};

export default PortfolioView;
