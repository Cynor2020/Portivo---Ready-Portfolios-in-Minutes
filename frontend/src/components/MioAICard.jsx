import { Sparkles } from 'lucide-react';

const MioAICard = () => {
  return (
    <div className="bg-gradient-to-br from-purple-main to-purple-active rounded-xl p-6 border border-purple-main hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white bg-opacity-20 rounded-lg">
          <Sparkles className="text-white" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">PORTIVO AI</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            Let AI build your portfolio in seconds. Coming soon!
          </p>
          <button className="px-4 py-2 bg-white text-purple-main rounded-lg font-medium hover:bg-opacity-90 transition-all">
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MioAICard;

