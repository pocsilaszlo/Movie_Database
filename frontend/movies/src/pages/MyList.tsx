import { Bookmark } from 'lucide-react';

function MyList() {
  return (
    <div className="pt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="text-red-500" size={28} />
          <h1 className="text-3xl font-bold">My List</h1>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
          <p className="text-gray-300">Keep track of movies you want to watch later. Add movies to your list by clicking the bookmark icon.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          
        </div>
      </div>
    </div>
  );
}

export default MyList;