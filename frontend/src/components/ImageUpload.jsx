import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadImage } from '../services/api';

const ImageUpload = ({ value, onChange, label = 'Image', maxSizeMB = 1 }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (error) {
      setError('Failed to upload image');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const baseUrl = apiUrl.replace('/api', '');
    return `${baseUrl}${path}`;
  };

  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">
        {label}
      </label>
      {value ? (
        <div className="relative">
          <img
            src={getImageUrl(value)}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg border border-zinc-800"
          />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-800 rounded-lg cursor-pointer hover:border-purple-main transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="text-text-secondary mb-2" size={24} />
            <p className="mb-2 text-sm text-text-secondary">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-text-secondary">
              Image under {maxSizeMB}MB (PNG, JPG, GIF, WEBP)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
      {uploading && (
        <p className="text-sm text-text-secondary mt-2">Uploading...</p>
      )}
      {error && (
        <p className="text-sm text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;

