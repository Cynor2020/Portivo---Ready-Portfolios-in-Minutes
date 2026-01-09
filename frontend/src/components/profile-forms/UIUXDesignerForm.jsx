import { useState } from 'react';
import { Upload, X, Plus, Calendar, MapPin, Mail, Phone, Link as LinkIcon, FileText, Users, Award, BookOpen, Briefcase, Monitor, Smartphone, Palette, Layers, Wrench, Image as ImageIcon, MonitorSmartphone, Tablet, Laptop, Figma, Dribbble,
  FileImage, User } from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';

const UIUXDesignerForm = ({ profile, onChange, errors = {}, activeSection, onSectionChange }) => {
  const [internalTab, setInternalTab] = useState('identity');
  const currentTab = activeSection || internalTab;

  const handleTabChange = (tabId) => {
    if (onSectionChange) {
      onSectionChange(tabId);
    } else {
      setInternalTab(tabId);
    }
  };

  // Helper functions
  const handleArrayChange = (field, index, value, subField = null) => {
    const newArray = [...(profile[field] || [])];
    if (subField) {
      newArray[index] = { ...newArray[index], [subField]: value };
    } else {
      newArray[index] = value;
    }
    onChange({ target: { name: field, value: newArray } });
  };

  const addArrayItem = (field, defaultItem = {}) => {
    const newArray = [...(profile[field] || []), defaultItem];
    onChange({ target: { name: field, value: newArray } });
  };

  const removeArrayItem = (field, index) => {
    const newArray = (profile[field] || []).filter((_, i) => i !== index);
    onChange({ target: { name: field, value: newArray } });
  };

  // Identity section
  const renderIdentitySection = () => {
    // Return empty div if profile is not defined
    if (!profile) {
      return <div className="space-y-6"></div>;
    }
    
    return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Identity & Branding</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="identity.name"
              value={profile.identity?.name || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
            {errors.identity?.name && <p className="text-red-500 text-sm mt-1">{errors.identity.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar
            </label>
            <ImageUpload
              value={profile.identity?.avatar || ''}
              onChange={(value) => onChange({ target: { name: 'identity.avatar', value } })}
              folder="avatars"
              label="Upload Avatar"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role(s) (comma separated) *
            </label>
            <input
              type="text"
              name="identity.roles"
              value={profile.identity?.tagline || ''}
              onChange={(e) => {
                const roles = e.target.value.split(',').map(role => role.trim()).filter(role => role);
                onChange({ target: { name: 'identity.tagline', value: roles } });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., UI/UX Designer | Product Designer"
            />
            <p className="text-gray-500 text-sm mt-1">Separate multiple roles with commas</p>
            {errors.identity?.tagline && <p className="text-red-500 text-sm mt-1">{errors.identity.tagline}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Punchline *
            </label>
            <textarea
              name="identity.bio"
              value={profile.identity?.bio || ''}
              onChange={onChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1-2 lines about your design philosophy..."
            />
            {errors.identity?.bio && <p className="text-red-500 text-sm mt-1">{errors.identity.bio}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="identity.location"
              value={profile.identity?.location || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City, Country"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Projects Label
              </label>
              <input
                type="text"
                name="identity.viewProjectsLabel"
                value={profile.identity?.viewProjectsLabel || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., View Projects"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hire Me Label
              </label>
              <input
                type="text"
                name="identity.hireMeLabel"
                value={profile.identity?.hireMeLabel || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Hire Me"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Download Resume Label
              </label>
              <input
                type="text"
                name="identity.downloadResumeLabel"
                value={profile.identity?.downloadResumeLabel || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Download Resume"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Links
            </label>
            <div className="space-y-3">
              {['Behance', 'Dribbble', 'LinkedIn', 'Figma Community', 'Twitter/X', 'Adobe Portfolio'].map((platform, idx) => {
                const social = profile?.socials?.find(s => s.platform === platform);
                return (
                  <div key={platform} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <span className="w-24 text-sm text-gray-700">{platform}</span>
                    <input
                      type="text"
                      value={social?.url || ''}
                      onChange={(e) => {
                        let updatedSocials = profile.socials ? [...profile.socials] : [];
                        const existingIndex = updatedSocials.findIndex(s => s.platform === platform);
                        if (existingIndex > -1) {
                          updatedSocials[existingIndex].url = e.target.value;
                        } else {
                          updatedSocials.push({ platform, url: e.target.value });
                        }
                        onChange({ target: { name: 'socials', value: updatedSocials } });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter ${platform} URL`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume/CV Files
            </label>
            <div className="space-y-3">
              {(profile.identity?.resumeFiles || []).map((resume, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="text"
                    value={resume.name || ''}
                    onChange={(e) => {
                      const newResumes = [...(profile.identity?.resumeFiles || [])];
                      newResumes[index] = { ...newResumes[index], name: e.target.value };
                      onChange({ target: { name: 'identity.resumeFiles', value: newResumes } });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Full Resume, UI/UX Resume"
                  />
                  <input
                    type="text"
                    value={resume.url || ''}
                    onChange={(e) => {
                      const newResumes = [...(profile.identity?.resumeFiles || [])];
                      newResumes[index] = { ...newResumes[index], url: e.target.value };
                      onChange({ target: { name: 'identity.resumeFiles', value: newResumes } });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Resume file URL"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('identity.resumeFiles', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('identity.resumeFiles', { name: '', url: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  // About section
  const renderAboutSection = () => {
    // Return empty div if profile is not defined
    if (!profile) {
      return <div className="space-y-6"></div>;
    }
    
    return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Summary
            </label>
            <textarea
              name="about.summary"
              value={profile.about?.summary || ''}
              onChange={onChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell your professional design story..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="text"
                name="about.yearsOfExperience"
                value={profile.about?.yearsOfExperience || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2+ years / Fresher"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Status
              </label>
              <select
                name="about.currentStatus"
                value={profile.about?.currentStatus || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="Professional">Professional</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Student">Student</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Design Philosophy (comma separated)
            </label>
            <input
              type="text"
              name="about.designPhilosophy"
              value={profile.about?.designPhilosophy?.join(', ') || ''}
              onChange={(e) => {
                const philosophy = e.target.value.split(',').map(item => item.trim()).filter(item => item);
                onChange({ target: { name: 'about.designPhilosophy', value: philosophy } });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., User-centered design, Accessibility, Minimalism"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industries (comma separated)
            </label>
            <input
              type="text"
              name="about.industries"
              value={profile.about?.industries?.join(', ') || ''}
              onChange={(e) => {
                const industries = e.target.value.split(',').map(item => item.trim()).filter(item => item);
                onChange({ target: { name: 'about.industries', value: industries } });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Fintech, Healthcare, E-commerce"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {['Remote', 'Freelance', 'Full-time', 'Contract'].map(pref => (
                <label key={pref} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={profile.about?.workPreference?.includes(pref) || false}
                    onChange={(e) => {
                      const currentPrefs = profile.about?.workPreference || [];
                      let newPrefs;
                      if (e.target.checked) {
                        newPrefs = [...currentPrefs, pref];
                      } else {
                        newPrefs = currentPrefs.filter(p => p !== pref);
                      }
                      onChange({ target: { name: 'about.workPreference', value: newPrefs } });
                    }}
                    className="rounded text-blue-600"
                  />
                  <span>{pref}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  // Design Process section
  const renderDesignProcessSection = () => {
    // Return empty div if profile is not defined
    if (!profile) {
      return <div className="space-y-6"></div>;
    }
    
    return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Process</h3>
        
        <div className="space-y-4">
          {(profile.designProcess || []).map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Step {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('designProcess', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Title
                </label>
                <input
                  type="text"
                  value={step.title || ''}
                  onChange={(e) => handleArrayChange('designProcess', index, { ...step, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Step title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={step.description || ''}
                  onChange={(e) => handleArrayChange('designProcess', index, { ...step, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Step description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Name
                </label>
                <input
                  type="text"
                  value={step.icon || ''}
                  onChange={(e) => handleArrayChange('designProcess', index, { ...step, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Icon name"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('designProcess', { title: '', description: '', icon: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Design Process Step
          </button>
        </div>
      </div>
    </div>
  );
  };

  // Tools section
  const renderToolsSection = () => {
    // Return empty div if profile is not defined
    if (!profile) {
      return <div className="space-y-6"></div>;
    }
    
    return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools & Proficiency</h3>
        
        <div className="space-y-4">
          {(profile.tools || []).map((tool, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Tool {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('tools', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool Name
                </label>
                <input
                  type="text"
                  value={tool.name || ''}
                  onChange={(e) => handleArrayChange('tools', index, { ...tool, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tool name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proficiency Level
                  </label>
                  <select
                    value={tool.proficiency || ''}
                    onChange={(e) => handleArrayChange('tools', index, { ...tool, proficiency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select proficiency</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={tool.years || ''}
                    onChange={(e) => handleArrayChange('tools', index, { ...tool, years: parseInt(e.target.value) || '' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Years of experience"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('tools', { name: '', proficiency: '', years: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Tool
          </button>
        </div>
      </div>
    </div>
  );
  };

  // Case Studies section
  const renderCaseStudiesSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Case Studies</h3>
        
        <div className="space-y-4">
          {(profile.caseStudies || []).map((study, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Case Study {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('caseStudies', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={study.title || ''}
                  onChange={(e) => handleArrayChange('caseStudies', index, { ...study, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Case study title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client/Company
                  </label>
                  <input
                    type="text"
                    value={study.client || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, client: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Client/Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={study.projectType || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, projectType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Project Type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={study.duration || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Duration"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team
                  </label>
                  <input
                    type="text"
                    value={study.team || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, team: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Team"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Role
                  </label>
                  <input
                    type="text"
                    value={study.role || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Role"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Problem Statement
                </label>
                <textarea
                  value={study.problem || ''}
                  onChange={(e) => handleArrayChange('caseStudies', index, { ...study, problem: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Problem Statement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Research
                </label>
                <textarea
                  value={study.userResearch || ''}
                  onChange={(e) => handleArrayChange('caseStudies', index, { ...study, userResearch: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="User Research"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Persona Image
                  </label>
                  <ImageUpload
                    value={study.personaImages?.[0] || ''}
                    onChange={(url) => {
                      const updatedStudies = [...profile.caseStudies];
                      if (!updatedStudies[index].personaImages) updatedStudies[index].personaImages = [];
                      updatedStudies[index].personaImages[0] = url;
                      onChange({ target: { name: 'caseStudies', value: updatedStudies } });
                    }}
                    label="Upload Persona Image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Flow
                  </label>
                  <ImageUpload
                    value={study.userFlows?.[0] || ''}
                    onChange={(url) => {
                      const updatedStudies = [...profile.caseStudies];
                      if (!updatedStudies[index].userFlows) updatedStudies[index].userFlows = [];
                      updatedStudies[index].userFlows[0] = url;
                      onChange({ target: { name: 'caseStudies', value: updatedStudies } });
                    }}
                    label="Upload User Flow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Journey Map
                  </label>
                  <ImageUpload
                    value={study.journeyMaps?.[0] || ''}
                    onChange={(url) => {
                      const updatedStudies = [...profile.caseStudies];
                      if (!updatedStudies[index].journeyMaps) updatedStudies[index].journeyMaps = [];
                      updatedStudies[index].journeyMaps[0] = url;
                      onChange({ target: { name: 'caseStudies', value: updatedStudies } });
                    }}
                    label="Upload Journey Map"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wireframe
                  </label>
                  <ImageUpload
                    value={study.wireframes?.[0] || ''}
                    onChange={(url) => {
                      const updatedStudies = [...profile.caseStudies];
                      if (!updatedStudies[index].wireframes) updatedStudies[index].wireframes = [];
                      updatedStudies[index].wireframes[0] = url;
                      onChange({ target: { name: 'caseStudies', value: updatedStudies } });
                    }}
                    label="Upload Wireframe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    High-Fi Design
                  </label>
                  <ImageUpload
                    value={study.highFiDesigns?.[0] || ''}
                    onChange={(url) => {
                      const updatedStudies = [...profile.caseStudies];
                      if (!updatedStudies[index].highFiDesigns) updatedStudies[index].highFiDesigns = [];
                      updatedStudies[index].highFiDesigns[0] = url;
                      onChange({ target: { name: 'caseStudies', value: updatedStudies } });
                    }}
                    label="Upload High-Fi Design"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prototype Link
                  </label>
                  <input
                    type="text"
                    value={study.prototypeLink || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, prototypeLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Prototype Link"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usability Testing Results
                </label>
                <textarea
                  value={study.usabilityTesting || ''}
                  onChange={(e) => handleArrayChange('caseStudies', index, { ...study, usabilityTesting: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Usability Testing Results"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Decisions
                  </label>
                  <textarea
                    value={study.keyDecisions || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, keyDecisions: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Key Decisions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trade-offs
                  </label>
                  <textarea
                    value={study.tradeoffs || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, tradeoffs: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Trade-offs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Outcomes
                  </label>
                  <textarea
                    value={study.outcomes || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, outcomes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Outcomes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metrics
                  </label>
                  <textarea
                    value={study.metrics || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, metrics: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Metrics"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Before/After Image
                  </label>
                  <ImageUpload
                    value={study.beforeAfterImages?.[0] || ''}
                    onChange={(url) => {
                      const updatedStudies = [...profile.caseStudies];
                      if (!updatedStudies[index].beforeAfterImages) updatedStudies[index].beforeAfterImages = [];
                      updatedStudies[index].beforeAfterImages[0] = url;
                      onChange({ target: { name: 'caseStudies', value: updatedStudies } });
                    }}
                    label="Upload Before/After Image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live Link
                  </label>
                  <input
                    type="text"
                    value={study.liveLink || ''}
                    onChange={(e) => handleArrayChange('caseStudies', index, { ...study, liveLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Live Link"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lessons Learned
                </label>
                <textarea
                  value={study.lessonsLearned || ''}
                  onChange={(e) => handleArrayChange('caseStudies', index, { ...study, lessonsLearned: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Lessons Learned"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('caseStudies', { 
              title: '', 
              client: '', 
              projectType: '', 
              duration: '', 
              team: '', 
              role: '', 
              problem: '', 
              userResearch: '', 
              personaImages: [], 
              userFlows: [], 
              journeyMaps: [], 
              wireframes: [], 
              highFiDesigns: [], 
              prototypeLink: '', 
              usabilityTesting: '', 
              keyDecisions: '', 
              tradeoffs: '', 
              outcomes: '', 
              metrics: '', 
              beforeAfterImages: [], 
              liveLink: '', 
              lessonsLearned: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Case Study
          </button>
        </div>
      </div>
    </div>
  );

  // Visual Portfolio section
  const renderVisualPortfolioSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Portfolio / Selected Work</h3>
        
        <div className="space-y-4">
          {(profile.visualPortfolio || []).map((work, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Work {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('visualPortfolio', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Image
                </label>
                <ImageUpload
                  value={work.image || ''}
                  onChange={(url) => handleArrayChange('visualPortfolio', index, { ...work, image: url })}
                  label="Upload Portfolio Image"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={work.title || ''}
                  onChange={(e) => handleArrayChange('visualPortfolio', index, { ...work, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={work.caption || ''}
                  onChange={(e) => handleArrayChange('visualPortfolio', index, { ...work, caption: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Caption"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Study Link (optional)
                </label>
                <input
                  type="text"
                  value={work.caseStudyLink || ''}
                  onChange={(e) => handleArrayChange('visualPortfolio', index, { ...work, caseStudyLink: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Case Study Link (optional)"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('visualPortfolio', { image: '', title: '', caption: '', caseStudyLink: '' })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Work
          </button>
        </div>
      </div>
    </div>
  );

  // Experience section
  const renderExperienceSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
        
        <div className="space-y-4">
          {(profile.experience || []).map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('experience', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Client
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleArrayChange('experience', index, { ...exp, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company/Client"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={exp.position || ''}
                    onChange={(e) => handleArrayChange('experience', index, { ...exp, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Role"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={exp.startDate || ''}
                    onChange={(e) => handleArrayChange('experience', index, { ...exp, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Start Date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={exp.endDate || ''}
                    onChange={(e) => handleArrayChange('experience', index, { ...exp, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="End Date (or 'Present')"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Description
                </label>
                <textarea
                  value={exp.description || ''}
                  onChange={(e) => handleArrayChange('experience', index, { ...exp, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Role description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities
                </label>
                <textarea
                  value={exp.responsibilities || ''}
                  onChange={(e) => handleArrayChange('experience', index, { ...exp, responsibilities: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Responsibilities"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements/Metrics
                </label>
                <textarea
                  value={exp.achievements || ''}
                  onChange={(e) => handleArrayChange('experience', index, { ...exp, achievements: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Achievements/Metrics"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('experience', { 
              company: '', 
              position: '', 
              startDate: '', 
              endDate: '', 
              description: '', 
              responsibilities: '', 
              achievements: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );

  // Education section
  const renderEducationSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
der-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Education & Certifications</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Education</h4>
            <div className="space-y-4">
              {(profile.education || []).map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">Education {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('education', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree || ''}
                      onChange={(e) => handleArrayChange('education', index, { ...edu, degree: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Degree"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution || ''}
                      onChange={(e) => handleArrayChange('education', index, { ...edu, institution: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Institution"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="text"
                        value={edu.startDate || ''}
                        onChange={(e) => handleArrayChange('education', index, { ...edu, startDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Start Date"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="text"
                        value={edu.endDate || ''}
                        onChange={(e) => handleArrayChange('education', index, { ...edu, endDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('education', { 
                  degree: '', 
                  institution: '', 
                  startDate: '', 
                  endDate: '' 
                })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Education
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Certifications</h4>
            <div className="space-y-4">
              {(profile.certifications || []).map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">Certification {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('certifications', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certification Name
                    </label>
                    <input
                      type="text"
                      value={cert.name || ''}
                      onChange={(e) => handleArrayChange('certifications', index, { ...cert, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Certification name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issuer
                    </label>
                    <input
                      type="text"
                      value={cert.issuer || ''}
                      onChange={(e) => handleArrayChange('certifications', index, { ...cert, issuer: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Issuer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="text"
                      value={cert.date || ''}
                      onChange={(e) => handleArrayChange('certifications', index, { ...cert, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Date"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credential Link (optional)
                    </label>
                    <input
                      type="text"
                      value={cert.credentialLink || ''}
                      onChange={(e) => handleArrayChange('certifications', index, { ...cert, credentialLink: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Credential Link (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Image (optional)
                    </label>
                    <ImageUpload
                      value={cert.certificateImage || ''}
                      onChange={(url) => handleArrayChange('certifications', index, { ...cert, certificateImage: url })}
                      label="Upload Certificate Image (optional)"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('certifications', { 
                  name: '', 
                  issuer: '', 
                  date: '', 
                  credentialLink: '', 
                  certificateImage: '' 
                })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Certification
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Achievements section
  const renderAchievementsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
der-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements & Recognition</h3>
        
        <div className="space-y-4">
          {(profile.achievements || []).map((achievement, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Achievement {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('achievements', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={achievement.title || ''}
                  onChange={(e) => handleArrayChange('achievements', index, { ...achievement, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={achievement.description || ''}
                  onChange={(e) => handleArrayChange('achievements', index, { ...achievement, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={achievement.date || ''}
                    onChange={(e) => handleArrayChange('achievements', index, { ...achievement, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proof Link
                  </label>
                  <input
                    type="text"
                    value={achievement.proofLink || ''}
                    onChange={(e) => handleArrayChange('achievements', index, { ...achievement, proofLink: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Link (optional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image (optional)
                </label>
                <ImageUpload
                  value={achievement.image || ''}
                  onChange={(url) => handleArrayChange('achievements', index, { ...achievement, image: url })}
                  label="Upload Image (optional)"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('achievements', { 
              title: '', 
              description: '', 
              date: '', 
              proofLink: '', 
              image: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Achievement
          </button>
        </div>
      </div>
    </div>
  );

  // Testimonials section
  const renderTestimonialsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Testimonials</h3>
        
        <div className="space-y-4">
          {(profile.testimonials || []).map((testimonial, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Testimonial {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('testimonials', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={testimonial.name || ''}
                  onChange={(e) => handleArrayChange('testimonials', index, { ...testimonial, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={testimonial.role || ''}
                    onChange={(e) => handleArrayChange('testimonials', index, { ...testimonial, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Role"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={testimonial.company || ''}
                    onChange={(e) => handleArrayChange('testimonials', index, { ...testimonial, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial Text
                </label>
                <textarea
                  value={testimonial.text || ''}
                  onChange={(e) => handleArrayChange('testimonials', index, { ...testimonial, text: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Testimonial text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo (optional)
                </label>
                <ImageUpload
                  value={testimonial.photo || ''}
                  onChange={(url) => handleArrayChange('testimonials', index, { ...testimonial, photo: url })}
                  label="Upload photo (optional)"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('testimonials', { 
              name: '', 
              role: '', 
              company: '', 
              text: '', 
              photo: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Testimonial
          </button>
        </div>
      </div>
    </div>
  );

  // Services section
  const renderServicesSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h3>
        
        <div className="space-y-4">
          {(profile.services || []).map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Service {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('services', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => handleArrayChange('services', index, { ...service, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Service name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={service.description || ''}
                  onChange={(e) => handleArrayChange('services', index, { ...service, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Short description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Name (optional)
                </label>
                <input
                  type="text"
                  value={service.icon || ''}
                  onChange={(e) => handleArrayChange('services', index, { ...service, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Icon name (optional)"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('services', { 
              title: '', 
              description: '', 
              icon: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>
      </div>
    </div>
  );

  // Availability section
  const renderAvailabilitySection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability & Pricing</h3>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability.openToWork"
              checked={profile.availability?.openToWork || false}
              onChange={(e) => onChange({ target: { name: 'availability.openToWork', value: e.target.checked } })}
              className="rounded text-blue-600"
            />
            <label className="text-sm font-medium text-gray-700">
              Open to Work
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Preference
            </label>
            <div className="flex flex-wrap gap-2">
              {['Freelance', 'Full-time', 'Contract', 'Part-time'].map(pref => (
                <label key={pref} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={profile.availability?.workTypes?.includes(pref) || false}
                    onChange={(e) => {
                      const currentPrefs = profile.availability?.workTypes || [];
                      let newPrefs;
                      if (e.target.checked) {
                        newPrefs = [...currentPrefs, pref];
                      } else {
                        newPrefs = currentPrefs.filter(p => p !== pref);
                      }
                      onChange({ target: { name: 'availability.workTypes', value: newPrefs } });
                    }}
                    className="rounded text-blue-600"
                  />
                  <span>{pref}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate Range
            </label>
            <input
              type="text"
              name="availability.hourlyRate"
              value={profile.availability?.hourlyRate || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., $50-80/hr | Project based"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability.ndaReady"
              checked={profile.availability?.ndaReady || false}
              onChange={(e) => onChange({ target: { name: 'availability.ndaReady', value: e.target.checked } })}
              className="rounded text-blue-600"
            />
            <label className="text-sm font-medium text-gray-700">
              NDA Ready
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calendly / Meeting Link
            </label>
            <input
              type="text"
              name="availability.calendlyLink"
              value={profile.availability?.calendlyLink || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://calendly.com/username"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Contact section
  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="identity.email"
              value={profile.identity?.email || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone (optional)
            </label>
            <input
              type="tel"
              name="identity.phone"
              value={profile.identity?.phone || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calendly / Meeting Link
            </label>
            <input
              type="text"
              name="identity.calendlyLink"
              value={profile.identity?.calendlyLink || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://calendly.com/username"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render the form based on active tab
  const renderActiveTab = () => {
    switch (currentTab) {
      case 'identity':
        return renderIdentitySection();
      case 'about':
        return renderAboutSection();
      case 'designProcess':
        return renderDesignProcessSection();
      case 'tools':
        return renderToolsSection();
      case 'caseStudies':
        return renderCaseStudiesSection();
      case 'visualPortfolio':
        return renderVisualPortfolioSection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'achievements':
        return renderAchievementsSection();
      case 'testimonials':
        return renderTestimonialsSection();
      case 'services':
        return renderServicesSection();
      case 'availability':
        return renderAvailabilitySection();
      case 'contact':
        return renderContactSection();
      default:
        return renderIdentitySection();
    }
  };

  return (
    <div className="space-y-6 profile-form">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-xl">
          {[
            { id: 'identity', label: 'Identity', icon: User },
            { id: 'about', label: 'About', icon: User },
            { id: 'designProcess', label: 'Design Process', icon: Palette },
            { id: 'tools', label: 'Tools', icon: Wrench },
            { id: 'caseStudies', label: 'Case Studies', icon: FileText },
            { id: 'visualPortfolio', label: 'Visual Portfolio', icon: ImageIcon },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: BookOpen },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'testimonials', label: 'Testimonials', icon: Users },
            { id: 'services', label: 'Services', icon: Layers },
            { id: 'availability', label: 'Availability', icon: Calendar },
            { id: 'contact', label: 'Contact', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      {renderActiveTab()}
    </div>
  );
}

export default UIUXDesignerForm;