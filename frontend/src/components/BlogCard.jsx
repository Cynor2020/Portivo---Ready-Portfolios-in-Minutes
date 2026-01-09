import { ExternalLink } from 'lucide-react';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      {blog.image && (
        <img
          src={`http://localhost:5000${blog.image}`}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 text-white">{blog.title}</h3>
      <p className="text-gray-300 mb-4 text-sm">{blog.excerpt}</p>
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <span>{blog.date}</span>
        <span>{blog.readTime} read</span>
      </div>
      <a 
        href={blog.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
      >
        Read More <ExternalLink size={16} />
      </a>
    </div>
  );
};

export default BlogCard;