import { CheckCircle2 } from 'lucide-react';

const PortfolioTypeCard = ({ type, icon: Icon, description, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl border-2 transition-all duration-200 text-left relative ${
        isActive
          ? 'border-purple-main bg-purple-main bg-opacity-10'
          : 'border-zinc-800 bg-card hover:border-zinc-700 hover:scale-[1.02]'
      }`}
    >
      {/* Top status row */}
      <div className="mb-4 flex items-center justify-between text-[11px]">
        <div className="font-medium uppercase tracking-[0.12em] text-text-secondary/70">
          {isActive ? 'ACTIVE PORTFOLIO TYPE' : 'PORTFOLIO TYPE'}
        </div>
        {isActive && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/60 text-emerald-300 font-semibold">
              ACTIVE
            </span>
            <span className="text-purple-main text-[11px] font-semibold tracking-wide">
              SELECTED &gt;
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start gap-4 mb-3">
        <div
          className={`p-3 rounded-lg ${
            isActive
              ? 'bg-purple-main bg-opacity-20'
              : 'bg-zinc-800'
          }`}
        >
          <Icon
            className={isActive ? 'text-purple-main' : 'text-text-secondary'}
            size={24}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-semibold text-text-primary truncate">{type}</h3>
            {isActive && (
              <CheckCircle2 className="text-purple-main flex-shrink-0" size={20} />
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-text-secondary">{description}</p>
    </button>
  );
};

export default PortfolioTypeCard;
