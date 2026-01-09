import { useState, useEffect } from 'react';
import { getDynamicNavItems, hasSectionData } from '../utils/templateSections';
import { Github, Linkedin, Twitter, Mail, ExternalLink, Code2, BookOpen, Award, Users, Briefcase, FileText, Download, Calendar, Star, MessageCircle, Camera, Trophy, FileCode, Code, Layers, Zap, Coffee, GraduationCap, Building2, Globe, Mail as MailIcon, Phone, MapPin, Calendar as CalendarIcon, Star as StarIcon, ChevronDown, Menu, X, User, GitFork, ChevronLeft, ChevronRight, Palette, Wrench, Target, Eye, Settings, Play, Link, BarChart3, FileImage, Image, MonitorSmartphone, Smartphone, Tablet, Laptop, Figma, Dribbble } from 'lucide-react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ServiceCard from '../components/ServiceCard';
import BlogCard from '../components/BlogCard';
import ResumeButton from '../components/ResumeButton';

const DarkTemplate = ({ profile }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navItems = getDynamicNavItems(profile);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false); // Close mobile menu after selection
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
          setActiveSection(item.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-400">
              {profile.identity?.name || 'Portfolio'}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`pb-2 text-sm font-medium transition-all capitalize relative ${
                    activeSection === item.id
                      ? 'text-blue-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-700">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left py-2 px-4 rounded-lg transition-all capitalize ${
                      activeSection === item.id
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero / Intro Section */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            {profile.identity?.avatar && (
              <img
                src={`http://localhost:5000${profile.identity.avatar}`}
                alt={profile.identity.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
            )}
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            {profile.identity?.name || 'Your Name'}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {profile.identity?.tagline && profile.identity.tagline.split(',').map((role, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                {role.trim()}
              </span>
            ))}
          </div>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {profile.identity?.bio || 'Welcome to my portfolio'}
          </p>
          
          {/* Availability Badge */}
          {profile.availability && profile.availability.openToWork && (
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Available for Freelance/Full-time</span>
              </div>
            </div>
          )}
          
          {profile.identity?.location && (
            <div className="flex items-center justify-center gap-2 mb-8 text-gray-400">
              <MapPin size={16} />
              <span>{profile.identity.location}</span>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {profile.identity?.viewProjectsLabel && (
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
              >
                {profile.identity.viewProjectsLabel}
              </button>
            )}
            {profile.identity?.hireMeLabel && (
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all"
              >
                {profile.identity.hireMeLabel}
              </button>
            )}
            {profile.identity?.resumeFiles && profile.identity.resumeFiles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.identity.resumeFiles.map((resume, index) => (
                  <a 
                    key={index}
                    href={`http://localhost:5000${resume.url}`}
                    download
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    <Download size={16} />
                    {resume.name || `Resume ${index + 1}`}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {profile.socials?.map((social, index) => {
              const icons = {
                GitHub: Github,
                LinkedIn: Linkedin,
                Twitter: Twitter,
                Email: Mail,
                LeetCode: Code2, // Use Code2 for LeetCode
                Behance: FileImage, // Use FileImage as default for Behance
                Dribbble: Dribbble,
                Figma: Figma,
                'Twitter/X': Twitter,
                'Adobe Portfolio': FileImage,
              };
              const Icon = icons[social.platform] || ExternalLink;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      {hasSectionData(profile, 'about') && (
        <section id="about" className="py-20 px-6 bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-white">About</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {profile.about?.summary || 'Add your bio in the profile section.'}
                </p>
              </div>
              <div className="space-y-4">
                {profile.about?.yearsOfExperience && (
                  <div className="flex items-center gap-2">
                    <Coffee size={20} className="text-blue-400" />
                    <span className="text-gray-300">{profile.about.yearsOfExperience}</span>
                  </div>
                )}
                {profile.about?.currentStatus && (
                  <div className="flex items-center gap-2">
                    <User size={20} className="text-blue-400" />
                    <span className="text-gray-300">{profile.about.currentStatus}</span>
                  </div>
                )}
                {profile.about?.domainExpertise && profile.about.domainExpertise.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Domain Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.about.domainExpertise.map((domain, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.about?.workPreference && profile.about.workPreference.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Work Preference</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.about.workPreference.map((pref, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.about?.designPhilosophy && profile.about.designPhilosophy.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Design Philosophy</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.about.designPhilosophy.map((philosophy, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {philosophy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {profile.about?.industries && profile.about.industries.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Industries</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.about.industries.map((industry, idx) => (
                        <span key={idx} className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Design Process Section - UI/UX Designer specific */}
      {profile.designProcess && profile.designProcess.length > 0 && (
        <section id="design-process" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.designProcess.map((step, index) => (
                <div key={index} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools & Proficiency Section - UI/UX Designer specific */}
      {profile.tools && profile.tools.length > 0 && (
        <section id="tools" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Tools & Proficiency</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.tools.map((tool, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tool.level === 'Beginner' ? 'bg-red-500/20 text-red-300' :
                      tool.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                      tool.level === 'Advanced' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {tool.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{tool.yearsOfExperience || 0} years</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visual Portfolio / Selected Work Section - UI/UX Designer specific */}
      {profile.visualPortfolio && profile.visualPortfolio.length > 0 && (
        <section id="visual-portfolio" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Visual Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.visualPortfolio.map((item, index) => (
                <div key={index} className="bg-gray-700 rounded-xl overflow-hidden border border-gray-600">
                  <div className="aspect-w-16 aspect-h-12 relative h-64">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.title || 'Portfolio item'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{item.caption}</p>
                    {item.caseStudyLink && (
                      <a 
                        href={`#${item.caseStudyLink}`}
                        className="text-blue-400 text-sm hover:underline"
                      >
                        View Case Study
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills & Tech Stack Section */}
      {profile.skills && profile.skills.length > 0 && (
        <section id="skills" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white">Skills & Tech Stack</h2>
            <div className="space-y-8">
              {/* Categorized Skills */}
              {['Languages', 'Frontend', 'Backend', 'Databases', 'DevOps / Cloud', 'AI / ML', 'Tools'].map(category => {
                const categorySkills = profile.skills.filter(skill => skill.category === category);
                if (categorySkills.length === 0) return null;
                
                return (
                  <div key={category} className="border border-gray-700 rounded-xl p-6 bg-gray-800/50">
                    <h3 className="text-xl font-bold mb-4 text-blue-400">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills.map((skill, index) => (
                        <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-white">{skill.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              skill.level === 'Beginner' ? 'bg-red-500/20 text-red-300' :
                              skill.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                              skill.level === 'Advanced' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              {skill.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span>{skill.yearsOfExperience || 0} years</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {/* Currently Learning */}
              {profile.currentlyLearning && profile.currentlyLearning.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">Currently Learning</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.currentlyLearning.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {profile.projects && profile.projects.length > 0 && (
        <section id="projects" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={`http://localhost:5000${project.screenshots[0]}`}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-2 text-sm">{project.shortDescription || project.description}</p>
                  
                  {/* Tech Stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech, techIdx) => (
                          <span key={techIdx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Key Features */}
                  {project.keyFeatures && project.keyFeatures.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Key Features:</h4>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {project.keyFeatures.slice(0, 3).map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start">
                            <span className="mr-1">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Metrics */}
                  {project.metrics && (
                    <div className="mb-4">
                      <div className="text-sm text-green-400 flex items-center gap-1">
                        <span>{project.metrics}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Links */}
                  <div className="flex gap-2">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center gap-1 transition-all"
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm flex items-center gap-1 transition-all"
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section - Enhanced for UI/UX Designer */}
      {profile.caseStudies && profile.caseStudies.length > 0 && (
        <section id="case-studies" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Featured Case Studies</h2>
            <div className="space-y-16">
              {profile.caseStudies.map((study, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2 text-blue-400">{study.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-4">
                      {study.client && <span><strong>Client:</strong> {study.client}</span>}
                      {study.projectType && <span><strong>Project Type:</strong> {study.projectType}</span>}
                      {study.duration && <span><strong>Duration:</strong> {study.duration}</span>}
                      {study.role && <span><strong>Role:</strong> {study.role}</span>}
                    </div>
                  </div>
                  
                  {/* Problem Statement */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                      <FileText size={20} />
                      Problem Statement
                    </h4>
                    <p className="text-gray-300">{study.problem}</p>
                  </div>
                  
                  {/* User Research & Personas */}
                  {study.userResearch && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <User size={20} />
                        User Research
                      </h4>
                      <p className="text-gray-300 mb-4">{study.userResearch}</p>
                      {study.personaImages && study.personaImages.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {study.personaImages.map((img, imgIdx) => (
                            <div key={imgIdx} className="border border-gray-600 rounded-lg overflow-hidden">
                              <img
                                src={`http://localhost:5000${img}`}
                                alt={`Persona ${imgIdx + 1}`}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* User Flows & Journey Maps */}
                  {study.userFlows && study.userFlows.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Users size={20} />
                        User Flows & Journey Maps
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.userFlows.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-600 rounded-lg overflow-hidden">
                            <img
                              src={`http://localhost:5000${img}`}
                              alt={`User Flow ${imgIdx + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Wireframes */}
                  {study.wireframes && study.wireframes.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Palette size={20} />
                        Wireframes
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {study.wireframes.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-600 rounded-lg overflow-hidden">
                            <img
                              src={`http://localhost:5000${img}`}
                              alt={`Wireframe ${imgIdx + 1}`}
                              className="w-full h-32 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* High-Fi Designs */}
                  {study.highFiDesigns && study.highFiDesigns.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <MonitorSmartphone size={20} />
                        High-Fi Designs
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.highFiDesigns.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-600 rounded-lg overflow-hidden">
                            <img
                              src={`http://localhost:5000${img}`}
                              alt={`High-Fi Design ${imgIdx + 1}`}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Prototype */}
                  {study.prototypeLink && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Play size={20} />
                        Interactive Prototype
                      </h4>
                      <a 
                        href={study.prototypeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                      >
                        <Play size={16} />
                        View Prototype
                      </a>
                    </div>
                  )}
                  
                  {/* Usability Testing */}
                  {study.usabilityTesting && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <BarChart3 size={20} />
                        Usability Testing Results
                      </h4>
                      <p className="text-gray-300">{study.usabilityTesting}</p>
                    </div>
                  )}
                  
                  {/* Key Decisions & Trade-offs */}
                  {study.keyDecisions && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Settings size={20} />
                        Key Decisions & Trade-offs
                      </h4>
                      <p className="text-gray-300">{study.keyDecisions}</p>
                    </div>
                  )}
                  
                  {/* Outcomes & Metrics */}
                  {study.outcomes && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Target size={20} />
                        Outcomes & Metrics
                      </h4>
                      <p className="text-gray-300">{study.outcomes}</p>
                    </div>
                  )}
                  
                  {/* Before/After Comparison */}
                  {study.beforeAfterImages && study.beforeAfterImages.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <Image size={20} />
                        Before & After
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.beforeAfterImages.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-600 rounded-lg overflow-hidden">
                            <img
                              src={`http://localhost:5000${img}`}
                              alt={`Before/After ${imgIdx + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Live Link */}
                  {study.liveLink && (
                    <div className="mb-6">
                      <a 
                        href={study.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
                      >
                        <Link size={16} />
                        View Live Project
                      </a>
                    </div>
                  )}
                  
                  {/* Lessons Learned */}
                  {study.lessonsLearned && (
                    <div>
                      <h4 className="text-xl font-semibold mb-3 text-white flex items-center gap-2">
                        <BookOpen size={20} />
                        Lessons Learned
                      </h4>
                      <p className="text-gray-300">{study.lessonsLearned}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {profile.experience && profile.experience.length > 0 && (
        <section id="experience" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white">Experience</h2>
            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    {index < profile.experience.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-600 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8 bg-gray-700 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-1">{exp.position}</h3>
                    <p className="text-blue-400 mb-2">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.description && <p className="text-gray-300">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Open Source & GitHub Activity */}
      {profile.openSource && (profile.openSource.githubUsername || profile.openSource.topRepositories?.length > 0) && (
        <section id="open-source" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white">Open Source & GitHub Activity</h2>
            
            {profile.openSource.contributionGraph && (
              <div className="mb-12 text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">GitHub Contribution Graph</h3>
                <img
                  src={`http://localhost:5000${profile.openSource.contributionGraph}`}
                  alt="GitHub Contribution Graph"
                  className="max-w-full h-auto rounded-lg border border-gray-700"
                />
              </div>
            )}
            
            {profile.openSource.topRepositories && profile.openSource.topRepositories.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-white">Top Repositories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.openSource.topRepositories.map((repo, index) => (
                    <div key={index} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                      <div className="flex items-center gap-2 mb-3">
                        <Github size={20} className="text-gray-300" />
                        <a 
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-blue-400 hover:underline"
                        >
                          {repo.name}
                        </a>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{repo.description}</p>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400" />
                          <span>{repo.stars || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork size={14} className="text-gray-400" />
                          <span>{repo.forks || 0}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {(profile.education && profile.education.length > 0) || (profile.certifications && profile.certifications.length > 0) && (
        <section id="education" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white">Education & Certifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Education */}
              {profile.education && profile.education.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Education</h3>
                  <div className="space-y-6">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h4 className="font-bold text-lg text-blue-400">{edu.degree}</h4>
                        <p className="text-gray-300">{edu.institution}</p>
                        <div className="flex justify-between mt-2 text-sm text-gray-400">
                          <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                          {edu.gpa && <span>GPA: {edu.gpa}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Certifications */}
              {profile.certifications && profile.certifications.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Certifications</h3>
                  <div className="space-y-6">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <h4 className="font-bold text-lg text-blue-400">{cert.name}</h4>
                        <p className="text-gray-300">{cert.issuer}</p>
                        <div className="flex justify-between mt-2 text-sm text-gray-400">
                          <span>{cert.date}</span>
                          {cert.credentialLink && (
                            <a 
                              href={cert.credentialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              Verify
                            </a>
                          )}
                        </div>
                        {cert.certificateImage && (
                          <div className="mt-3">
                            <img
                              src={`http://localhost:5000${cert.certificateImage}`}
                              alt={`${cert.name} certificate`}
                              className="max-w-full h-auto rounded-lg border border-gray-700"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {profile.achievements && profile.achievements.length > 0 && (
        <section id="achievements" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-start gap-4">
                    <Trophy className="text-yellow-400 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                      <p className="text-gray-300 mb-3">{achievement.description}</p>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>{achievement.date}</span>
                        {achievement.proofLink && (
                          <a 
                            href={achievement.proofLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            View Proof
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {profile.testimonials && profile.testimonials.length > 0 && (
        <section id="testimonials" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Testimonials</h2>
            <TestimonialCarousel testimonials={profile.testimonials} />
          </div>
        </section>
      )}

      {/* Services Section */}
      {profile.services && profile.services.length > 0 && (
        <section id="services" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Availability & Pricing */}
      {profile.availability && (profile.availability.openToWork || profile.availability.hourlyRate) && (
        <section id="availability" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Availability & Pricing</h2>
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
              {profile.availability.openToWork ? (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Open to Work</span>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 rounded-full">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Not Currently Available</span>
                  </div>
                </div>
              )}
              
              {profile.availability.hourlyRate && (
                <div className="mb-4">
                  <p className="text-xl text-gray-300">{profile.availability.hourlyRate}</p>
                </div>
              )}
              
              {profile.availability.workTypes && profile.availability.workTypes.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-400">Prefers: {profile.availability.workTypes.join(', ')}</p>
                </div>
              )}
              
              {profile.availability.ndaReady && (
                <div className="mb-4">
                  <p className="text-green-400 font-medium">NDA Ready</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {profile.blogs && profile.blogs.length > 0 && (
        <section id="blogs" className="py-20 px-6 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Blogs & Knowledge Sharing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.blogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resume Section */}
      {profile.identity?.resumeFiles && profile.identity.resumeFiles.length > 0 && (
        <section id="resume" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">Resume</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {profile.identity.resumeFiles.map((resume, index) => (
                <ResumeButton key={index} resume={resume} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">Get In Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-700 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  onClick={() => {
                    setToastMessage('Message sent successfully!');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                  }}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
                >
                  Send Message
                </button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {profile.identity?.email && (
                <div className="bg-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Email</h3>
                  <a 
                    href={`mailto:${profile.identity.email}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    <MailIcon size={16} />
                    {profile.identity.email}
                  </a>
                </div>
              )}
              
              {profile.identity?.phone && (
                <div className="bg-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Phone</h3>
                  <a 
                    href={`tel:${profile.identity.phone}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    <Phone size={16} />
                    {profile.identity.phone}
                  </a>
                </div>
              )}
              
              {profile.identity?.calendlyLink && (
                <div className="bg-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-white">Schedule a Meeting</h3>
                  <a 
                    href={profile.identity.calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                  >
                    <CalendarIcon size={16} />
                    Book a meeting
                  </a>
                </div>
              )}
              
              <div className="bg-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-white">Social Links</h3>
                <div className="flex gap-4 flex-wrap">
                  {profile.socials?.map((social, index) => {
                    const icons = {
                      GitHub: Github,
                      LinkedIn: Linkedin,
                      Twitter: Twitter,
                      Email: Mail,
                      Behance: FileImage, // Use FileImage as default for Behance,
                      Dribbble: Dribbble,
                      Figma: Figma,
                      'Twitter/X': Twitter,
                      'Adobe Portfolio': FileImage,
                    };
                    const Icon = icons[social.platform] || ExternalLink;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-600 rounded-full hover:bg-blue-500 hover:text-white transition-all"
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
          {toastMessage}
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-800 border-t border-gray-700">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p>© {new Date().getFullYear()} {profile.identity?.name || 'Portfolio'}. Built with Portivo</p>
        </div>
      </footer>
    </div>
  );
};

export default DarkTemplate;