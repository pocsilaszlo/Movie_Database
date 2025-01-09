import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import Pagination from '../components/Pagination';
import { useGetMoviesQuery } from '../store/api/movieApi';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 40;

  const { data: moviesData, isLoading, error } = useGetMoviesQuery({
    page: currentPage,
    size: pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error loading movies</div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explore Movies</h1>
          <p className="text-gray-400">Discover the best of cinema, from timeless classics to the latest releases.</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by title, actor, or director..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <SlidersHorizontal size={20} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Genre</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="">All Genres</option>
                  {moviesData?.content[0]?.genres.map(genre => (
                    <option key={genre.name} value={genre.name}>{genre.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="">Default</option>
                  <option value="rating">Highest Rated</option>
                  <option value="year">Release Year</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {moviesData?.content.map((movie) => (
            <ContentCard 
              key={movie.id}
              id={movie.id.toString()}
              title={movie.title}
              rating={movie.imdbRating/2}
              image={movie.imagePath}
            />
          ))}
        </div>

        {/* Pagination */}
        {moviesData && moviesData.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={moviesData.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default Movies;