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

const ModernTemplate = ({ profile }) => {
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
    <div className="min-h-screen bg-[#0F172A] text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F172A] via-purple-900/20 to-[#0F172A] animate-gradient"></div>
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>

      {/* Floating Navigation */}
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex gap-2 flex-wrap justify-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeSection === item.id
                  ? 'bg-yellow-400/20 text-yellow-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-sm">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all capitalize ${
                    activeSection === item.id
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero/Intro Section */}
      <section id="hero" className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            {profile.identity?.avatar && (
              <img
                src={`http://localhost:5000${profile.identity.avatar}`}
                alt={profile.identity.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
              />
            )}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            {profile.identity?.name || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {profile.identity?.roles && profile.identity.roles.map((role, index) => (
              <span key={index} className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-400/30">
                {role}
              </span>
            ))}
          </div>
          <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            {profile.identity?.valueProposition || profile.identity?.bio || 'Welcome to my portfolio'}
          </p>
          {profile.identity?.location && (
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
              <MapPin size={16} />
              <span>{profile.identity.location}</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-green-400 text-[#0F172A] rounded-lg font-medium hover:from-yellow-500 hover:to-green-500 transition-all"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition-all"
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
                    className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-green-400 text-[#0F172A] rounded-lg font-medium hover:from-yellow-500 hover:to-green-500 transition-all flex items-center gap-2"
                  >
                    <FileText size={16} />
                    {resume.name || `Resume ${index + 1}`}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap">
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
                  className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-yellow-400/20 hover:scale-110 transition-all"
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      {profile.about && (profile.about.summary || profile.about.yearsOfExperience || profile.about.domainExpertise?.length > 0 || profile.about.designPhilosophy?.length > 0 || profile.about.industries?.length > 0) && (
        <section id="about" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {profile.about.summary || profile.identity?.bio || 'Add your bio in the profile section.'}
                  </p>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {profile.about.yearsOfExperience && (
                      <span className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium flex items-center gap-2 border border-yellow-400/30">
                        <Calendar size={16} />
                        {profile.about.yearsOfExperience} Years Experience
                      </span>
                    )}
                    
                    {profile.about.currentStatus && (
                      <span className="px-4 py-2 bg-green-400/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-2 border border-green-400/30">
                        <Coffee size={16} />
                        {profile.about.currentStatus}
                      </span>
                    )}
                    
                    {profile.about.openToWork && (
                      <span className="px-4 py-2 bg-green-400/20 text-green-400 rounded-full text-sm font-medium flex items-center gap-2 border border-green-400/30">
                        <Eye size={16} />
                        Open to Work
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {profile.about.domainExpertise && profile.about.domainExpertise.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Domain Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.about.domainExpertise.map((domain, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm border border-white/20">
                            {domain}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {profile.about.designPhilosophy && profile.about.designPhilosophy.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Design Philosophy</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.about.designPhilosophy.map((philosophy, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-sm border border-purple-400/30">
                            {philosophy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {profile.about.industries && profile.about.industries.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Industries</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.about.industries.map((industry, index) => (
                          <span key={index} className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm border border-yellow-400/30">
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {profile.about.workPreferences && (
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                      <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Work Preferences</h3>
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
          </div>
        </section>
      )}

      {/* Design Process Section - UI/UX Designer specific */}
      {profile.designProcess && profile.designProcess.length > 0 && (
        <section id="design-process" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Design Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.designProcess.map((step, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0F172A] font-bold text-lg">{index + 1}</span>
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
        <section id="tools" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Tools & Proficiency
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.tools.map((tool, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tool.level === 'Beginner' ? 'bg-red-400/20 text-red-400 border border-red-400/30' :
                      tool.level === 'Intermediate' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
                      tool.level === 'Advanced' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' :
                      'bg-green-400/20 text-green-400 border border-green-400/30'
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
        <section id="visual-portfolio" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Visual Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.visualPortfolio.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.title || 'Portfolio item'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.caption}</p>
                    {item.caseStudyLink && (
                      <a 
                        href={`#${item.caseStudyLink}`}
                        className="text-yellow-400 text-sm hover:underline"
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
        <section id="skills" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Skills & Tech Stack
            </h2>
            
            {/* Categorized Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {profile.skills.map((skillCategory, categoryIndex) => (
                <div key={categoryIndex} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">{skillCategory.category}</h3>
                  <div className="space-y-3">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            skill.level === 'Expert' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            skill.level === 'Advanced' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            skill.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}>
                            {skill.level}
                          </span>
                          {skill.yearsOfExperience && (
                            <span className="text-sm text-gray-400">{skill.yearsOfExperience} years</span>
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
              <div className="bg-yellow-400/10 backdrop-blur-md rounded-xl p-6 border border-yellow-400/20">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent flex items-center gap-2">
                  <Code size={20} />
                  Currently Learning
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skillCategory, categoryIndex) => (
                    skillCategory.learning && skillCategory.learning.map((learning, learningIndex) => (
                      <span key={`${categoryIndex}-${learningIndex}`} className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20">
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
        <section id="projects" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profile.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
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
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack && project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs border border-yellow-400/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Role */}
                  {project.role && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-300">Role: </span>
                      <span className="text-sm text-gray-400">{project.role}</span>
                    </div>
                  )}
                  
                  {/* Metrics */}
                  {project.metrics && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-400">{project.metrics}</p>
                    </div>
                  )}
                  
                  {/* Links */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-400 text-[#0F172A] rounded-lg text-sm font-medium hover:from-yellow-500 hover:to-green-500 transition-all flex items-center gap-1"
                      >
                        Live <ExternalLink size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-1"
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
        <section id="case-studies" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Featured Case Studies
            </h2>
            <div className="space-y-16">
              {profile.caseStudies.map((study, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">{study.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-4">
                      {study.client && <span><strong>Client:</strong> {study.client}</span>}
                      {study.projectType && <span><strong>Project Type:</strong> {study.projectType}</span>}
                      {study.duration && <span><strong>Duration:</strong> {study.duration}</span>}
                      {study.role && <span><strong>Role:</strong> {study.role}</span>}
                    </div>
                  </div>
                  
                  {/* Problem Statement */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                      <FileText size={20} />
                      Problem Statement
                    </h4>
                    <p className="text-gray-300">{study.problem}</p>
                  </div>
                  
                  {/* User Research & Personas */}
                  {study.userResearch && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <User size={20} />
                        User Research
                      </h4>
                      <p className="text-gray-300 mb-4">{study.userResearch}</p>
                      {study.personaImages && study.personaImages.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {study.personaImages.map((img, imgIdx) => (
                            <div key={imgIdx} className="border border-white/20 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <Users size={20} />
                        User Flows & Journey Maps
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.userFlows.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-white/20 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <Palette size={20} />
                        Wireframes
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {study.wireframes.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-white/20 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <MonitorSmartphone size={20} />
                        High-Fi Designs
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.highFiDesigns.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-white/20 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <Play size={20} />
                        Interactive Prototype
                      </h4>
                      <a 
                        href={study.prototypeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-400 text-[#0F172A] rounded-lg transition-all hover:from-yellow-500 hover:to-green-500"
                      >
                        <Play size={16} />
                        View Prototype
                      </a>
                    </div>
                  )}
                  
                  {/* Usability Testing */}
                  {study.usabilityTesting && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <BarChart3 size={20} />
                        Usability Testing Results
                      </h4>
                      <p className="text-gray-300">{study.usabilityTesting}</p>
                    </div>
                  )}
                  
                  {/* Key Decisions & Trade-offs */}
                  {study.keyDecisions && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <Settings size={20} />
                        Key Decisions & Trade-offs
                      </h4>
                      <p className="text-gray-300">{study.keyDecisions}</p>
                    </div>
                  )}
                  
                  {/* Outcomes & Metrics */}
                  {study.outcomes && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <Target size={20} />
                        Outcomes & Metrics
                      </h4>
                      <p className="text-gray-300">{study.outcomes}</p>
                    </div>
                  )}
                  
                  {/* Before/After Comparison */}
                  {study.beforeAfterImages && study.beforeAfterImages.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                        <Image size={20} />
                        Before & After
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {study.beforeAfterImages.map((img, imgIdx) => (
                          <div key={imgIdx} className="border border-white/20 rounded-lg overflow-hidden">
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
                      <h4 className="text-xl font-semibold mb-3 text-yellow-400 flex items-center gap-2">
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
        <section id="experience" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    {index < profile.experience.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-400 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8 bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-1">{exp.position}</h3>
                    <p className="text-yellow-400 mb-2">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.description && <p className="text-gray-300">{exp.description}</p>}
                    {exp.impact && (
                      <div className="mt-2 pt-2 border-t border-gray-600">
                        <span className="text-sm font-medium text-gray-300">Impact: </span>
                        <span className="text-sm text-gray-400">{exp.impact}</span>
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
        <section id="open-source" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Open Source & GitHub Activity
            </h2>
            
            {/* GitHub Stats */}
            {profile.openSource.githubUsername && (
              <div className="text-center mb-12">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">GitHub: @{profile.openSource.githubUsername}</h3>
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                  {profile.openSource.stats && (
                    <>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">{profile.openSource.stats.followers || 0}</div>
                        <div className="text-sm text-gray-400">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">{profile.openSource.stats.following || 0}</div>
                        <div className="text-sm text-gray-400">Following</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">{profile.openSource.stats.publicRepos || 0}</div>
                        <div className="text-sm text-gray-400">Repos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">{profile.openSource.stats.contributions || 0}</div>
                        <div className="text-sm text-gray-400">Contributions</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* GitHub Contribution Graph */}
            {profile.openSource.contributionGraph && (
              <div className="mb-12 text-center">
                <h4 className="text-xl font-semibold mb-4 text-yellow-400">Contribution Graph</h4>
                <img
                  src={`http://localhost:5000${profile.openSource.contributionGraph}`}
                  alt="GitHub Contribution Graph"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
            
            {/* Top Repositories */}
            {profile.openSource.topRepositories && profile.openSource.topRepositories.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold mb-6 text-center text-yellow-400">Top Repositories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.openSource.topRepositories.map((repo, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold">{repo.name}</h5>
                        <Github className="text-gray-400" size={20} />
                      </div>
                      <p className="text-gray-400 text-sm mb-4">{repo.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Star size={16} />
                            <span>{repo.stars || 0}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <GitFork size={16} />
                            <span>{repo.forks || 0}</span>
                          </div>
                        </div>
                        {repo.language && (
                          <span className="px-2 py-1 bg-white/10 rounded text-xs border border-white/20">
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
        <section id="education" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Education & Certifications
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Education */}
              {profile.education && profile.education.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent flex items-center gap-2">
                    <BookOpen size={24} />
                    Education
                  </h3>
                  <div className="space-y-6">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-semibold">{edu.degree}</h4>
                        <p className="text-yellow-400 font-medium">{edu.institution}</p>
                        <p className="text-gray-400 text-sm">{edu.startDate} - {edu.endDate || 'Present'}</p>
                        {edu.description && (
                          <p className="text-gray-300 mt-2">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Certifications */}
              {profile.certifications && profile.certifications.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent flex items-center gap-2">
                    <Award size={24} />
                    Certifications
                  </h3>
                  <div className="space-y-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 flex items-start gap-4">
                        {cert.image && (
                          <img
                            src={`http://localhost:5000${cert.image}`}
                            alt={cert.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-yellow-400 text-sm">{cert.issuer}</p>
                          <p className="text-gray-400 text-sm">{cert.date || cert.issuingDate}</p>
                          {cert.description && (
                            <p className="text-gray-300 mt-1 text-sm">{cert.description}</p>
                          )}
                          {cert.url && (
                            <a 
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-yellow-400 text-sm hover:underline flex items-center gap-1 mt-2"
                            >
                              <ExternalLink size={12} />
                              View Certificate
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
        <section id="achievements" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
                  <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
                    <Award size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{achievement.description}</p>
                  <div className="flex justify-center gap-2">
                    {achievement.proofLink && (
                      <a 
                        href={achievement.proofLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 text-sm hover:underline flex items-center gap-1"
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
        <section id="testimonials" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Testimonials
            </h2>
            <TestimonialCarousel testimonials={profile.testimonials} />
          </div>
        </section>
      )}

      {/* Services Section */}
      {profile.services && profile.services.length > 0 && (
        <section id="services" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Services
            </h2>
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
        <section id="availability" className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Availability & Pricing
            </h2>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 text-center">
              {profile.availability.openToWork ? (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/20 text-green-400 rounded-full border border-green-400/30">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Available for Freelance/Full-time</span>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-400/20 text-red-400 rounded-full border border-red-400/30">
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
        <section id="blogs" className="py-20 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Blogs
            </h2>
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
        <section id="resume" className="py-20 px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Resume
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {profile.identity.resumeFiles.map((resume, index) => (
                <ResumeButton key={index} resume={resume} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  onClick={() => {
                    setToastMessage('Message sent successfully!');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-green-400 text-[#0F172A] rounded-lg font-medium hover:from-yellow-500 hover:to-green-500 transition-all">
                  Send Message
                </button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              {profile.identity?.email && (
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-white">Email</h3>
                  <a 
                    href={`mailto:${profile.identity.email}`}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2"
                  >
                    <MailIcon size={16} />
                    {profile.identity.email}
                  </a>
                </div>
              )}
              
              {profile.identity?.phone && (
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-white">Phone</h3>
                  <a 
                    href={`tel:${profile.identity.phone}`}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2"
                  >
                    <Phone size={16} />
                    {profile.identity.phone}
                  </a>
                </div>
              )}
              
              {profile.identity?.calendlyLink && (
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-white">Schedule a Meeting</h3>
                  <a 
                    href={profile.identity.calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2"
                  >
                    <CalendarIcon size={16} />
                    Book a meeting
                  </a>
                </div>
              )}
              
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-white">Social Links</h3>
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
                        className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-yellow-400/20 hover:scale-110 transition-all"
                      >
                        <Icon size={24} />
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
      <footer className="py-8 px-6 relative z-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p>© {new Date().getFullYear()} {profile.identity?.name || 'Portfolio'}. Built with Portivo</p>
        </div>
      </footer>
    </div>
  );
};

export default ModernTemplate;

