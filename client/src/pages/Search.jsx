
export default function Search() {
    return (
      <div className="flex flex-col md:flex-row">
        {/* Search Form */}
        <div className="p-6 md:p-8 border-b-2 md:border-r-2 md:min-h-screen bg-white shadow-md">
          <form className="flex flex-col gap-6">
            {/* Search Term */}
            <div className="flex items-center gap-3">
              <label htmlFor="searchTerm" className="font-semibold text-lg text-gray-700">Search Term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search for properties..."
                className="border rounded-lg p-3 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            {/* Type */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-lg text-gray-700">Type:</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="all" className="w-5 h-5" />
                  <label htmlFor="all" className="text-gray-600">Rent & Sale</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rent" className="w-5 h-5" />
                  <label htmlFor="rent" className="text-gray-600">Rent</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sale" className="w-5 h-5" />
                  <label htmlFor="sale" className="text-gray-600">Sale</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="offer" className="w-5 h-5" />
                  <label htmlFor="offer" className="text-gray-600">Offer</label>
                </div>
              </div>
            </div>
  
            {/* Amenities */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-lg text-gray-700">Amenities:</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="parking" className="w-5 h-5" />
                  <label htmlFor="parking" className="text-gray-600">Parking</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="furnished" className="w-5 h-5" />
                  <label htmlFor="furnished" className="text-gray-600">Furnished</label>
                </div>
              </div>
            </div>
  
            {/* Sort */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort_order" className="font-semibold text-lg text-gray-700">Sort By:</label>
              <select
                id="sort_order"
                className="border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price_desc">Price High to Low</option>
                <option value="price_asc">Price Low to High</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
  
            {/* Search Button */}
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-600 transition duration-200">
              Search
            </button>
          </form>
        </div>
  
        {/* Search Results */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-semibold border-b-2 pb-3 text-slate-700">
            Listing Results
          </h1>
          {/* Content for search results will go here */}
        </div>
      </div>
    );
  }
  
