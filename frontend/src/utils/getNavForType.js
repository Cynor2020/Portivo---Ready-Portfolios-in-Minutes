import {
  User,
  FileText,
  Code2,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  MessageCircle,
  Layers,
  Calendar,
  Image as ImageIcon,
  Wrench,
  Palette,
  Camera,
  Star,
  Mail,
} from 'lucide-react';

/**
 * Returns the nav configuration for the profile page based on portfolio type.
 * Each item: { label, icon, sectionId }
 */
const getNavForType = (portfolioType) => {
  switch (portfolioType) {
    case 'Developer':
      return [
        { label: 'Identity', icon: User, sectionId: 'identity' },
        { label: 'About', icon: FileText, sectionId: 'about' },
        { label: 'Skills', icon: Code2, sectionId: 'skills' },
        { label: 'Projects', icon: FolderGit2, sectionId: 'projects' },
        { label: 'Experience', icon: Briefcase, sectionId: 'experience' },
        { label: 'Education', icon: GraduationCap, sectionId: 'education' },
        { label: 'Certifications', icon: Award, sectionId: 'certifications' },
        { label: 'Achievements', icon: Award, sectionId: 'achievements' },
        { label: 'Testimonials', icon: MessageCircle, sectionId: 'testimonials' },
        { label: 'Services', icon: Layers, sectionId: 'services' },
        { label: 'Availability', icon: Calendar, sectionId: 'availability' },
        { label: 'Blogs', icon: FileText, sectionId: 'blogs' },
        { label: 'Open Source', icon: FolderGit2, sectionId: 'openSource' },
        { label: 'Contact', icon: Mail, sectionId: 'contact' },
      ];

    case 'UI/UX Designer':
      return [
        { label: 'Identity', icon: User, sectionId: 'identity' },
        { label: 'About', icon: FileText, sectionId: 'about' },
        { label: 'Design Process', icon: Palette, sectionId: 'designProcess' },
        { label: 'Tools', icon: Wrench, sectionId: 'tools' },
        { label: 'Case Studies', icon: FileText, sectionId: 'caseStudies' },
        { label: 'Visual Portfolio', icon: ImageIcon, sectionId: 'visualPortfolio' },
        { label: 'Experience', icon: Briefcase, sectionId: 'experience' },
        { label: 'Education', icon: GraduationCap, sectionId: 'education' },
        { label: 'Certifications', icon: Award, sectionId: 'certifications' },
        { label: 'Achievements', icon: Award, sectionId: 'achievements' },
        { label: 'Testimonials', icon: MessageCircle, sectionId: 'testimonials' },
        { label: 'Services', icon: Layers, sectionId: 'services' },
        { label: 'Availability', icon: Calendar, sectionId: 'availability' },
        { label: 'Contact', icon: Mail, sectionId: 'contact' },
      ];

    case 'Graphic Designer':
      return [
        { label: 'Identity', icon: User, sectionId: 'identity' },
        { label: 'About', icon: FileText, sectionId: 'about' },
        { label: 'Portfolio', icon: ImageIcon, sectionId: 'portfolio' },
        { label: 'Tools', icon: Wrench, sectionId: 'tools' },
        { label: 'Experience', icon: Briefcase, sectionId: 'experience' },
        { label: 'Education', icon: GraduationCap, sectionId: 'education' },
        { label: 'Certifications', icon: Award, sectionId: 'certifications' },
        { label: 'Achievements', icon: Award, sectionId: 'achievements' },
        { label: 'Testimonials', icon: MessageCircle, sectionId: 'testimonials' },
        { label: 'Services', icon: Layers, sectionId: 'services' },
        { label: 'Availability', icon: Calendar, sectionId: 'availability' },
        { label: 'Contact', icon: Mail, sectionId: 'contact' },
      ];

    case 'Digital Marketer':
      return [
        { label: 'Identity', icon: User, sectionId: 'identity' },
        { label: 'About', icon: FileText, sectionId: 'about' },
        { label: 'Campaigns', icon: FileText, sectionId: 'campaigns' },
        { label: 'Experience', icon: Briefcase, sectionId: 'experience' },
        { label: 'Education', icon: GraduationCap, sectionId: 'education' },
        { label: 'Certifications', icon: Award, sectionId: 'certifications' },
        { label: 'Achievements', icon: Award, sectionId: 'achievements' },
        { label: 'Testimonials', icon: MessageCircle, sectionId: 'testimonials' },
        { label: 'Services', icon: Layers, sectionId: 'services' },
        { label: 'Availability', icon: Calendar, sectionId: 'availability' },
        { label: 'Contact', icon: Mail, sectionId: 'contact' },
      ];

    case 'Content Writer':
      return [
        { label: 'Identity', icon: User, sectionId: 'identity' },
        { label: 'About', icon: FileText, sectionId: 'about' },
        { label: 'Writing Portfolio', icon: FileText, sectionId: 'portfolio' },
        { label: 'Experience', icon: Briefcase, sectionId: 'experience' },
        { label: 'Education', icon: GraduationCap, sectionId: 'education' },
        { label: 'Skills', icon: Layers, sectionId: 'skills' },
        { label: 'Achievements', icon: Award, sectionId: 'achievements' },
        { label: 'Testimonials', icon: MessageCircle, sectionId: 'testimonials' },
        { label: 'Services', icon: Layers, sectionId: 'services' },
        { label: 'Availability', icon: Calendar, sectionId: 'availability' },
        { label: 'Contact', icon: Mail, sectionId: 'contact' },
      ];

    case 'Photographer':
      return [
        { label: 'Identity', icon: User, sectionId: 'identity' },
        { label: 'About', icon: FileText, sectionId: 'about' },
        { label: 'Portfolio', icon: Camera, sectionId: 'portfolio' },
        { label: 'Skills', icon: Award, sectionId: 'skills' },
        { label: 'Experience', icon: Briefcase, sectionId: 'experience' },
        { label: 'Education', icon: GraduationCap, sectionId: 'education' },
        { label: 'Certifications', icon: Award, sectionId: 'certifications' },
        { label: 'Achievements', icon: Star, sectionId: 'achievements' },
        { label: 'Testimonials', icon: MessageCircle, sectionId: 'testimonials' },
        { label: 'Services', icon: Layers, sectionId: 'services' },
        { label: 'Availability', icon: Calendar, sectionId: 'availability' },
        { label: 'Contact', icon: Mail, sectionId: 'contact' },
      ];

    default:
      return [];
  }
};

export default getNavForType;
