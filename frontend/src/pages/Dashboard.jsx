import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProfileStrengthCard from '../components/ProfileStrengthCard';
import LiveDeploymentCard from '../components/LiveDeploymentCard';
import MioAICard from '../components/MioAICard';
import CreatorLaunchpad from '../components/CreatorLaunchpad';
import { calculateProfileStrength } from '../utils/profileStrength';

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/me');
      setProfile(response.data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    // Refresh profile data after update
    fetchProfile();
  };

  const getProfileStrength = () => {
    if (!profile) return { strength: 0, missing: [] };
    return calculateProfileStrength(profile);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  const strengthStats = getProfileStrength();

  return (
    <div className="min-h-screen bg-background p-6 lg:pl-72">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-8">
          Welcome back, {user?.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ProfileStrengthCard
            stats={strengthStats}
          />
          <LiveDeploymentCard
            profile={profile}
            onUpdate={handleProfileUpdate}
          />
        </div>

        <div className="mb-8">
          <MioAICard />
        </div>

        <CreatorLaunchpad />
      </div>
    </div>
  );
};

export default Dashboard;

