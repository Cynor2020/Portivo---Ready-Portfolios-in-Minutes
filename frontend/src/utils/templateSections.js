/**
 * Utility functions for template sections
 */

/**
 * Generate dynamic navigation items based on profile data
 * @param {Object} profile - Profile data
 * @returns {Array} Array of navigation items with id and label
 */
export const getDynamicNavItems = (profile) => {
  if (!profile) return [];
  
  const navItems = [];
  const portfolioType = profile.portfolioType || 'Developer';
  
  // Customize navigation based on portfolio type
  if (portfolioType.toLowerCase() === 'ui/ux designer') {
    // HERO / INTRO - Always show
    navItems.push({ id: 'hero', label: 'Home' });
    
    // About - Show if about section has data
    if (profile.about && 
        (profile.about.summary || 
         profile.about.yearsOfExperience || 
         profile.about.domainExpertise?.length > 0 ||
         profile.about.designPhilosophy?.length > 0 ||
         profile.about.industries?.length > 0)) {
      navItems.push({ id: 'about', label: 'About' });
    }
    
    // Design Process - Show if design process exists
    if (profile.designProcess && profile.designProcess.length > 0) {
      navItems.push({ id: 'design-process', label: 'Design Process' });
    }
    
    // Tools & Proficiency - Show if tools exist
    if (profile.tools && profile.tools.length > 0) {
      navItems.push({ id: 'tools', label: 'Tools' });
    }
    
    // Case Studies - Show if case studies exist
    if (profile.caseStudies && profile.caseStudies.length > 0) {
      navItems.push({ id: 'case-studies', label: 'Case Studies' });
    }
    
    // Visual Portfolio - Show if visual portfolio exists
    if (profile.visualPortfolio && profile.visualPortfolio.length > 0) {
      navItems.push({ id: 'visual-portfolio', label: 'Portfolio' });
    }
    
    // Experience - Show if experience exists
    if (profile.experience && profile.experience.length > 0) {
      navItems.push({ id: 'experience', label: 'Experience' });
    }
    
    // Education & Certifications - Show if either exists
    if ((profile.education && profile.education.length > 0) || 
        (profile.certifications && profile.certifications.length > 0)) {
      navItems.push({ id: 'education', label: 'Education & Certs' });
    }
    
    // Achievements - Show if achievements exist
    if (profile.achievements && profile.achievements.length > 0) {
      navItems.push({ id: 'achievements', label: 'Achievements' });
    }
    
    // Testimonials - Show if testimonials exist
    if (profile.testimonials && profile.testimonials.length > 0) {
      navItems.push({ id: 'testimonials', label: 'Testimonials' });
    }
    
    // Services - Show if services exist
    if (profile.services && profile.services.length > 0) {
      navItems.push({ id: 'services', label: 'Services' });
    }
    
    // Availability & Pricing - Show if availability data exists
    if (profile.availability && (profile.availability.openToWork || profile.availability.hourlyRate)) {
      navItems.push({ id: 'availability', label: 'Availability' });
    }
    
    // Resume - Show if resume files exist
    if (profile.identity?.resumeFiles && profile.identity.resumeFiles.length > 0) {
      navItems.push({ id: 'resume', label: 'Resume' });
    }
    
    // Contact - Always show
    navItems.push({ id: 'contact', label: 'Contact' });
  } else if (portfolioType.toLowerCase() === 'developer') {
    // HERO / INTRO - Always show
    navItems.push({ id: 'hero', label: 'Home' });
    
    // About - Show if about section has data
    if (profile.about && 
        (profile.about.summary || 
         profile.about.yearsOfExperience || 
         profile.about.domainExpertise?.length > 0)) {
      navItems.push({ id: 'about', label: 'About' });
    }
    
    // Skills - Show if skills exist
    if (profile.skills && profile.skills.length > 0) {
      navItems.push({ id: 'skills', label: 'Skills' });
    }
    
    // Projects - Show if projects exist
    if (profile.projects && profile.projects.length > 0) {
      navItems.push({ id: 'projects', label: 'Projects' });
    }
    
    // Case Studies - Show if case studies exist
    if (profile.caseStudies && profile.caseStudies.length > 0) {
      navItems.push({ id: 'case-studies', label: 'Case Studies' });
    }
    
    // Experience - Show if experience exists
    if (profile.experience && profile.experience.length > 0) {
      navItems.push({ id: 'experience', label: 'Experience' });
    }
    
    // Open Source - Show if GitHub data exists
    if (profile.openSource && 
        (profile.openSource.githubUsername || 
         profile.openSource.topRepositories?.length > 0)) {
      navItems.push({ id: 'open-source', label: 'Open Source' });
    }
    
    // Education & Certifications - Show if either exists
    if ((profile.education && profile.education.length > 0) || 
        (profile.certifications && profile.certifications.length > 0)) {
      navItems.push({ id: 'education', label: 'Education & Certs' });
    }
    
    // Achievements - Show if achievements exist
    if (profile.achievements && profile.achievements.length > 0) {
      navItems.push({ id: 'achievements', label: 'Achievements' });
    }
    
    // Testimonials - Show if testimonials exist
    if (profile.testimonials && profile.testimonials.length > 0) {
      navItems.push({ id: 'testimonials', label: 'Testimonials' });
    }
    
    // Services - Show if services exist
    if (profile.services && profile.services.length > 0) {
      navItems.push({ id: 'services', label: 'Services' });
    }
    
    // Blogs - Show if blogs exist
    if (profile.blogs && profile.blogs.length > 0) {
      navItems.push({ id: 'blogs', label: 'Blogs' });
    }
    
    // Resume - Show if resume files exist
    if (profile.identity?.resumeFiles && profile.identity.resumeFiles.length > 0) {
      navItems.push({ id: 'resume', label: 'Resume' });
    }
    
    // Contact - Always show
    navItems.push({ id: 'contact', label: 'Contact' });
  } else {
    // Default navigation for other portfolio types
    navItems.push(
      { id: 'about', label: 'About' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'experience', label: 'Experience' },
      { id: 'certifications', label: 'Certifications' },
      { id: 'contact', label: 'Contact' }
    );
  }
  
  return navItems;
};

/**
 * Check if a section has data
 * @param {Object} profile - Profile data
 * @param {string} sectionId - Section ID
 * @returns {boolean} Whether the section has data
 */
export const hasSectionData = (profile, sectionId) => {
  if (!profile) return false;
  
  switch (sectionId) {
    case 'about':
      return profile.about && 
             (profile.about.summary || 
              profile.about.yearsOfExperience || 
              profile.about.domainExpertise?.length > 0);
    case 'skills':
      return profile.skills && profile.skills.length > 0;
    case 'projects':
      return profile.projects && profile.projects.length > 0;
    case 'case-studies':
      return profile.caseStudies && profile.caseStudies.length > 0;
    case 'experience':
      return profile.experience && profile.experience.length > 0;
    case 'open-source':
      return profile.openSource && 
             (profile.openSource.githubUsername || 
              profile.openSource.topRepositories?.length > 0);
    case 'education':
      return (profile.education && profile.education.length > 0) || 
             (profile.certifications && profile.certifications.length > 0);
    case 'achievements':
      return profile.achievements && profile.achievements.length > 0;
    case 'testimonials':
      return profile.testimonials && profile.testimonials.length > 0;
    case 'services':
      return profile.services && profile.services.length > 0;
    case 'blogs':
      return profile.blogs && profile.blogs.length > 0;
    case 'resume':
      return profile.identity?.resumeFiles && profile.identity.resumeFiles.length > 0;
    default:
      return true; // For sections that don't require specific data
  }
};