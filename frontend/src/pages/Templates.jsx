import { useEffect, useState } from 'react';
import api from '../services/api';
import { Rocket, Eye } from 'lucide-react';

const Templates = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(null);

  const templates = [
    {
      id: 'dark',
      name: 'Dark Elegance',
      description: 'Professional dark theme with green accents. Perfect for developers and tech professionals.',
      preview: 'dark',
      colors: ['#0A0A0A', '#18181B', '#10B981'],
    },
    {
      id: 'light',
      name: 'Light Professional',
      description: 'Clean minimal light theme. Ideal for designers and creative professionals.',
      preview: 'light',
      colors: ['#FFFFFF', '#F3F4F6', '#3B82F6'],
    },
    {
      id: 'modern',
      name: 'Modern Gradient',
      description: 'Trending 2026 style with glassmorphism and animated gradients. High-end premium feel.',
      preview: 'modern',
      colors: ['#0F172A', '#1E293B', '#FBBF24'],
    },
  ];

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

  const handleDeploy = async (templateId) => {
    setDeploying(templateId);
    try {
      const response = await api.post('/profiles/deploy', {
        template: templateId,
      });
      setProfile(response.data.data);
      alert(`Template "${templates.find((t) => t.id === templateId)?.name}" selected successfully!`);
    } catch (error) {
      alert('Error deploying template');
      console.error(error);
    } finally {
      setDeploying(null);
    }
  };

  const renderPreview = (templateId) => {
    const previewStyles = {
      dark: 'bg-[#0A0A0A] border-[#18181B]',
      light: 'bg-white border-gray-200',
      modern: 'bg-gradient-to-br from-[#0F172A] via-purple-900/20 to-[#0F172A] border-white/20',
    };

    return (
      <div className={`h-32 rounded-lg border-2 ${previewStyles[templateId] || previewStyles.dark} p-4 flex items-center justify-center`}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            templateId === 'light' ? 'text-[#1F2937]' : 'text-white'
          }`}>
            {templates.find((t) => t.id === templateId)?.name}
          </div>
          <div className={`text-xs mt-2 ${
            templateId === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Preview
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Choose Your Template</h1>
        <p className="text-text-secondary mb-8">Select a design that matches your style</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-card rounded-xl border-2 overflow-hidden transition-all ${
                profile?.template === template.id
                  ? 'border-purple-main shadow-lg shadow-purple-main/20'
                  : 'border-zinc-800 hover:border-zinc-700 hover:scale-[1.02]'
              }`}
            >
              {/* Preview */}
              <div className="h-48 bg-zinc-900 p-4">
                {renderPreview(template.id)}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-text-primary">{template.name}</h3>
                  {profile?.template === template.id && (
                    <span className="px-3 py-1 bg-green-main text-white text-xs font-semibold rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-text-secondary text-sm mb-4">{template.description}</p>

                {/* Color Palette */}
                <div className="flex gap-2 mb-4">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border border-zinc-800"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(`/${profile?.subdomain || 'preview'}?template=${template.id}`, '_blank')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg font-medium transition-all"
                  >
                    <Eye size={18} />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDeploy(template.id)}
                    disabled={deploying === template.id || profile?.template === template.id}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      profile?.template === template.id
                        ? 'bg-zinc-800 text-text-secondary cursor-not-allowed'
                        : 'bg-purple-main hover:bg-purple-hover text-white'
                    }`}
                  >
                    <Rocket size={18} />
                    {deploying === template.id ? 'Deploying...' : profile?.template === template.id ? 'Active' : 'Deploy'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
