import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        
        const result = await logout();
        console.log(result);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-red-500">MovieVerse</Link>
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/movies" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Movies
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/my-list" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  My List
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                    <User size={20} />
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;