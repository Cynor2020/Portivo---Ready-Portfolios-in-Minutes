import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PortfolioTypeCard from '../components/PortfolioTypeCard';
import {
  Code2,
  Camera,
  PenTool,
  Megaphone,
  Pen,
} from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handlePortfolioTypeChange = async (type) => {
    try {
      const response = await api.put('/profiles/me', {
        ...profile,
        portfolioType: type,
      });
      setProfile(response.data.data);
      // Redirect to profile page after selection so the correct type-specific form + nav load
      navigate('/profile');
    } catch (error) {
      console.error('Error updating portfolio type:', error);
      alert('Error updating portfolio type');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  const portfolioTypes = [
    {
      type: 'Developer',
      icon: Code2,
      description: 'Showcase code, GitHub repos, tech stack, and dev projects.',
      color: 'purple',
    },
    {
      type: 'UI/UX Designer',
      icon: PenTool,
      description: 'Case studies, prototypes, design systems, and visual work.',
      color: 'purple',
    },
    {
      type: 'Graphic Designer',
      icon: PenTool,
      description: 'Brand identities, illustrations, posters, and creative visuals.',
      color: 'purple',
    },
    {
      type: 'Digital Marketer',
      icon: Megaphone,
      description: 'Campaigns, SEO, social media growth, and results.',
      color: 'purple',
    },
    {
      type: 'Content Writer',
      icon: Pen,
      description: 'Articles, blogs, stories, and writing samples.',
      color: 'purple',
    },
    {
      type: 'Photographer',
      icon: Camera,
      description: 'Visual galleries, photo collections, and artistic bio.',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-text-primary mb-8">Settings</h1>

        <div className="bg-card rounded-xl p-6 border border-zinc-800 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Portfolio Type
          </h2>
          <p className="text-text-secondary mb-6">
            Select the type of portfolio that best matches your profession
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioTypes.map((item) => (
              <PortfolioTypeCard
                key={item.type}
                type={item.type}
                icon={item.icon}
                description={item.description}
                isActive={profile?.portfolioType === item.type}
                onClick={() => handlePortfolioTypeChange(item.type)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
