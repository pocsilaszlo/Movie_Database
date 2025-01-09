import React from 'react';
import { Play, Star, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrendingCardProps {
  id: string;
  title: string;
  rating: number;
  image: string;
}

const TrendingCard = ({ id, title, rating, image }: TrendingCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-xl overflow-hidden">
      <div className="aspect-[16/9]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/50 hover:bg-gray-900 transition-colors"
          title="Add to My List"
        >
          <Bookmark size={16} />
        </button>
        <div className="absolute bottom-0 p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="flex items-center gap-2 mb-4">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{rating}/5.0</span>
          </div>
          <button 
            onClick={() => navigate(`/movie/${id}`)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Play size={16} />
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;