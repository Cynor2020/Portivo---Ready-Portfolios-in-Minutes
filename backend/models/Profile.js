const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    portfolioType: {
      type: String,
      enum: ['Developer', 'Graphic Designer', 'Photographer'],
      default: 'Developer',
    },
    identity: {
      name: { type: String, default: '' },
      roles: { type: [String], default: [] },
      avatar: { type: String, default: '' },
      bio: { type: String, default: '' },
      tagline: { type: String, default: '' },
      location: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      resumeFiles: [{ name: { type: String }, url: { type: String }, type: { type: String } }],
      viewProjectsLabel: { type: String, default: 'View Projects' },
      hireMeLabel: { type: String, default: 'Hire Me' },
      downloadResumeLabel: { type: String, default: 'Download Resume' },
      contactMessage: { type: String, default: '' },
      calendlyLink: { type: String, default: '' },
    },
    socials: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    // Developer fields - Enhanced for Premium
    // About Me Section
    about: {
      summary: { type: String, default: '' },
      yearsOfExperience: { type: String, default: '' },
      currentStatus: { type: String, default: '' }, // Student/Freelancer/Professional/Open to opportunities
      domainExpertise: { type: [String], default: [] }, // SaaS, AI, FinTech, etc.
      workPreference: { type: [String], default: [] }, // Remote/Freelance/Full-time
    },
    // Skills & Tech Stack - Structured
    skills: [
      {
        name: { type: String },
        category: { type: String }, // Languages, Frontend, Backend, Database, DevOps, AI/ML, Tools
        level: { type: String }, // Beginner, Intermediate, Advanced, Expert
        yearsOfExperience: { type: Number },
      },
    ],
    currentlyLearning: { type: [String], default: [] },
    // Enhanced Projects
    projects: [
      {
        title: { type: String },
        description: { type: String },
        techStack: [{ type: String }],
        role: { type: String },
        keyFeatures: [{ type: String }],
        metrics: { type: String }, // e.g., "10K+ users", "50% performance improvement"
        liveLink: { type: String },
        githubLink: { type: String },
        screenshots: [{ type: String }],
        demoVideo: { type: String },
        featured: { type: Boolean },
      },
    ],
    // Case Studies (detailed project breakdowns)
    caseStudies: [
      {
        title: { type: String },
        problem: { type: String },
        approach: { type: String },
        architecture: { type: String },
        decisions: { type: String },
        results: { type: String },
        images: [{ type: String }],
        techStack: [{ type: String }],
      },
    ],
    // Enhanced Experience
    experience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
        techStack: [{ type: String }],
        impact: { type: String }, // Quantified results
        current: { type: Boolean },
      },
    ],
    // Enhanced Education
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        gpa: { type: String },
        current: { type: Boolean },
      },
    ],
    // Enhanced Certifications
    certifications: [
      {
        name: { type: String },
        issuer: { type: String },
        date: { type: String },
        credentialLink: { type: String },
        certificateImage: { type: String },
      },
    ],
    // Open Source & GitHub Activity
    openSource: {
      githubUsername: String,
      topRepositories: [
        {
          name: { type: String },
          description: { type: String },
          stars: { type: Number },
          forks: { type: Number },
          url: { type: String },
        },
      ],
      contributions: [
        {
          project: { type: String },
          description: { type: String },
          prUrl: { type: String },
        },
      ],
      contributionGraph: String, // URL to contribution heatmap image
    },
    // Achievements & Proof
    achievements: [
      {
        title: { type: String },
        type: { type: String }, // Hackathon, Award, Feature, Community
        issuer: { type: String },
        date: { type: String },
        description: { type: String },
        proofLink: { type: String },
      },
    ],
    // Testimonials
    testimonials: [
      {
        name: { type: String },
        role: { type: String },
        company: { type: String },
        text: { type: String },
        photo: { type: String },
        date: { type: String },
      },
    ],
    // Services/What I Offer
    services: [
      {
        title: { type: String },
        description: { type: String },
        icon: { type: String }, // Icon name or emoji
      },
    ],
    // Availability & Pricing
    availability: {
      openToWork: Boolean,
      workTypes: [String], // Freelance, Full-time, Contract, Part-time
      hourlyRate: String,
      projectRate: String,
      ndaReady: Boolean,
      calendlyLink: String,
    },
    // Blogs/Knowledge Sharing
    blogs: [
      {
        title: { type: String },
        excerpt: { type: String },
        link: { type: String },
        readTime: { type: String },
        date: { type: String },
        featured: { type: Boolean },
      },
    ],
    references: [
      {
        name: { type: String },
        position: { type: String },
        company: { type: String },
        email: { type: String },
        phone: { type: String },
      },
    ],
    // Photographer fields
    galleryPortfolio: [
      {
        image: { type: String },
        title: { type: String },
        description: { type: String },
        category: { type: String }, // Landscape, Portrait, etc.
      },
    ],
    clients: [
      {
        name: { type: String },
        project: { type: String },
        date: { type: String },
        feedback: { type: String },
      },
    ],
    equipment: { type: [String], default: [] },
    exhibitions: [
      {
        event: { type: String },
        date: { type: String },
        location: { type: String },
        description: { type: String },
      },
    ],
    publications: [
      {
        title: { type: String },
        publisher: { type: String },
        date: { type: String },
        link: { type: String },
      },
    ],
    styleSpecialties: { type: [String], default: [] },
    // Graphic Designer fields
    tools: [
      {
        name: { type: String },
        proficiency: { type: String },
        years: { type: Number },
      },
    ],
    visualPortfolio: [
      {
        image: { type: String },
        title: { type: String },
        description: { type: String },
        category: { type: String },
      },
    ],
    brandIdentities: [
      {
        client: { type: String },
        description: { type: String },
        images: [{ type: String }],
      },
    ],
    illustrations: [
      {
        image: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
    printDigitalWork: [
      {
        image: { type: String },
        title: { type: String },
        type: { type: String }, // Print or Digital
        description: { type: String },
      },
    ],
    specialties: { type: [String], default: [] },
    // Deployment and activation
    subdomain: {
      type: String,
      unique: true,
      sparse: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    template: {
      type: String,
      enum: ['dark', 'light', 'modern'],
      default: 'dark',
    },
    deployment: {
      isDeployed: {
        type: Boolean,
        default: false,
      },
      templateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Template',
      },
      deployedAt: {
        type: Date,
      },
    },
    profileStrength: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
profileSchema.index({ userId: 1 });
profileSchema.index({ subdomain: 1 });

// Calculate profile strength before saving
profileSchema.pre('save', function (next) {
  let strength = 0;
  let totalFields = 0;

  // Common fields (all types)
  totalFields += 2; // identity.name, identity.bio
  if (this.identity?.name) strength += 1;
  if (this.identity?.bio) strength += 1;

  totalFields += 1; // socials
  if (this.socials && this.socials.length > 0) strength += 1;

  // Type-specific fields
  switch (this.portfolioType) {
    case 'Developer':
      totalFields += 8;
      if (this.skills && this.skills.length > 0) strength += 1;
      if (this.projects && this.projects.length > 0) strength += 1;
      if (this.experience && this.experience.length > 0) strength += 1;
      if (this.education && this.education.length > 0) strength += 1;
      if (this.certifications && this.certifications.length > 0) strength += 1;
      if (this.openSource && this.openSource.githubUsername) strength += 1;
      if (this.about && this.about.summary) strength += 1;
      if (this.testimonials && this.testimonials.length > 0) strength += 1;
      break;
    case 'Photographer':
      totalFields += 7;
      if (this.galleryPortfolio && this.galleryPortfolio.length > 0) strength += 1;
      if (this.clients && this.clients.length > 0) strength += 1;
      if (this.equipment && this.equipment.length > 0) strength += 1;
      if (this.exhibitions && this.exhibitions.length > 0) strength += 1;
      if (this.publications && this.publications.length > 0) strength += 1;
      if (this.styleSpecialties && this.styleSpecialties.length > 0) strength += 1;
      if (this.education && this.education.length > 0) strength += 1;
      break;
    case 'UI/UX Designer':
      totalFields += 14; // Updated for complete UI/UX requirements
      if (this.identity?.name) strength += 0.20; // 20% weight
      if (this.identity?.bio) strength += 0.20; // 20% weight
      if (this.caseStudies && this.caseStudies.length > 0) strength += 0.40; // 40% weight
      if (this.tools && this.tools.length > 0) strength += 0.10; // 10% weight
      if (this.visualPortfolio && this.visualPortfolio.length > 0) strength += 0.15; // 15% weight
      if (this.about && this.about.summary) strength += 0.05; // 5% weight
      if (this.experience && this.experience.length > 0) strength += 0.05; // 5% weight
      if (this.education && this.education.length > 0) strength += 0.05; // 5% weight
      if (this.designProcess && this.designProcess.length > 0) strength += 0.05; // 5% weight
      if (this.certifications && this.certifications.length > 0) strength += 0.05; // 5% weight
      if (this.achievements && this.achievements.length > 0) strength += 0.05; // 5% weight
      if (this.testimonials && this.testimonials.length > 0) strength += 0.05; // 5% weight
      if (this.services && this.services.length > 0) strength += 0.05; // 5% weight
      if (this.availability) strength += 0.05; // 5% weight
      break;
    case 'Graphic Designer':
      totalFields += 6;
      if (this.visualPortfolio && this.visualPortfolio.length > 0) strength += 1;
      if (this.clients && this.clients.length > 0) strength += 1;
      if (this.tools && this.tools.length > 0) strength += 1;
      if (this.brandIdentities && this.brandIdentities.length > 0) strength += 1;
      if (this.awards && this.awards.length > 0) strength += 1;
      if (this.specialties && this.specialties.length > 0) strength += 1;
      break;
    case 'Content Writer':
      totalFields += 6;
      if (this.writingSamples && this.writingSamples.length > 0) strength += 1;
      if (this.publications && this.publications.length > 0) strength += 1;
      if (this.topics && this.topics.length > 0) strength += 1;
      if (this.seoSkills && this.seoSkills.length > 0) strength += 1;
      if (this.education && this.education.length > 0) strength += 1;
      if (this.awards && this.awards.length > 0) strength += 1;
      break;
    case 'Digital Marketer':
      totalFields += 6;
      if (this.campaigns && this.campaigns.length > 0) strength += 1;
      if (this.metrics && (this.metrics.roi || this.metrics.ctr)) strength += 1;
      if (this.tools && this.tools.length > 0) strength += 1;
      if (this.clients && this.clients.length > 0) strength += 1;
      if (this.certifications && this.certifications.length > 0) strength += 1;
      if (this.education && this.education.length > 0) strength += 1;
      break;
    case 'Architect':
      totalFields += 6;
      if (this.projectGallery && this.projectGallery.length > 0) strength += 1;
      if (this.builtWorks && this.builtWorks.length > 0) strength += 1;
      if (this.tools && this.tools.length > 0) strength += 1;
      if (this.awards && this.awards.length > 0) strength += 1;
      if (this.education && this.education.length > 0) strength += 1;
      if (this.professionalLicenses && this.professionalLicenses.length > 0) strength += 1;
      break;
    case 'Musician / Artist':
      totalFields += 6;
      if (this.audioVideoPortfolio && this.audioVideoPortfolio.length > 0) strength += 1;
      if (this.releases && this.releases.length > 0) strength += 1;
      if (this.performances && this.performances.length > 0) strength += 1;
      if (this.instruments && this.instruments.length > 0) strength += 1;
      if (this.collaborations && this.collaborations.length > 0) strength += 1;
      if (this.education && this.education.length > 0) strength += 1;
      break;
    case 'Teacher / Educator':
      totalFields += 6;
      if (this.coursesTaught && this.coursesTaught.length > 0) strength += 1;
      if (this.studentsImpact && (this.studentsImpact.stats || this.studentsImpact.testimonials?.length > 0)) strength += 1;
      if (this.subjects && this.subjects.length > 0) strength += 1;
      if (this.certifications && this.certifications.length > 0) strength += 1;
      if (this.institutions && this.institutions.length > 0) strength += 1;
      if (this.education && this.education.length > 0) strength += 1;
      break;
    case 'Custom':
      totalFields += 1;
      if (this.customFields && this.customFields.length > 0) strength += 1;
      break;
  }

  this.profileStrength = totalFields > 0 ? Math.round((strength / totalFields) * 100) : 0;
  next();
});

module.exports = mongoose.model('Profile', profileSchema);
