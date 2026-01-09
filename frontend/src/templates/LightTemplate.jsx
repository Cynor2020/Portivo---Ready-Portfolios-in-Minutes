import { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  MapPin,
  Calendar,
  Star,
  Users,
  Code,
  Award,
  Briefcase,
  BookOpen,
  FileText,
  Eye,
  Heart,
  MessageCircle,
  Coffee,
  DollarSign,
  Monitor,
  Smartphone,
  Globe,
  GitFork,
  User,
  Download,
  Calendar as CalendarIcon,
  Mail as MailIcon,
  Phone,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Palette,
  Wrench,
  Target,
  Settings,
  Play,
  Link,
  BarChart3,
  FileImage,
  Image,
  MonitorSmartphone,
  Tablet,
  Laptop,
  Figma,
  Dribbble
} from 'lucide-react';
import { getDynamicNavItems } from '../utils/templateSections';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ServiceCard from '../components/ServiceCard';
import BlogCard from '../components/BlogCard';
import ResumeButton from '../components/ResumeButton';

const LightTemplate = ({ profile }) => {
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
    <div className="min-h-screen bg-white text-[#1F2937]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-wrap">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`pb-2 text-sm font-medium transition-all capitalize relative ${
                    activeSection === item.id
                      ? 'text-[#3B82F6]'
                      : 'text-gray-600 hover:text-[#1F2937]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-[#1F2937] hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-50 md:hidden">
                <div className="flex flex-col items-center gap-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-sm font-medium transition-all capitalize ${
                        activeSection === item.id
                          ? 'text-[#3B82F6]'
                          : 'text-gray-600 hover:text-[#1F2937]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero/Intro Section */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            {profile.identity?.avatar && (
              <img
                src={`http://localhost:5000${profile.identity.avatar}`}
                alt={profile.identity.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#3B82F6] shadow-lg"
              />
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-[#1F2937]">
            {profile.identity?.name || 'Your Name'}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            {profile.identity?.roles && profile.identity.roles.map((role, index) => (
              <span key={index} className="px-4 py-2 bg-blue-100 text-[#3B82F6] rounded-full text-sm font-medium">
                {role}
              </span>
            ))}
          </div>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {profile.identity?.valueProposition || profile.identity?.bio || 'Welcome to my portfolio'}
          </p>
          {profile.identity?.location && (
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
              <MapPin size={16} />
              <span>{profile.identity.location}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-white text-[#3B82F6] border border-[#3B82F6] rounded-lg font-medium hover:bg-[#3B82F6] hover:text-white transition-all"
            >
              Hire Me
            </button>
            {profile.identity?.resumeFiles && profile.identity.resumeFiles.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {profile.identity.resumeFiles.map((resume, index) => (
                  <a 
                    key={index}
                    href={`http://localhost:5000${resume.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-white text-[#3B82F6] border border-[#3B82F6] rounded-lg font-medium hover:bg-[#3B82F6] hover:text-white transition-all flex items-center gap-2"
                  >
                    <FileText size={16} />
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
                Behance: FileImage,
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
                  className="p-3 bg-[#F3F4F6] rounded-full hover:bg-[#3B82F6] hover:text-white transition-all shadow-sm"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      {profile.about && (profile.about.summary || profile.about.yearsOfExperience || profile.about.domainExpertise?.length > 0 || profile.about.designPhilosophy?.length > 0 || profile.about.industries?.length > 0) && (
        <section id="about" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-[#1F2937]">About Me</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {profile.about.summary || profile.identity?.bio || 'Add your bio in the profile section.'}
                </p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {profile.about.yearsOfExperience && (
                    <span className="px-4 py-2 bg-blue-100 text-[#3B82F6] rounded-full text-sm font-medium flex items-center gap-2">
                      <Calendar size={16} />
                      {profile.about.yearsOfExperience} Years Experience
                    </span>
                  )}
                  
                  {profile.about.currentStatus && (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
                      <Coffee size={16} />
                      {profile.about.currentStatus}
                    </span>
                  )}
                  
                  {profile.about.openToWork && (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
                      <Eye size={16} />
                      Open to Work
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                {profile.about.domainExpertise && profile.about.domainExpertise.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Domain Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.about.domainExpertise.map((domain, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.about.designPhilosophy && profile.about.designPhilosophy.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Design Philosophy</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.about.designPhilosophy.map((philosophy, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {philosophy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.about.industries && profile.about.industries.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Industries</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.about.industries.map((industry, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.about.workPreferences && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Work Preferences</h3>
                    <ul className="space-y-2">
                      {profile.about.workPreferences.remote && (
                        <li className="flex items-center gap-2">
                          <Globe size={16} />
                          <span>Remote Work</span>
                        </li>
                      )}
                      {profile.about.workPreferences.hybrid && (
                        <li className="flex items-center gap-2">
                          <Monitor size={16} />
                          <span>Hybrid Work</span>
                        </li>
                      )}
                      {profile.about.workPreferences.contract && (
                        <li className="flex items-center gap-2">
                          <FileText size={16} />
                          <span>Contract Work</span>
                        </li>
                      )}
                      {profile.about.workPreferences.fullTime && (
                        <li className="flex items-center gap-2">
                          <Briefcase size={16} />
                          <span>Full-time Work</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Design Process Section - UI/UX Designer specific */}
      {profile.designProcess && profile.designProcess.length > 0 && (
        <section id="design-process" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.designProcess.map((step, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1F2937] mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
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
        <section id="tools" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Tools & Proficiency</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.tools.map((tool, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-[#1F2937]">{tool.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tool.level === 'Beginner' ? 'bg-red-100 text-red-800' :
                      tool.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      tool.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {tool.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
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
        <section id="visual-portfolio" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Visual Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.visualPortfolio.map((item, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.title || 'Portfolio item'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.caption}</p>
                    {item.caseStudyLink && (
                      <a 
                        href={`#${item.caseStudyLink}`}
                        className="text-[#3B82F6] text-sm hover:underline"
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Skills & Tech Stack</h2>
            
            {/* Categorized Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {profile.skills.map((skillCategory, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-4 text-[#3B82F6]">{skillCategory.category}</h3>
                  <div className="space-y-3">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                            skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                            skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {skill.level}
                          </span>
                          {skill.yearsOfExperience && (
                            <span className="text-sm text-gray-500">{skill.yearsOfExperience} years</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Currently Learning */}
            {profile.skills.some(cat => cat.learning && cat.learning.length > 0) && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-xl font-semibold mb-4 text-[#3B82F6] flex items-center gap-2">
                  <Code size={20} />
                  Currently Learning
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skillCategory, categoryIndex) => (
                    skillCategory.learning && skillCategory.learning.map((learning, learningIndex) => (
                      <span key={`${categoryIndex}-${learningIndex}`} className="px-3 py-2 bg-white rounded-full text-sm font-medium shadow-sm">
                        {learning}
                      </span>
                    ))
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {profile.projects && profile.projects.length > 0 && (
        <section id="projects" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all overflow-hidden"
                >
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={`http://localhost:5000${project.screenshots[0]}`}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack && project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-blue-100 text-[#3B82F6] rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Role */}
                  {project.role && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">Role: </span>
                      <span className="text-sm text-gray-600">{project.role}</span>
                    </div>
                  )}
                  
                  {/* Metrics */}
                  {project.metrics && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">{project.metrics}</p>
                    </div>
                  )}
                  
                  {/* Links */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all flex items-center gap-1"
                      >
                        Live <ExternalLink size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-all flex items-center gap-1"
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
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Featured Case Studies</h2>
            <div className="space-y-16">
              {profile.caseStudies.map((study, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-md">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2 text-[#1F2937]">{study.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                      {study.client && <span><strong>Client:</strong> {study.client}</span>}
                      {study.projectType && <span><strong>Project Type:</strong> {study.projectType}</span>}
                      {study.duration && <span><strong>Duration:</strong> {study.duration}</span>}
                      {study.role && <span><strong>Role:</strong> {study.role}</span>}
                    </div>
                  </div>
                  
                  {/* Problem Statement */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                      <FileText size={20} />
                      Problem Statement
                    </h4>
                    <p className="text-gray-600">{study.problem}</p>
                  </div>
                  
                  {/* User Research & Personas */}
                  {study.userResearch && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <User size={20} />
                        User Research
                      </h4>
                      <p className="text-gray-600 mb-4">{study.userResearch}</p>
                      {study.personaImages && study.personaImages.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {study.personaImages.map((img, imgIdx) => (
                            <div key={imgIdx} className="border border-gray-200 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <Users size={20} />
                        User Flows & Journey Maps
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.userFlows.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-200 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <Palette size={20} />
                        Wireframes
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {study.wireframes.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-200 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <MonitorSmartphone size={20} />
                        High-Fi Designs
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.highFiDesigns.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-200 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <Play size={20} />
                        Interactive Prototype
                      </h4>
                      <a 
                        href={study.prototypeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-lg transition-all"
                      >
                        <Play size={16} />
                        View Prototype
                      </a>
                    </div>
                  )}
                  
                  {/* Usability Testing */}
                  {study.usabilityTesting && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <BarChart3 size={20} />
                        Usability Testing Results
                      </h4>
                      <p className="text-gray-600">{study.usabilityTesting}</p>
                    </div>
                  )}
                  
                  {/* Key Decisions & Trade-offs */}
                  {study.keyDecisions && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <Settings size={20} />
                        Key Decisions & Trade-offs
                      </h4>
                      <p className="text-gray-600">{study.keyDecisions}</p>
                    </div>
                  )}
                  
                  {/* Outcomes & Metrics */}
                  {study.outcomes && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <Target size={20} />
                        Outcomes & Metrics
                      </h4>
                      <p className="text-gray-600">{study.outcomes}</p>
                    </div>
                  )}
                  
                  {/* Before/After Comparison */}
                  {study.beforeAfterImages && study.beforeAfterImages.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <Image size={20} />
                        Before & After
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.beforeAfterImages.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-gray-200 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-[#3B82F6] flex items-center gap-2">
                        <BookOpen size={20} />
                        Lessons Learned
                      </h4>
                      <p className="text-gray-600">{study.lessonsLearned}</p>
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
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937]">Experience</h2>
            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-[#3B82F6] rounded-full"></div>
                    {index < profile.experience.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8 bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-1">{exp.position}</h3>
                    <p className="text-[#3B82F6] mb-2">{exp.company}</p>
                    <p className="text-gray-500 text-sm mb-2">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.description && <p className="text-gray-600">{exp.description}</p>}
                    {exp.impact && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Impact: </span>
                        <span className="text-sm text-gray-600">{exp.impact}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Open Source & GitHub Activity Section */}
      {profile.openSource && (profile.openSource.githubUsername || profile.openSource.topRepositories?.length > 0) && (
        <section id="open-source" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Open Source & GitHub Activity</h2>
            
            {/* GitHub Stats */}
            {profile.openSource.githubUsername && (
              <div className="text-center mb-12">
                <h3 className="text-xl font-semibold mb-4">GitHub: @{profile.openSource.githubUsername}</h3>
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                  {profile.openSource.stats && (
                    <>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#3B82F6]">{profile.openSource.stats.followers || 0}</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#3B82F6]">{profile.openSource.stats.following || 0}</div>
                        <div className="text-sm text-gray-600">Following</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#3B82F6]">{profile.openSource.stats.publicRepos || 0}</div>
                        <div className="text-sm text-gray-600">Repos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#3B82F6]">{profile.openSource.stats.contributions || 0}</div>
                        <div className="text-sm text-gray-600">Contributions</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* GitHub Contribution Graph */}
            {profile.openSource.contributionGraph && (
              <div className="mb-12 text-center">
                <h4 className="text-xl font-semibold mb-4 text-[#1F2937]">Contribution Graph</h4>
                <img
                  src={`http://localhost:5000${profile.openSource.contributionGraph}`}
                  alt="GitHub Contribution Graph"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
            
            {/* Top Repositories */}
            {profile.openSource.topRepositories && profile.openSource.topRepositories.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold mb-6 text-[#1F2937] text-center">Top Repositories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.openSource.topRepositories.map((repo, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold">{repo.name}</h5>
                        <Github className="text-gray-600" size={20} />
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{repo.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Star size={16} />
                            <span>{repo.stars || 0}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <GitFork size={16} />
                            <span>{repo.forks || 0}</span>
                          </div>
                        </div>
                        {repo.language && (
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Education & Certifications Section */}
      {((profile.education && profile.education.length > 0) || (profile.certifications && profile.certifications.length > 0)) && (
        <section id="education" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Education & Certifications</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Education */}
              {profile.education && profile.education.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-[#3B82F6] flex items-center gap-2">
                    <BookOpen size={24} />
                    Education
                  </h3>
                  <div className="space-y-6">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <p className="text-[#3B82F6] font-medium">{edu.institution}</p>
                        <p className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate || 'Present'}</p>
                        {edu.description && (
                          <p className="text-gray-600 mt-2">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Certifications */}
              {profile.certifications && profile.certifications.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-[#3B82F6] flex items-center gap-2">
                    <Award size={24} />
                    Certifications
                  </h3>
                  <div className="space-y-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-md flex items-start gap-4">
                        {cert.image && (
                          <img
                            src={`http://localhost:5000${cert.image}`}
                            alt={cert.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-[#3B82F6] text-sm">{cert.issuer}</p>
                          <p className="text-gray-600 text-sm">{cert.date || cert.issuingDate}</p>
                          {cert.description && (
                            <p className="text-gray-600 mt-1 text-sm">{cert.description}</p>
                          )}
                          {cert.url && (
                            <a 
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#3B82F6] text-sm hover:underline flex items-center gap-1 mt-2"
                            >
                              View Certificate <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
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
        <section id="achievements" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                  <div className="flex justify-center gap-2">
                    {achievement.proofLink && (
                      <a 
                        href={achievement.proofLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3B82F6] text-sm hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={14} />
                        Proof
                      </a>
                    )}
                    {achievement.date && (
                      <span className="text-gray-500 text-sm">{achievement.date}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {profile.testimonials && profile.testimonials.length > 0 && (
        <section id="testimonials" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Testimonials</h2>
            <TestimonialCarousel testimonials={profile.testimonials} />
          </div>
        </section>
      )}

      {/* Services Section */}
      {profile.services && profile.services.length > 0 && (
        <section id="services" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Availability & Pricing Section */}
      {profile.availability && (profile.availability.openToWork || profile.availability.hourlyRate) && (
        <section id="availability" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Availability & Pricing</h2>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              {profile.availability.openToWork ? (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Available for Freelance/Full-time</span>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    <span>Not Currently Available</span>
                  </div>
                </div>
              )}
              
              {profile.availability.hourlyRate && (
                <div className="mb-4">
                  <p className="text-xl text-gray-700">{profile.availability.hourlyRate}</p>
                </div>
              )}
              
              {profile.availability.workTypes && profile.availability.workTypes.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-600">Prefers: {profile.availability.workTypes.join(', ')}</p>
                </div>
              )}
              
              {profile.availability.ndaReady && (
                <div className="mb-4">
                  <p className="text-green-600 font-medium">NDA Ready</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {profile.blogs && profile.blogs.length > 0 && (
        <section id="blogs" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.blogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resume Section */}
      {profile.identity?.resumeFiles && profile.identity.resumeFiles.length > 0 && (
        <section id="resume" className="py-20 px-6 bg-[#F3F4F6]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-[#1F2937] text-center">Resume</h2>
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
          <h2 className="text-4xl font-bold mb-8 text-center text-[#1F2937]">Get In Touch</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-[#1F2937]">Send a Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  onClick={() => {
                    setToastMessage('Message sent successfully!');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                  }}
                  className="w-full px-6 py-3 bg-[#3B82F6] text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
                >
                  Send Message
                </button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {profile.identity?.email && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-[#1F2937]">Email</h3>
                  <a 
                    href={`mailto:${profile.identity.email}`}
                    className="text-[#3B82F6] hover:text-blue-700 transition-colors flex items-center gap-2"
                  >
                    <MailIcon size={16} />
                    {profile.identity.email}
                  </a>
                </div>
              )}
              
              {profile.identity?.phone && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-[#1F2937]">Phone</h3>
                  <a 
                    href={`tel:${profile.identity.phone}`}
                    className="text-[#3B82F6] hover:text-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Phone size={16} />
                    {profile.identity.phone}
                  </a>
                </div>
              )}
              
              {profile.identity?.calendlyLink && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-[#1F2937]">Schedule a Meeting</h3>
                  <a 
                    href={profile.identity.calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B82F6] hover:text-blue-700 transition-colors flex items-center gap-2"
                  >
                    <CalendarIcon size={16} />
                    Book a meeting
                  </a>
                </div>
              )}
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4 text-[#1F2937]">Social Links</h3>
                <div className="flex gap-4 flex-wrap">
                  {profile.socials?.map((social, index) => {
                    const icons = {
                      GitHub: Github,
                      LinkedIn: Linkedin,
                      Twitter: Twitter,
                      Email: Mail,
                      Behance: FileImage,
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
                        className="p-3 bg-[#F3F4F6] rounded-full hover:bg-[#3B82F6] hover:text-white transition-all"
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
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#F3F4F6] border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-gray-600">
          <p>© {new Date().getFullYear()} {profile.identity?.name || 'Portfolio'}. Built with Portivo</p>
        </div>
      </footer>
    </div>
  );
};

export default LightTemplate;

