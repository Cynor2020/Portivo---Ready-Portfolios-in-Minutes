import { Wand2, Palette, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreatorLaunchpad = () => {
  const cards = [
    {
      icon: Wand2,
      title: 'Profile Wizard',
      description: 'Quick setup guide',
      link: '/profile',
      color: 'purple',
    },
    {
      icon: Palette,
      title: 'Template Gallery',
      description: 'Choose a design',
      link: '/templates',
      color: 'blue',
    },
    {
      icon: Sparkles,
      title: 'PORVITO AI',
      description: 'AI-powered builder',
      link: '#',
      color: 'purple',
    },
  ];

  const Card = ({ icon: Icon, title, description, link, color }) => {
    const Component = link === '#' ? 'div' : Link;
    const props = link === '#' ? {} : { to: link };

    const colorClasses = {
      purple: 'bg-purple-main bg-opacity-20 text-purple-main',
      blue: 'bg-blue-500 bg-opacity-20 text-blue-400',
    };

    return (
      <Component
        {...props}
        className="bg-card rounded-xl p-6 border border-zinc-800 hover:scale-[1.02] hover:border-purple-main transition-all duration-200 cursor-pointer"
      >
        <div className={`p-3 ${colorClasses[color] || colorClasses.purple} rounded-lg w-fit mb-4`}>
          <Icon size={24} />
        </div>
        <h4 className="text-lg font-semibold text-text-primary mb-2">{title}</h4>
        <p className="text-sm text-text-secondary">{description}</p>
      </Component>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-text-primary mb-6">
        Creator Launchpad
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default CreatorLaunchpad;

