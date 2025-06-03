import { Search } from "lucide-react"; // If you're using lucide for icons, you can replace this with your icon lib

function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-10">
      {/* Outer layout container */}
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* App Title */}
        <h1 className="text-xl font-semibold text-gray-900">
          Hacker News Reader
        </h1>

        {/* Search Button */}
        <button className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg shadow-sm text-sm hover:bg-gray-200 transition">
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* Category Filter */}
      <nav className="flex gap-4 overflow-x-auto px-4 py-2 border-t border-b border-gray-200 bg-white">
        <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2">
          Top
        </button>
        <button className="text-gray-600 hover:text-blue-600 transition">
          Ask HN
        </button>
        <button className="text-gray-600 hover:text-blue-600 transition">
          Show HN
        </button>
        <button className="text-gray-600 hover:text-blue-600 transition">
          Polls
        </button>
      </nav>
    </header>
  );
}

export default Header;
