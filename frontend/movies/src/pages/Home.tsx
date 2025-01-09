import React from 'react';
import { Play, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TrendingCard from '../components/TrendingCard';
import ContentCard from '../components/ContentCard';

function Home() {
  const navigate = useNavigate();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TrendingCard 
            id="dune-2"
            title="Dune: Part Two"
            rating={4.8}
            image="https://m.media-amazon.com/images/M/MV5BMjA0MjIyOTI3MF5BMl5BanBnXkFtZTcwODM5NTY5MQ@@.jpg"
          />
          <TrendingCard 
            id="poor-things"
            title="Poor Things"
            rating={4.7}
            image="https://m.media-amazon.com/images/M/MV5BMjkyMTE1OTYwNF5BMl5BanBnXkFtZTcwMDIxODYzMw@@.jpg"
          />
          <TrendingCard 
            id="zone-of-interest"
            title="The Zone of Interest"
            rating={4.6}
            image="https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@.jpg"
          />
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-8">
          <Heart className="text-red-500" />
          <h2 className="text-2xl font-bold">Recommended Movies</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ContentCard 
            id="batman"
            title="The Batman"
            rating={4.5}
            image="https://m.media-amazon.com/images/M/MV5BMjA0MjIyOTI3MF5BMl5BanBnXkFtZTcwODM5NTY5MQ@@.jpg"
          />
          <ContentCard 
            id="oppenheimer"
            title="Oppenheimer"
            rating={4.7}
            image="https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@.jpg"
          />
          <ContentCard 
            id="killers"
            title="Killers of the Flower Moon"
            rating={4.6}
            image="https://m.media-amazon.com/images/M/MV5BMGQ0OGM5YjItYzYyMi00NmVmLWI3ODMtMTY2NGRkZmI5MWU2XkEyXkFqcGdeQXVyMzI0NDc4ODY@.jpg"
          />
          <ContentCard 
            id="past-lives"
            title="Past Lives"
            rating={4.8}
            image="https://m.media-amazon.com/images/M/MV5BMjkyMTE1OTYwNF5BMl5BanBnXkFtZTcwMDIxODYzMw@@.jpg"
          />
          <ContentCard 
            id="strangers"
            title="All of Us Strangers"
            rating={4.4}
            image="https://m.media-amazon.com/images/M/MV5BNjViMmRkOTEtM2ViOS00ODg0LWJhYWEtNTBlOGQxNDczOGY3XkEyXkFqcGdeQXVyMDI2NDg0NQ@@.jpg"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;