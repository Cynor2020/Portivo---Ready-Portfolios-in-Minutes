import { Code, Monitor, Globe, Briefcase, User } from 'lucide-react';

const ServiceCard = ({ service }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code size={32} />;
      case 'Monitor': return <Monitor size={32} />;
      case 'Globe': return <Globe size={32} />;
      case 'Briefcase': return <Briefcase size={32} />;
      default: return <User size={32} />;
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
        {getIcon(service.icon)}
      </div>
      <h3 className="text-xl font-semibold text-center mb-4 text-white">{service.title}</h3>
      <p className="text-gray-300 text-center mb-6">{service.description}</p>
      {service.price && (
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-400">{service.price}</p>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;