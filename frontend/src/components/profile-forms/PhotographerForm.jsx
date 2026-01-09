import { useState } from 'react';
import { Camera, User, Image, Award, Star, Mail, Phone, MapPin, Link as LinkIcon, Plus, Trash2, Edit3, ExternalLink, Globe, Instagram, Twitter, Facebook, Youtube, Linkedin, Hash, Calendar, Briefcase, GraduationCap, FileText, Users, Heart, StarHalf, MessageCircle, Settings, Save, X } from 'lucide-react';
import ImageUpload from '../ImageUpload';

const PhotographerForm = ({ profile, onChange, errors = {}, activeSection, onSectionChange }) => {
  const [internalTab, setInternalTab] = useState('identity');
  const currentTab = activeSection || internalTab;

  const handleTabChange = (tabId) => {
    if (onSectionChange) {
      onSectionChange(tabId);
    } else {
      setInternalTab(tabId);
    }
  };
  // Helper functions for array management
  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...profile[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    onChange({ target: { name: arrayName, value: newArray } });
  };

  const addArrayItem = (arrayName, newItem) => {
    onChange({ target: { name: arrayName, value: [...(profile[arrayName] || []), newItem] } });
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = profile[arrayName].filter((_, i) => i !== index);
    onChange({ target: { name: arrayName, value: newArray } });
  };
  
  // Render active tab content
  const renderActiveTab = () => {
    switch (currentTab) {
      case 'identity':
        return renderIdentitySection();
      case 'about':
        return renderAboutSection();
      case 'portfolio':
        return renderPortfolioSection();
      case 'skills':
        return renderSkillsSection();
      case 'experience':
        return renderExperienceSection();
      case 'education':
        return renderEducationSection();
      case 'certifications':
        return renderCertificationsSection();
      case 'achievements':
        return renderAchievementsSection();
      case 'testimonials':
        return renderTestimonialsSection();
      case 'services':
        return renderServicesSection();
      case 'availability':
        return renderAvailabilitySection();
      case 'social':
        return renderSocialLinksSection();
      case 'contact':
        return renderContactSection();
      default:
        return renderIdentitySection();
    }
  };
  
  // Identity Section
  const renderIdentitySection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-purple-600" />
          Identity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photography Title *</label>
            <input
              type="text"
              name="photographyTitle"
              value={profile.photographyTitle || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Professional Portrait Photographer"
            />
            {errors.photographyTitle && <p className="text-red-500 text-sm mt-1">{errors.photographyTitle}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <ImageUpload
              value={profile.profileImage || ''}
              onChange={(value) => onChange({ target: { name: 'profileImage', value } })}
              aspect={1}
              className="w-32 h-32"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <ImageUpload
              value={profile.coverImage || ''}
              onChange={(value) => onChange({ target: { name: 'coverImage', value } })}
              aspect={16/9}
              className="w-full h-48"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // About Section
  const renderAboutSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Edit3 className="w-5 h-5 mr-2 text-purple-600" />
          About
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
            <textarea
              name="bio"
              value={profile.bio || ''}
              onChange={onChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell us about your photography journey and style..."
            />
            {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={profile.location || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={profile.yearsOfExperience || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Years"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Portfolio Section
  const renderPortfolioSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Image className="w-5 h-5 mr-2 text-purple-600" />
          Portfolio
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Images</label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(profile.portfolioImages || []).map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image.url} 
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeArrayItem('portfolioImages', index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={image.caption || ''}
                    onChange={(e) => handleArrayChange('portfolioImages', index, 'caption', e.target.value)}
                    placeholder="Caption"
                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addArrayItem('portfolioImages', { url: '', caption: '' })}
              className="mt-4 flex items-center text-purple-600 hover:text-purple-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Portfolio Image
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
            <textarea
              name="specializations"
              value={profile.specializations || ''}
              onChange={onChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Portrait, Wedding, Landscape, Fashion, Commercial..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Skills Section
  const renderSkillsSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-600" />
          Skills
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
            <textarea
              name="technicalSkills"
              value={profile.technicalSkills || ''}
              onChange={onChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., DSLR, Lighting, Post-processing, Photoshop, Lightroom, Composition..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Artistic Skills</label>
            <textarea
              name="artisticSkills"
              value={profile.artisticSkills || ''}
              onChange={onChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Composition, Color Theory, Storytelling, Visual Aesthetics..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Experience Section
  const renderExperienceSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
          Experience
        </h3>
        <div className="space-y-4">
          {(profile.experience || []).map((exp, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeArrayItem('experience', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your position"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave empty if current"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your role and responsibilities"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('experience', { position: '', company: '', startDate: '', endDate: '', description: '' })}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );

  // Education Section
  const renderEducationSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
          Education
        </h3>
        <div className="space-y-4">
          {(profile.education || []).map((edu, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeArrayItem('education', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree/Certificate</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Degree or certification"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="School or institution"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                  <input
                    type="number"
                    value={edu.startYear}
                    onChange={(e) => handleArrayChange('education', index, 'startYear', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2015"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                  <input
                    type="number"
                    value={edu.endYear}
                    onChange={(e) => handleArrayChange('education', index, 'endYear', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2019"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional details..."
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('education', { degree: '', institution: '', startYear: '', endYear: '', description: '' })}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Education
          </button>
        </div>
      </div>
    </div>
  );

  // Certifications Section
  const renderCertificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-600" />
          Certifications
        </h3>
        <div className="space-y-4">
          {(profile.certifications || []).map((cert, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeArrayItem('certifications', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Certification name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.organization}
                    onChange={(e) => handleArrayChange('certifications', index, 'organization', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Organization"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                  <input
                    type="date"
                    value={cert.issueDate}
                    onChange={(e) => handleArrayChange('certifications', index, 'issueDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => handleArrayChange('certifications', index, 'credentialId', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Credential ID"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={cert.description}
                    onChange={(e) => handleArrayChange('certifications', index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional details..."
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('certifications', { name: '', organization: '', issueDate: '', credentialId: '', description: '' })}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Certification
          </button>
        </div>
      </div>
    </div>
  );

  // Achievements Section
  const renderAchievementsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-purple-600" />
          Achievements
        </h3>
        <div className="space-y-4">
          {(profile.achievements || []).map((achievement, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeArrayItem('achievements', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Title</label>
                  <input
                    type="text"
                    value={achievement.title}
                    onChange={(e) => handleArrayChange('achievements', index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Achievement title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={achievement.date}
                    onChange={(e) => handleArrayChange('achievements', index, 'date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={achievement.description}
                    onChange={(e) => handleArrayChange('achievements', index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the achievement..."
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('achievements', { title: '', date: '', description: '' })}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Achievement
          </button>
        </div>
      </div>
    </div>
  );

  // Testimonials Section
  const renderTestimonialsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
          Testimonials
        </h3>
        <div className="space-y-4">
          {(profile.testimonials || []).map((testimonial, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeArrayItem('testimonials', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial</label>
                  <textarea
                    value={testimonial.testimonial}
                    onChange={(e) => handleArrayChange('testimonials', index, 'testimonial', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Client testimonial..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={testimonial.clientName}
                      onChange={(e) => handleArrayChange('testimonials', index, 'clientName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <select
                      value={testimonial.rating}
                      onChange={(e) => handleArrayChange('testimonials', index, 'rating', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select rating</option>
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                    <input
                      type="text"
                      value={testimonial.project}
                      onChange={(e) => handleArrayChange('testimonials', index, 'project', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Project name"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('testimonials', { testimonial: '', clientName: '', rating: 5, project: '' })}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Testimonial
          </button>
        </div>
      </div>
    </div>
  );

  // Services Section
  const renderServicesSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-purple-600" />
          Services
        </h3>
        <div className="space-y-4">
          {(profile.services || []).map((service, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
              <button
                type="button"
                onClick={() => removeArrayItem('services', index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    value={service.name}
                    onChange={(e) => handleArrayChange('services', index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Service name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    value={service.price}
                    onChange={(e) => handleArrayChange('services', index, 'price', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., $100/hour or $500/package"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the service..."
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('services', { name: '', price: '', description: '' })}
            className="flex items-center text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Service
          </button>
        </div>
      </div>
    </div>
  );

  // Availability Section
  const renderAvailabilitySection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Availability
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available For</label>
            <select
              name="availableFor"
              value={profile.availableFor || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select availability</option>
              <option value="freelance">Freelance Projects</option>
              <option value="full-time">Full-time Work</option>
              <option value="part-time">Part-time Work</option>
              <option value="contract">Contract Work</option>
              <option value="consultation">Consultation</option>
              <option value="not-available">Not Available</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Response Time</label>
            <select
              name="responseTime"
              value={profile.responseTime || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select response time</option>
              <option value="same-day">Same Day</option>
              <option value="within-24h">Within 24 Hours</option>
              <option value="within-48h">Within 48 Hours</option>
              <option value="within-week">Within a Week</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability Notes</label>
            <textarea
              name="availabilityNotes"
              value={profile.availabilityNotes || ''}
              onChange={onChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes about your availability..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Social Links Section
  const renderSocialLinksSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <LinkIcon className="w-5 h-5 mr-2 text-purple-600" />
          Social Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Globe className="w-5 h-5 mr-2 text-gray-500" />
            <input
              type="url"
              name="website"
              value={profile.website || ''}
              onChange={onChange}
              placeholder="Website URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <Instagram className="w-5 h-5 mr-2 text-gray-500" />
            <input
              type="url"
              name="instagram"
              value={profile.instagram || ''}
              onChange={onChange}
              placeholder="Instagram URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <Twitter className="w-5 h-5 mr-2 text-gray-500" />
            <input
              type="url"
              name="twitter"
              value={profile.twitter || ''}
              onChange={onChange}
              placeholder="Twitter URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <Facebook className="w-5 h-5 mr-2 text-gray-500" />
            <input
              type="url"
              name="facebook"
              value={profile.facebook || ''}
              onChange={onChange}
              placeholder="Facebook URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <Linkedin className="w-5 h-5 mr-2 text-gray-500" />
            <input
              type="url"
              name="linkedin"
              value={profile.linkedin || ''}
              onChange={onChange}
              placeholder="LinkedIn URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center">
            <Hash className="w-5 h-5 mr-2 text-gray-500" />
            <input
              type="url"
              name="behance"
              value={profile.behance || ''}
              onChange={onChange}
              placeholder="Behance URL"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Section
  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-purple-600" />
          Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your phone number"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your address"
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  
  return (
    <div className="space-y-6 profile-form">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-1 p-2 bg-gray-50 rounded-xl">
          {[
            { id: 'identity', label: 'Identity', icon: User },
            { id: 'about', label: 'About', icon: Edit3 },
            { id: 'portfolio', label: 'Portfolio', icon: Image },
            { id: 'skills', label: 'Skills', icon: Award },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'achievements', label: 'Achievements', icon: Star },
            { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
            { id: 'services', label: 'Services', icon: Settings },
            { id: 'availability', label: 'Availability', icon: Calendar },
            { id: 'social', label: 'Social Links', icon: LinkIcon },
            { id: 'contact', label: 'Contact', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
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

export default PhotographerForm;
