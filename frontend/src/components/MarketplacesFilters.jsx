import React from 'react';

const MarketplacesFilters = ({ searchTerm, setSearchTerm, selectedFilter, setSelectedFilter }) => {
    const filters = ['all', 'nfts', 'defi', 'gaming', 'other'];

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center w-full">
            {/* Search Bar */}
<div className="w-full md:w-1/2 relative">
  {/* Icon inside input */}
  <svg
    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
    />
  </svg>

  {/* Input with left padding so text doesn’t overlap icon */}
  <input
    type="text"
    placeholder="Search marketplaces..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full bg-gray-700 border-2 border-yellow-400 rounded-4xl p-3 pl-10 text-white placeholder-gray-500 focus:outline-none"
  />
</div>


            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full md:w-auto">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`
                                    px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300
                                ${selectedFilter === filter
                                ? 'bg-yellow-500 text-gray-900 shadow-lg' // Selected state
                                : 'bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900' // Unselected state
                            }`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MarketplacesFilters;
