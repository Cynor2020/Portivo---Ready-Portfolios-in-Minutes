import { Lock } from 'lucide-react';

const LockedFeature = ({ 
  title, 
  description, 
  ctaText = "Upgrade to Pro", 
  onUpgrade 
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-zinc-900/30 rounded-2xl border border-zinc-800 backdrop-blur-sm">
      <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
        <Lock className="w-8 h-8 text-purple-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-3">
        {title}
      </h2>
      
      <p className="text-zinc-400 max-w-md mb-8">
        {description}
      </p>
      
      <button
        onClick={onUpgrade}
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20"
      >
        {ctaText}
      </button>
    </div>
  );
};

export default LockedFeature;
