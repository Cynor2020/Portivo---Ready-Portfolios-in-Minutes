/**
 * Premium Card Component
 * 
 * A reusable card component with glassmorphism effects,
 * gradient borders, and smooth hover animations.
 * 
 * Usage:
 * <PremiumCard>
 *   <h2>Card Title</h2>
 *   <p>Card content...</p>
 * </PremiumCard>
 * 
 * <PremiumCard hover={true} className="...">
 *   Content
 * </PremiumCard>
 */

const PremiumCard = ({ 
  children, 
  className = '', 
  hover = false,
  gradient = false 
}) => {
  return (
    <div 
      className={`
        relative
        bg-card/80 backdrop-blur-xl 
        border border-zinc-800/50 
        rounded-xl 
        p-fluid-md md:p-fluid-lg
        transition-all duration-300 ease-out
        ${hover ? 'hover:border-purple-main/50 hover:shadow-glow hover:-translate-y-1' : ''}
        ${gradient ? 'before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-purple-main/20 before:to-transparent before:-z-10' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default PremiumCard;
