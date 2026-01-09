import { Download } from 'lucide-react';

const ResumeButton = ({ resume, index }) => {
  return (
    <a 
      href={`http://localhost:5000${resume.url}`}
      download
      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2"
    >
      <Download size={16} />
      {resume.name || `Resume ${index + 1}`}
    </a>
  );
};

export default ResumeButton;