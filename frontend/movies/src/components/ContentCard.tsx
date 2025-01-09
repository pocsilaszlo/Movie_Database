import React from 'react';
import { Play, Star, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ContentCardProps {
  id: string;
  title: string;
  rating: number;
  image: string;
}

const ContentCard = ({ id, title, rating, image }: ContentCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-lg overflow-hidden">
      <div className="aspect-[2/3]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/50 hover:bg-gray-900 transition-colors"
          title="Add to My List"
        >
          <Bookmark size={16} />
        </button>
        <div className="absolute bottom-0 p-4">
          <h3 className="text-sm font-bold mb-1">{title}</h3>
          <div className="flex items-center gap-1 mb-3">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs">{rating}/5.0</span>
          </div>
          <button 
            onClick={() => navigate(`/movie/${id}`)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm flex items-center gap-1 transition-colors"
          >
            <Play size={12} />
            Watch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;