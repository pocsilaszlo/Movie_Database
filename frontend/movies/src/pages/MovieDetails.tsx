
import { useParams } from 'react-router-dom';
import { Play, Star, Clock, Calendar, Bookmark, Users, Award, DollarSign } from 'lucide-react';
import { useGetMovieQuery } from '../store/api/movieApi';

function MovieDetails() {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useGetMovieQuery(id || '');

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading movie details</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div className="absolute inset-0">
          <img
            src={movie.imagePath}
            alt={movie.title}
            className="w-full h-full object-cover brightness-25"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60" />

        <div className="relative container mx-auto px-6 h-full flex items-end pb-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
                <span>{movie.imdbRating}/10</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{movie.releaseDate}</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 bg-gray-800 rounded-md">
                <span>{movie.certificate}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Play size={20} />
                Watch Now
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Bookmark size={20} />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-300 mb-8">{movie.overview}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Director</h3>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Cast</h3>
                <ul className="text-gray-300 space-y-1">
                  {movie.stars.map((star, index) => (
                    <li key={index}>{star.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 h-fit">
            <h3 className="text-lg font-semibold mb-6">Movie Info</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm text-gray-400 mb-2">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Rating</h4>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>IMDb: {movie.imdbRating}/10</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Meta Score</h4>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-green-500" />
                    <span>{movie.metaScore}/100</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Votes</h4>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-blue-500" />
                    <span>{movie.numberOfVotes.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-gray-400 mb-1">Box Office</h4>
                  <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-green-500" />
                    {movie.revenue? 
                    <span>${movie.revenue.toLocaleString()}</span>
                    : <> - </>}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;