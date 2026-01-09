import { Eye, Rocket } from 'lucide-react';

const TemplateCard = ({ template, onPreview, onDeploy, isDeployed = false }) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-zinc-800 hover:scale-[1.02] hover:border-purple-main transition-all duration-200">
      <div className="relative h-48 overflow-hidden">
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {template.name}
        </h3>
        <p className="text-sm text-text-secondary mb-4">{template.description}</p>

        {/* Tags */}
        {template.tags && template.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {template.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-zinc-800 text-text-secondary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onPreview(template)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-text-primary rounded-lg font-medium transition-all"
          >
            <Eye size={18} />
            Preview
          </button>
          <button
            onClick={() => onDeploy(template)}
            disabled={isDeployed}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDeployed
                ? 'bg-zinc-800 text-text-secondary cursor-not-allowed'
                : 'bg-purple-main hover:bg-purple-hover text-white'
            }`}
          >
            <Rocket size={18} />
            {isDeployed ? 'Deployed' : 'Deploy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;

