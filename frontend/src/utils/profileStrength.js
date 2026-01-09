
export const portfolioTypeConfig = {
  Developer: {
    requiredFields: ['fullName', 'roles', 'avatar', 'skills', 'projects', 'github'],
    tabs: ['Identity', 'About', 'Skills', 'Projects', 'Experience', 'Education']
  },
  'UI/UX Designer': {
    requiredFields: ['fullName', 'roles', 'avatar', 'projects', 'caseStudies', 'designTools'],
    tabs: ['Identity', 'About', 'Skills', 'Projects', 'Experience', 'Education']
  },
  'Graphic Designer': {
    requiredFields: ['fullName', 'roles', 'avatar', 'projects', 'illustrations', 'designSoftware'],
    tabs: ['Identity', 'About', 'Skills', 'Projects', 'Experience', 'Education']
  },
  'Digital Marketer': {
    requiredFields: ['fullName', 'roles', 'avatar', 'projects', 'seoSkills', 'analytics'],
    tabs: ['Identity', 'About', 'Skills', 'Projects', 'Experience', 'Certifications']
  },
  'Content Writer': {
    requiredFields: ['fullName', 'roles', 'avatar', 'writingSamples', 'niches', 'published'],
    tabs: ['Identity', 'About', 'Skills', 'Projects', 'Experience', 'Education']
  },
  'Photographer': {
    requiredFields: ['fullName', 'roles', 'avatar', 'gallery', 'equipment', 'style'],
    tabs: ['Identity', 'About', 'Skills', 'Projects', 'Experience', 'Certifications']
  }
};

const checkField = (profile, field) => {
  if (!profile) return false;

  switch (field) {
    case 'fullName':
      return !!profile.identity?.name;
    case 'roles':
      return profile.identity?.roles?.length > 0;
    case 'avatar':
      return !!profile.identity?.avatar;
    case 'skills':
      return profile.skills?.length > 0;
    case 'projects':
      return profile.projects?.length > 0;
    case 'github':
      return !!profile.openSource?.githubUsername || profile.socials?.some(s => s.platform.toLowerCase() === 'github');
    case 'portfolio':
    case 'gallery':
    case 'writingSamples':
      return profile.projects?.length > 0;
    case 'caseStudies':
      return profile.caseStudies?.length > 0;
    case 'designTools':
    case 'designSoftware':
    case 'seoSkills':
    case 'analytics':
    case 'equipment':
      return profile.skills?.length > 0; // Simplified check for now
    case 'illustrations':
    case 'campaigns':
      return profile.projects?.length > 0;
    case 'niches':
      return profile.about?.domainExpertise?.length > 0;
    case 'published':
      return profile.blogs?.length > 0 || profile.projects?.some(p => !!p.liveLink);
    case 'style':
      return !!profile.identity?.bio; // Assuming style is described in bio
    default:
      return false;
  }
};

export const calculateProfileStrength = (profile) => {
  if (!profile) return { strength: 0, missing: [] };

  const type = profile.portfolioType || 'Developer';
  const config = portfolioTypeConfig[type] || portfolioTypeConfig['Developer'];
  
  let completedCount = 0;
  const missing = [];

  config.requiredFields.forEach(field => {
    if (checkField(profile, field)) {
      completedCount++;
    } else {
      // Format field name for display (e.g., 'fullName' -> 'Full Name')
      const displayName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      missing.push(`Add ${displayName}`);
    }
  });

  const strength = Math.round((completedCount / config.requiredFields.length) * 100);

  return { 
    strength, 
    missing,
    completed: completedCount,
    total: config.requiredFields.length
  };
};
