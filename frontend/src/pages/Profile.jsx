import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PublishDialog from '../components/PublishDialog';
import { Save } from 'lucide-react';
import getNavForType from '../utils/getNavForType';

// Lazy load form components
const DeveloperForm = React.lazy(() => import('../components/profile-forms/DeveloperForm'));
const UIUXDesignerForm = React.lazy(() => import('../components/profile-forms/UIUXDesignerForm'));
const GraphicDesignerForm = React.lazy(() => import('../components/profile-forms/GraphicDesignerForm'));
const DigitalMarketerForm = React.lazy(() => import('../components/profile-forms/DigitalMarketerForm'));
const ContentWriterForm = React.lazy(() => import('../components/profile-forms/ContentWriterForm'));
const PhotographerForm = React.lazy(() => import('../components/profile-forms/PhotographerForm'));

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/me');
      const data = response.data.data;
      setProfile(data);
      // Initialize active section based on type-specific nav
      const initialNav = getNavForType(data?.portfolioType);
      if (initialNav.length && !activeSection) {
        setActiveSection(initialNav[0].sectionId);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateProfile = (currentProfile) => {
    const nextErrors = {};
    const type = currentProfile?.portfolioType;

    if (type === 'Developer' || type === 'UI/UX Designer' || type === 'Graphic Designer' || type === 'Digital Marketer' || type === 'Content Writer') {
      if (!currentProfile?.identity?.name) {
        nextErrors.identity = { ...(nextErrors.identity || {}), name: 'Name is required' };
      }
      if (!currentProfile?.identity?.bio) {
        nextErrors.identity = { ...(nextErrors.identity || {}), bio: 'Short bio is required' };
      }
    }

    if (type === 'Photographer') {
      if (!currentProfile?.fullName) {
        nextErrors.fullName = 'Full name is required';
      }
      if (!currentProfile?.photographyTitle) {
        nextErrors.photographyTitle = 'Photography title is required';
      }
      if (!currentProfile?.bio) {
        nextErrors.bio = 'Bio is required';
      }
    }

    return nextErrors;
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target || {};

    // If no name is provided, assume entire profile object is being replaced
    if (!name) {
      setProfile(value);
      setErrors(validateProfile(value || {}));
      return;
    }

    setProfile((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      const path = name.split('.');
      let cursor = updated;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (cursor[key] == null || typeof cursor[key] !== 'object') {
          cursor[key] = {};
        }
        cursor = cursor[key];
      }

      cursor[path[path.length - 1]] = value;

      // Recompute validation on every change for real-time feedback
      setErrors(validateProfile(updated));
      return updated;
    });
  };

  const handleSave = async () => {
    if (!profile) return;

    const validationErrors = validateProfile(profile);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      alert('Please fix the highlighted errors before saving.');
      return;
    }

    setSaving(true);
    try {
      await api.put('/profiles/me', profile);
      // Show publish dialog if no subdomain exists
      if (!profile.subdomain) {
        setShowPublishDialog(true);
      } else {
        alert('Profile saved successfully!');
      }
    } catch (error) {
      alert('Error saving profile');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = (publishedProfile) => {
    setProfile(publishedProfile);
    setShowPublishDialog(false);
    alert(`Portfolio published successfully! Visit: ${publishedProfile.subdomain}.portivo.com`);
  };

  const portfolioType = profile?.portfolioType;

  const navItems = useMemo(() => getNavForType(portfolioType), [portfolioType]);

  useEffect(() => {
    if (navItems.length && !activeSection) {
      setActiveSection(navItems[0].sectionId);
    }
  }, [navItems, activeSection]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-primary">Loading...</div>
      </div>
    );
  }

  // Render the appropriate form based on portfolio type
  const renderForm = () => {
    if (!portfolioType) {
      return (
        <div className="text-center py-8">
          <p className="text-text-secondary">Please select a portfolio type in Settings.</p>
        </div>
      );
    }

    const commonProps = {
      profile,
      onChange: handleFieldChange,
      errors,
      activeSection,
      onSectionChange: setActiveSection,
    };

    switch (portfolioType) {
      case 'Developer':
        return (
          <React.Suspense fallback={<div className="text-center py-8 text-text-secondary">Loading your form...</div>}>
            <DeveloperForm {...commonProps} />
          </React.Suspense>
        );
      case 'UI/UX Designer':
        return (
          <React.Suspense fallback={<div className="text-center py-8 text-text-secondary">Loading your form...</div>}>
            <UIUXDesignerForm {...commonProps} />
          </React.Suspense>
        );
      case 'Graphic Designer':
        return (
          <React.Suspense fallback={<div className="text-center py-8 text-text-secondary">Loading your form...</div>}>
            <GraphicDesignerForm {...commonProps} />
          </React.Suspense>
        );
      case 'Digital Marketer':
        return (
          <React.Suspense fallback={<div className="text-center py-8 text-text-secondary">Loading your form...</div>}>
            <DigitalMarketerForm {...commonProps} />
          </React.Suspense>
        );
      case 'Content Writer':
        return (
          <React.Suspense fallback={<div className="text-center py-8 text-text-secondary">Loading your form...</div>}>
            <ContentWriterForm {...commonProps} />
          </React.Suspense>
        );
      case 'Photographer':
        return (
          <React.Suspense fallback={<div className="text-center py-8 text-text-secondary">Loading your form...</div>}>
            <PhotographerForm {...commonProps} />
          </React.Suspense>
        );
      default:
        return (
          <div className="text-center py-8">
            <p className="text-text-secondary">Please select a portfolio type in Settings.</p>
          </div>
        );
    }
  };

  const getProfileTitle = () => {
    if (!portfolioType) {
      return 'Please select a Portfolio Type in Settings';
    }
    return `Editing your ${portfolioType} Portfolio`;
  };

  return (
    <div className="min-h-screen bg-background p-6 lg:pl-72">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary bg-gradient-to-r from-purple-main via-purple-hover to-white bg-clip-text text-transparent">
              {getProfileTitle()}
            </h1>
            <p className="mt-2 text-sm text-text-secondary max-w-2xl">
              Craft a stunning, conversion-focused portfolio. Use the sections below to tell a complete, premium story about your work.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-purple-main px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-main/30 transition-all hover:bg-purple-hover hover:shadow-purple-hover/40 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            <Save size={18} />
            {saving ? 'Saving…' : 'Save Portfolio'}
          </button>
        </div>

        {/* Type-specific sub navigation */}
        {portfolioType && navItems.length > 0 && (
          <div className="mb-6">
            <div className="relative rounded-2xl bg-gradient-to-r from-zinc-900/80 via-zinc-900 to-zinc-900/80 p-[1px] shadow-lg shadow-black/40">
              <div className="profile-tabs-scroll flex items-center gap-2 overflow-x-auto rounded-2xl bg-zinc-950/80 px-2 py-2 backdrop-blur">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.sectionId;
                  return (
                    <button
                      key={item.sectionId}
                      type="button"
                      onClick={() => setActiveSection(item.sectionId)}
                      className={`group flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all md:px-5 ${
                        isActive
                          ? 'bg-purple-main text-white shadow-md shadow-purple-main/40 scale-[1.02]'
                          : 'bg-zinc-900/70 text-text-secondary hover:bg-zinc-800 hover:text-text-primary hover:scale-[1.02]'
                      }`}
                    >
                      {Icon && (
                        <Icon
                          size={16}
                          className={isActive ? 'text-white' : 'text-purple-main group-hover:text-purple-hover'}
                        />
                      )}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="mt-2 text-xs text-text-secondary">
              Tip: Move through each tab from left to right to build a complete story. On mobile, swipe the tabs horizontally.
            </p>
          </div>
        )}

        {/* Active form */}
        <div className="space-y-6">
          {renderForm()}
        </div>
      </div>

      {/* Publish Dialog */}
      <PublishDialog
        isOpen={showPublishDialog}
        onClose={() => setShowPublishDialog(false)}
        onPublish={handlePublish}
      />
    </div>
  );
};

export default Profile;