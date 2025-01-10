import { Play, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TrendingCard from '../components/TrendingCard';
import ContentCard from '../components/ContentCard';
import { useGetRecommendedQuery, useGetTrendingQuery } from '../store/api/movieApi';

function Home() {
  const navigate = useNavigate();
  const { data: trendingMovies, isLoading: trendingLoading } = useGetTrendingQuery(3);
  const { data: recommendedMovies, isLoading: recommendedLoading } = useGetRecommendedQuery(5);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80"
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative container mx-auto px-6 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Discover Your Next Favorite Movie</h1>
            <p className="text-xl text-gray-300 mb-8">Personalized recommendations that match your taste in cinema.</p>
            <button 
              onClick={() => navigate('/movies')}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Play size={20} />
              Start Watching
            </button>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="text-red-500" />
          <h2 className="text-2xl font-bold">Trending Movies</h2>
        </div>
        {trendingLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-xl text-gray-400">Loading trending movies...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingMovies?.map((movie) => (
              <TrendingCard 
                key={movie.id}
                id={movie.id.toString()}
                title={movie.title}
                rating={movie.imdbRating/2}
                image={movie.imagePath}
              />
            ))}
          </div>
        )}
      </section>

      {/* Recommendations Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="text-red-500" />
          <h2 className="text-2xl font-bold">Recommended Movies</h2>
        </div>
        {recommendedLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-xl text-gray-400">Loading recommendations...</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recommendedMovies?.map((movie) => (
              <ContentCard 
                key={movie.id}
                id={movie.id.toString()}
                title={movie.title}
                rating={movie.imdbRating/2}
                image={movie.imagePath}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;