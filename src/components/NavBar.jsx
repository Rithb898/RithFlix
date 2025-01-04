import { Film, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className='fixed top-0 z-50 w-full bg-black/95 px-4 py-4'>
      <div className='mx-auto flex max-w-[95rem] items-center justify-between'>
        <Link to="/" className='flex items-center gap-2 text-xl font-bold text-white'>
          <Film className='h-6 w-6' />
          RithFlix
        </Link>

        <form onSubmit={handleSearch} className='flex items-center'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search movies...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-64 rounded-full bg-gray-800 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20'
            />
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
          </div>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
