import { Link } from 'react-router-dom';

const ProfileStrengthCard = ({ stats }) => {
  const { strength = 0, missing = [], completed = 0, total = 0 } = stats || {};

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:scale-[1.02] transition-transform duration-200">
      <h3 className="text-lg font-semibold text-white mb-4">
        Profile Strength
      </h3>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-3xl font-bold text-white">
            {strength}%
          </span>
          <span className="text-sm text-gray-400">
            {completed}/{total} sections completed
          </span>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      {/* Missing Sections */}
      {missing.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-2">Missing sections:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {missing.map((section, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-900/50 text-purple-300 text-xs rounded-full border border-purple-700/50"
              >
                {section}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Complete Now Button */}
      <Link 
        to="/profile"
        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center text-sm font-medium transition-colors block"
      >
        Complete Now
      </Link>
    </div>
  );
};

export default ProfileStrengthCard;
