import { Plus, Lock } from 'lucide-react';

const ProfileSectionCard = ({
  title,
  children,
  onAdd,
  locked = false,
  count = 0,
}) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        {locked ? (
          <div className="flex items-center gap-2 text-text-secondary">
            <Lock size={16} />
            <span className="text-sm">Locked</span>
          </div>
        ) : (
          onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-main hover:bg-purple-hover text-white rounded-lg text-sm font-medium transition-all"
            >
              <Plus size={16} />
              Add
            </button>
          )
        )}
      </div>
      {count > 0 && (
        <p className="text-sm text-text-secondary mb-4">{count} items</p>
      )}
      <div>{children}</div>
    </div>
  );
};

export default ProfileSectionCard;

