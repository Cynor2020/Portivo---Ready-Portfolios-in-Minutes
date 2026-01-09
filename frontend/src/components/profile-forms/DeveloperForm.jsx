import { useState } from 'react';
import { X, Plus, Calendar, Mail, FileText, Code, Users, Award, BookOpen, Briefcase, GitBranch, MessageCircle, Settings, User, Folder, GraduationCap, Trophy } from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';

const DeveloperForm = ({ profile, onChange, errors = {}, activeSection, onSectionChange }) => {
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
  const renderIdentitySection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Identity & Branding</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="identity.name"
              value={profile.identity?.name || ''}
              onChange={onChange}
              className="w-full px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-text-primary placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-main focus:border-purple-main/80"
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
              Roles/Title *
            </label>
            <input
              type="text"
              name="identity.roles"
              value={profile.identity?.roles?.join(', ') || ''}
              onChange={(e) => {
                const roles = e.target.value.split(',').map(role => role.trim()).filter(role => role);
                onChange({ target: { name: 'identity.roles', value: roles } });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full Stack Developer, UI/UX Designer, etc."
            />
            <p className="text-gray-500 text-sm mt-1">Separate multiple roles with commas</p>
            {errors.identity?.roles && <p className="text-red-500 text-sm mt-1">{errors.identity.roles}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value Proposition/Bio *
            </label>
            <textarea
              name="identity.bio"
              value={profile.identity?.bio || ''}
              onChange={onChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of what you do and your value proposition..."
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
              Phone
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
              Calendly Link
            </label>
            <input
              type="url"
              name="identity.calendlyLink"
              value={profile.identity?.calendlyLink || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://calendly.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Projects Button Label
            </label>
            <input
              type="text"
              name="identity.viewProjectsLabel"
              value={profile.identity?.viewProjectsLabel || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="View Projects"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hire Me Button Label
            </label>
            <input
              type="text"
              name="identity.hireMeLabel"
              value={profile.identity?.hireMeLabel || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Hire Me"
            />
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
                    placeholder="Resume name"
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

  // About section
  const renderAboutSection = () => (
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
              placeholder="Tell your professional story..."
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
                placeholder="e.g., 5+ years"
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
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Looking for work">Looking for work</option>
                <option value="Open to opportunities">Open to opportunities</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specializations (comma separated)
            </label>
            <input
              type="text"
              name="about.specializations"
              value={profile.about?.specializations?.join(', ') || ''}
              onChange={(e) => {
                const specializations = e.target.value.split(',').map(spec => spec.trim()).filter(spec => spec);
                onChange({ target: { name: 'about.specializations', value: specializations } });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., React, Node.js, Python, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {['Remote', 'Hybrid', 'On-site', 'Freelance', 'Full-time', 'Contract'].map(pref => (
                <label key={pref} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={profile.about?.workPreferences?.includes(pref) || false}
                    onChange={(e) => {
                      const currentPrefs = profile.about?.workPreferences || [];
                      let newPrefs;
                      if (e.target.checked) {
                        newPrefs = [...currentPrefs, pref];
                      } else {
                        newPrefs = currentPrefs.filter(p => p !== pref);
                      }
                      onChange({ target: { name: 'about.workPreferences', value: newPrefs } });
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

  // Skills section
  const renderSkillsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technical Skills
            </label>
            <div className="space-y-3">
              {(profile.skills?.technical || []).map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="text"
                    value={skill.name || ''}
                    onChange={(e) => handleArrayChange('skills.technical', index, { ...skill, name: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Skill name"
                  />
                  <select
                    value={skill.level || ''}
                    onChange={(e) => handleArrayChange('skills.technical', index, { ...skill, level: e.target.value })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('skills.technical', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('skills.technical', { name: '', level: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Technical Skill
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soft Skills
            </label>
            <div className="space-y-3">
              {(profile.skills?.soft || []).map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="text"
                    value={skill.name || ''}
                    onChange={(e) => handleArrayChange('skills.soft', index, { ...skill, name: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Skill name"
                  />
                  <select
                    value={skill.level || ''}
                    onChange={(e) => handleArrayChange('skills.soft', index, { ...skill, level: e.target.value })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('skills.soft', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('skills.soft', { name: '', level: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Soft Skill
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tools & Technologies
            </label>
            <div className="space-y-3">
              {(profile.skills?.tools || []).map((tool, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="text"
                    value={tool.name || ''}
                    onChange={(e) => handleArrayChange('skills.tools', index, { ...tool, name: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tool name"
                  />
                  <select
                    value={tool.level || ''}
                    onChange={(e) => handleArrayChange('skills.tools', index, { ...tool, level: e.target.value })}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('skills.tools', index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('skills.tools', { name: '', level: '' })}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} />
                Add Tool
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Projects section
  const renderProjectsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects</h3>
        
        <div className="space-y-4">
          {(profile.projects || []).map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('projects', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.name || ''}
                    onChange={(e) => handleArrayChange('projects', index, { ...project, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Project name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project URL
                  </label>
                  <input
                    type="url"
                    value={project.url || ''}
                    onChange={(e) => handleArrayChange('projects', index, { ...project, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://project-url.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={project.description || ''}
                  onChange={(e) => handleArrayChange('projects', index, { ...project, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Project description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={project.technologies?.join(', ') || ''}
                  onChange={(e) => {
                    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                    handleArrayChange('projects', index, { ...project, technologies });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, Node.js, MongoDB, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Image
                </label>
                <ImageUpload
                  value={project.image || ''}
                  onChange={(value) => handleArrayChange('projects', index, { ...project, image: value })}
                  folder="projects"
                  label="Upload Project Image"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={project.githubUrl || ''}
                  onChange={(e) => handleArrayChange('projects', index, { ...project, githubUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('projects', { 
              name: '', 
              description: '', 
              url: '', 
              githubUrl: '', 
              technologies: [], 
              image: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Project
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
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleArrayChange('experience', index, { ...exp, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={exp.position || ''}
                    onChange={(e) => handleArrayChange('experience', index, { ...exp, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Job title"
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
                    placeholder="e.g., Jan 2020"
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
                    placeholder="e.g., Dec 2023 or Present"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={exp.description || ''}
                  onChange={(e) => handleArrayChange('experience', index, { ...exp, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Job description and responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements
                </label>
                <textarea
                  value={exp.achievements || ''}
                  onChange={(e) => handleArrayChange('experience', index, { ...exp, achievements: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Key achievements and metrics..."
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
        
        <div className="space-y-4">
          {(profile.education || []).map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('education', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleArrayChange('education', index, { ...edu, degree: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Bachelor's in Computer Science"
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
                    placeholder="University/College name"
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
                    value={edu.startDate || ''}
                    onChange={(e) => handleArrayChange('education', index, { ...edu, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2018"
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
                    placeholder="e.g., 2022"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={edu.description || ''}
                  onChange={(e) => handleArrayChange('education', index, { ...edu, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional details about your education..."
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('education', { 
              degree: '', 
              institution: '', 
              startDate: '', 
              endDate: '', 
              description: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Education
          </button>
        </div>
      </div>
    </div>
  );

  // Certifications section
  const renderCertificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
        
        <div className="space-y-4">
          {(profile.certifications || []).map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Certification {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('certifications', index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    value={cert.issuer || ''}
                    onChange={(e) => handleArrayChange('certifications', index, { ...cert, issuer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Organization name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>
                  <input
                    type="text"
                    value={cert.issueDate || ''}
                    onChange={(e) => handleArrayChange('certifications', index, { ...cert, issueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Jan 2023"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credential ID
                  </label>
                  <input
                    type="text"
                    value={cert.credentialId || ''}
                    onChange={(e) => handleArrayChange('certifications', index, { ...cert, credentialId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Credential ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate URL
                </label>
                <input
                  type="url"
                  value={cert.url || ''}
                  onChange={(e) => handleArrayChange('certifications', index, { ...cert, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://certificate-url.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Image
                </label>
                <ImageUpload
                  value={cert.image || ''}
                  onChange={(value) => handleArrayChange('certifications', index, { ...cert, image: value })}
                  folder="certificates"
                  label="Upload Certificate Image"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('certifications', { 
              name: '', 
              issuer: '', 
              issueDate: '', 
              credentialId: '', 
              url: '', 
              image: '' 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Certification
          </button>
        </div>
      </div>
    </div>
  );

  // Achievements section
  const renderAchievementsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        
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
                  placeholder="Achievement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={achievement.description || ''}
                  onChange={(e) => handleArrayChange('achievements', index, { ...achievement, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description of the achievement..."
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
                    placeholder="e.g., Jan 2023"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={achievement.category || ''}
                    onChange={(e) => handleArrayChange('achievements', index, { ...achievement, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="Professional">Professional</option>
                    <option value="Technical">Technical</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Community">Community</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proof/Link
                </label>
                <input
                  type="url"
                  value={achievement.proofLink || ''}
                  onChange={(e) => handleArrayChange('achievements', index, { ...achievement, proofLink: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Link to proof or evidence"
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
              category: '', 
              proofLink: '' 
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={testimonial.name || ''}
                    onChange={(e) => handleArrayChange('testimonials', index, { ...testimonial, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Client/Colleague name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={testimonial.role || ''}
                    onChange={(e) => handleArrayChange('testimonials', index, { ...testimonial, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Their role"
                  />
                </div>
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
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial
                </label>
                <textarea
                  value={testimonial.text || ''}
                  onChange={(e) => handleArrayChange('testimonials', index, { ...testimonial, text: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What they said about you..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar
                </label>
                <ImageUpload
                  value={testimonial.avatar || ''}
                  onChange={(value) => handleArrayChange('testimonials', index, { ...testimonial, avatar: value })}
                  folder="testimonials"
                  label="Upload Avatar"
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
              avatar: '' 
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
        
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
                  value={service.name || ''}
                  onChange={(e) => handleArrayChange('services', index, { ...service, name: e.target.value })}
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
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Service description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    value={service.price || ''}
                    onChange={(e) => handleArrayChange('services', index, { ...service, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., $1000, Negotiable"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={service.duration || ''}
                    onChange={(e) => handleArrayChange('services', index, { ...service, duration: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 2 weeks, 1 month"
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('services', { 
              name: '', 
              description: '', 
              price: '', 
              duration: '' 
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Availability
            </label>
            <select
              name="availability.status"
              value={profile.availability?.status || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select availability</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Not available">Not available</option>
              <option value="Open to offers">Open to offers</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Types
            </label>
            <div className="flex flex-wrap gap-2">
              {['Full-time', 'Part-time', 'Freelance', 'Contract', 'Remote', 'On-site', 'Hybrid'].map(type => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={profile.availability?.workTypes?.includes(type) || false}
                    onChange={(e) => {
                      const currentTypes = profile.availability?.workTypes || [];
                      let newTypes;
                      if (e.target.checked) {
                        newTypes = [...currentTypes, type];
                      } else {
                        newTypes = currentTypes.filter(t => t !== type);
                      }
                      onChange({ target: { name: 'availability.workTypes', value: newTypes } });
                    }}
                    className="rounded text-blue-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate
              </label>
              <input
                type="text"
                name="availability.hourlyRate"
                value={profile.availability?.hourlyRate || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., $50-80/hr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Rate
              </label>
              <input
                type="text"
                name="availability.projectRate"
                value={profile.availability?.projectRate || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., $5000-10000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </label>
            <select
              name="availability.preferredContact"
              value={profile.availability?.preferredContact || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select preferred method</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Calendly">Calendly</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Discord">Discord</option>
            </select>
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
              Calendly Link
            </label>
            <input
              type="url"
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

  // Blogs section
  const renderBlogsSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Blogs & Articles</h3>
        
        <div className="space-y-4">
          {(profile.blogs || []).map((blog, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Blog {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeArrayItem('blogs', index)}
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
                  value={blog.title || ''}
                  onChange={(e) => handleArrayChange('blogs', index, { ...blog, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Blog title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={blog.description || ''}
                  onChange={(e) => handleArrayChange('blogs', index, { ...blog, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Blog description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={blog.url || ''}
                    onChange={(e) => handleArrayChange('blogs', index, { ...blog, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://blog-url.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={blog.date || ''}
                    onChange={(e) => handleArrayChange('blogs', index, { ...blog, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Jan 2023"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <ImageUpload
                  value={blog.image || ''}
                  onChange={(value) => handleArrayChange('blogs', index, { ...blog, image: value })}
                  folder="blogs"
                  label="Upload Featured Image"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={blog.tags?.join(', ') || ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                    handleArrayChange('blogs', index, { ...blog, tags });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="react, javascript, web development"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('blogs', { 
              title: '', 
              description: '', 
              url: '', 
              date: '', 
              image: '', 
              tags: [] 
            })}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
            Add Blog
          </button>
        </div>
      </div>
    </div>
  );

  // Open Source section
  const renderOpenSourceSection = () => (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Open Source</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="openSource.githubUrl"
              value={profile.openSource?.githubUrl || ''}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contribution Graph
            </label>
            <ImageUpload
              value={profile.openSource?.contributionGraph || ''}
              onChange={(value) => onChange({ target: { name: 'openSource.contributionGraph', value } })}
              folder="open-source"
              label="Upload Contribution Graph"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Top Repositories</h4>
            {(profile.openSource?.topRepositories || []).map((repo, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-medium text-gray-900">Repository {index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => {
                      const newRepos = [...(profile.openSource?.topRepositories || [])];
                      newRepos.splice(index, 1);
                      onChange({ target: { name: 'openSource.topRepositories', value: newRepos } });
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Repository Name
                    </label>
                    <input
                      type="text"
                      value={repo.name || ''}
                      onChange={(e) => {
                        const newRepos = [...(profile.openSource?.topRepositories || [])];
                        newRepos[index] = { ...newRepos[index], name: e.target.value };
                        onChange({ target: { name: 'openSource.topRepositories', value: newRepos } });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="repo-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL
                    </label>
                    <input
                      type="url"
                      value={repo.url || ''}
                      onChange={(e) => {
                        const newRepos = [...(profile.openSource?.topRepositories || [])];
                        newRepos[index] = { ...newRepos[index], url: e.target.value };
                        onChange({ target: { name: 'openSource.topRepositories', value: newRepos } });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={repo.description || ''}
                      onChange={(e) => {
                        const newRepos = [...(profile.openSource?.topRepositories || [])];
                        newRepos[index] = { ...newRepos[index], description: e.target.value };
                        onChange({ target: { name: 'openSource.topRepositories', value: newRepos } });
                      }}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Repository description"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('openSource.topRepositories', { name: '', url: '', description: '' })}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Plus size={16} />
              Add Repository
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact section
  const renderContactSection = () => {
    return (
      <div className="space-y-6">
        <div className="bg-card rounded-xl p-6 shadow-lg shadow-black/40 border border-zinc-800">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="contact.email"
                value={profile.contact?.email || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
              {errors.contact?.email && <p className="text-red-500 text-sm mt-1">{errors.contact.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="contact.phone"
                value={profile.contact?.phone || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calendly Link
              </label>
              <input
                type="url"
                name="contact.calendlyLink"
                value={profile.contact?.calendlyLink || ''}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://calendly.com/username"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Contact Methods
              </label>
              <div className="space-y-3">
                {(profile.contact?.additionalMethods || []).map((method, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <select
                      value={method.type || ''}
                      onChange={(e) => {
                        const newMethods = [...(profile.contact?.additionalMethods || [])];
                        newMethods[index] = { ...newMethods[index], type: e.target.value };
                        onChange({ target: { name: 'contact.additionalMethods', value: newMethods } });
                      }}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      <option value="discord">Discord</option>
                      <option value="slack">Slack</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="telegram">Telegram</option>
                      <option value="skype">Skype</option>
                    </select>
                    <input
                      type="text"
                      value={method.value || ''}
                      onChange={(e) => {
                        const newMethods = [...(profile.contact?.additionalMethods || [])];
                        newMethods[index] = { ...newMethods[index], value: e.target.value };
                        onChange({ target: { name: 'contact.additionalMethods', value: newMethods } });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Contact value"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('contact.additionalMethods', index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('contact.additionalMethods', { type: '', value: '' })}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus size={16} />
                  Add Contact Method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the form based on active tab
  const renderActiveTab = () => {
    switch (currentTab) {
      case 'identity':
        return renderIdentitySection();
      case 'about':
        return renderAboutSection();
      case 'skills':
        return renderSkillsSection();
      case 'projects':
        return renderProjectsSection();
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
      case 'blogs':
        return renderBlogsSection();
      case 'openSource':
        return renderOpenSourceSection();
      case 'contact':
        return renderContactSection();
      default:
        return renderIdentitySection();
    }
  };

  return (
    <div className="space-y-6 profile-form">
      {/* Active Tab Content controlled by parent Profile sub-nav */}
      {renderActiveTab()}
    </div>
  );
}

export default DeveloperForm;