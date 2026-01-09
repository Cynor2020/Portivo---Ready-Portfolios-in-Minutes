import { ExternalLink } from 'lucide-react';

/**
 * Reusable portfolio sections component
 * Renders sections based on portfolio type
 */
export const renderPortfolioSections = (portfolioType, profile, theme = 'dark') => {
  const isDark = theme === 'dark';
  const bgCard = isDark ? 'bg-[#18181B]' : 'bg-white';
  const bgMain = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F3F4F6]';
  const textPrimary = isDark ? 'text-white' : 'text-[#1F2937]';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const accentColor = isDark ? 'text-green-400' : 'text-[#3B82F6]';
  const borderColor = isDark ? 'border-zinc-800' : 'border-gray-200';

  const sections = [];

  // Developer Sections
  if (portfolioType === 'Developer') {
    if (profile?.skills && profile.skills.length > 0) {
      sections.push(
        <section key="skills" id="skills" className={`py-20 px-6 ${bgMain}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Skills</h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-6 py-3 ${bgCard} rounded-full ${accentColor} font-medium hover:scale-105 transition-all`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.projects && profile.projects.length > 0) {
      sections.push(
        <section key="projects" id="projects" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.projects.map((project, index) => (
                <div
                  key={index}
                  className={`${bgMain} rounded-xl p-6 border ${borderColor} hover:scale-105 transition-all`}
                >
                  {project.image && (
                    <img
                      src={`http://localhost:5000${project.image}`}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{project.title}</h3>
                  <p className={`${textSecondary} mb-4 text-sm`}>{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${accentColor} hover:underline flex items-center gap-2`}
                    >
                      View Project <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.experience && profile.experience.length > 0) {
      sections.push(
        <section key="experience" id="experience" className={`py-20 px-6 ${bgMain}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Experience</h2>
            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 ${isDark ? 'bg-green-500' : 'bg-[#3B82F6]'} rounded-full`}></div>
                    {index < profile.experience.length - 1 && (
                      <div className={`w-0.5 h-full ${isDark ? 'bg-zinc-800' : 'bg-gray-300'} mt-2`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className={`text-xl font-semibold mb-1 ${textPrimary}`}>{exp.position}</h3>
                    <p className={`${accentColor} mb-2`}>{exp.company}</p>
                    <p className={`${textSecondary} text-sm mb-2`}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.description && <p className={textSecondary}>{exp.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.education && profile.education.length > 0) {
      sections.push(
        <section key="education" id="education" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Education</h2>
            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <div key={index} className={`${bgMain} rounded-xl p-6 border ${borderColor}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{edu.degree}</h3>
                  <p className={`${accentColor} mb-2`}>{edu.institution}</p>
                  <p className={textSecondary}>{edu.field}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.certifications && profile.certifications.length > 0) {
      sections.push(
        <section key="certifications" id="certifications" className={`py-20 px-6 ${bgMain}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.certifications.map((cert, index) => (
                <div key={index} className={`${bgCard} rounded-xl p-6 border ${borderColor}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{cert.name}</h3>
                  <p className={`${accentColor} mb-2`}>{cert.issuer}</p>
                  <p className={textSecondary}>{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
  }

  // Photographer Sections
  if (portfolioType === 'Photographer') {
    if (profile?.galleryPortfolio && profile.galleryPortfolio.length > 0) {
      sections.push(
        <section key="gallery" id="gallery" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Gallery Portfolio</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {profile.galleryPortfolio.map((item, index) => (
                <div key={index} className="mb-4 break-inside-avoid">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.title}
                    className="w-full rounded-lg hover:opacity-80 transition-all"
                  />
                  {item.title && <p className={`${textSecondary} text-sm mt-2`}>{item.title}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.clients && profile.clients.length > 0) {
      sections.push(
        <section key="clients" id="clients" className={`py-20 px-6 ${bgMain}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.clients.map((client, index) => (
                <div key={index} className={`${bgCard} rounded-xl p-6 border ${borderColor}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{client.name}</h3>
                  <p className={`${accentColor} mb-2`}>{client.project}</p>
                  {client.feedback && <p className={`${textSecondary} text-sm`}>{client.feedback}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.exhibitions && profile.exhibitions.length > 0) {
      sections.push(
        <section key="exhibitions" id="exhibitions" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Exhibitions</h2>
            <div className="space-y-6">
              {profile.exhibitions.map((exhibition, index) => (
                <div key={index} className={`${bgMain} rounded-xl p-6 border ${borderColor}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{exhibition.event}</h3>
                  <p className={`${accentColor} mb-2`}>{exhibition.location}</p>
                  <p className={textSecondary}>{exhibition.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.equipment && profile.equipment.length > 0) {
      sections.push(
        <section key="equipment" id="equipment" className={`py-20 px-6 ${bgMain}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Equipment</h2>
            <div className="flex flex-wrap gap-3">
              {profile.equipment.map((item, index) => (
                <span
                  key={index}
                  className={`px-6 py-3 ${bgCard} rounded-full ${accentColor} font-medium`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.education && profile.education.length > 0) {
      sections.push(
        <section key="education" id="education" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Education</h2>
            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <div key={index} className={`${bgMain} rounded-xl p-6 border ${borderColor}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{edu.degree}</h3>
                  <p className={accentColor}>{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
  }

  // UI/UX Designer Sections
  if (portfolioType === 'UI/UX Designer') {
    if (profile?.caseStudies && profile.caseStudies.length > 0) {
      sections.push(
        <section key="case-studies" id="case-studies" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Case Studies</h2>
            <div className="space-y-8">
              {profile.caseStudies.map((study, index) => (
                <div key={index} className={`${bgMain} rounded-xl p-8 border ${borderColor}`}>
                  <h3 className={`text-2xl font-semibold mb-4 ${textPrimary}`}>{study.title}</h3>
                  <p className={`${textSecondary} mb-4`}>{study.description}</p>
                  {study.process && (
                    <div className="mb-4">
                      <h4 className={`${accentColor} mb-2`}>Process</h4>
                      <p className={textSecondary}>{study.process}</p>
                    </div>
                  )}
                  {study.tools && study.tools.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tools.map((tool, i) => (
                        <span key={i} className={`px-3 py-1 ${bgCard} rounded-full text-sm`}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                  {study.link && (
                    <a
                      href={study.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${accentColor} hover:underline flex items-center gap-2`}
                    >
                      View Case Study <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.tools && profile.tools.length > 0) {
      sections.push(
        <section key="tools" id="tools" className={`py-20 px-6 ${bgMain}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Tools & Software</h2>
            <div className="flex flex-wrap gap-3">
              {profile.tools.map((tool, index) => (
                <span
                  key={index}
                  className={`px-6 py-3 ${bgCard} rounded-full ${accentColor} font-medium`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.visualWork && profile.visualWork.length > 0) {
      sections.push(
        <section key="prototypes" id="prototypes" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Visual Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.visualWork.map((work, index) => (
                <div key={index} className={`${bgMain} rounded-xl overflow-hidden border ${borderColor}`}>
                  {work.image && (
                    <img
                      src={`http://localhost:5000${work.image}`}
                      alt={work.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className={`text-lg font-semibold mb-2 ${textPrimary}`}>{work.title}</h3>
                    <p className={`${textSecondary} text-sm`}>{work.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.experience && profile.experience.length > 0) {
      sections.push(
        <section key="experience" id="experience" className={`py-20 px-6 ${bgMain}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Experience</h2>
            <div className="space-y-8">
              {profile.experience.map((exp, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 ${isDark ? 'bg-green-500' : 'bg-[#3B82F6]'} rounded-full`}></div>
                    {index < profile.experience.length - 1 && (
                      <div className={`w-0.5 h-full ${isDark ? 'bg-zinc-800' : 'bg-gray-300'} mt-2`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className={`text-xl font-semibold mb-1 ${textPrimary}`}>{exp.position}</h3>
                    <p className={`${accentColor} mb-2`}>{exp.company}</p>
                    <p className={`${textSecondary} text-sm`}>{exp.startDate} - {exp.endDate || 'Present'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (profile?.awards && profile.awards.length > 0) {
      sections.push(
        <section key="awards" id="awards" className={`py-20 px-6 ${bgCard}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl font-bold mb-12 ${textPrimary}`}>Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.awards.map((award, index) => (
                <div key={index} className={`${bgMain} rounded-xl p-6 border ${borderColor}`}>
                  <h3 className={`text-xl font-semibold mb-2 ${textPrimary}`}>{award.name}</h3>
                  <p className={`${accentColor} mb-2`}>{award.issuer}</p>
                  <p className={textSecondary}>{award.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }
  }

  // Add more portfolio types here...
  // For brevity, showing Developer, Photographer, and UI/UX Designer
  // Similar patterns can be applied for other types

  return sections;
};

