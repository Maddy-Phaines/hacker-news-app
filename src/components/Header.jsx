import { Search } from "lucide-react";
/* Sticky top bar with app name, search, and category filter*/

function Header() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-10 rounded-b-2xl">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top Row */}
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-900">
            Hacker News Reader
          </h1>

          <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow text-sm hover:bg-gray-200 transition">
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Category Nav */}
        <nav className="flex divide-x divide-gray-300 gap-4 overflow-x-auto py-2 border-t border-b border-gray-300 bg-white">
          <button className="px-2 text-blue-600 font-semibold border-blue-600 pb-2">
            Top
          </button>
          <button className="text-gray-600 hover:text-blue-600 cursor-pointer transition px-2">
            Ask HN
          </button>
          <button className="text-gray-600 hover:text-blue-600 cursor-pointer transition px-2">
            Show HN
          </button>
          <button className="text-gray-600 hover:text-blue-600 cursor-pointer transition px-2">
            Polls
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
