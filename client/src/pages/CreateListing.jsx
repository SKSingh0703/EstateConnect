export default function CreateListing() {
    return (
      <main className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center my-6 text-gray-900">Create a Listing</h1>
          <form className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-6 flex-1">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                    id="name" 
                    maxLength='62' 
                    minLength='10' 
                    required
                  />
                  <textarea 
                    placeholder="Description" 
                    className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                    id="description" 
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Address" 
                    className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                    id="address" 
                    required
                  />
                  <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                          <input type="checkbox" id="sale" className="w-5" />
                          <label htmlFor="sale" className="text-gray-700">Sell</label>
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="checkbox" id="rent" className="w-5" />
                          <label htmlFor="rent" className="text-gray-700">Rent</label>
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="checkbox" id="parking" className="w-5" />
                          <label htmlFor="parking" className="text-gray-700">Parking Spot</label>
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="checkbox" id="furnished" className="w-5" />
                          <label htmlFor="furnished" className="text-gray-700">Furnished</label>
                      </div>
                      <div className="flex items-center gap-2">
                          <input type="checkbox" id="offer" className="w-5" />
                          <label htmlFor="offer" className="text-gray-700">Offer</label>
                      </div>
                  </div>
                  <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-2"> 
                          <input 
                            type="number" 
                            id="bedrooms"
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                            min='1' 
                            max='10' 
                            required  
                          />
                          <p className="text-gray-700">Beds</p>
                      </div>
                      <div className="flex items-center gap-2"> 
                          <input 
                            type="number" 
                            id="bathrooms"
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                            min='1' 
                            max='10' 
                            required  
                          />
                          <p className="text-gray-700">Bathrooms</p>
                      </div>
                      <div className="flex items-center gap-2"> 
                          <input 
                            type="number" 
                            id="regularPrice"
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                            min='1' 
                            max='10' 
                            required  
                          />
                          <div className="flex flex-col items-center">
                            <p className="text-gray-700">Regular Price</p>
                            <span className="text-xs text-gray-500">( &#8377; / month  )</span>
                          </div>
                      </div>
                      <div className="flex items-center gap-2"> 
                          <input 
                            type="number" 
                            id="discountPrice"
                            className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                            min='1' 
                            max='10' 
                            required  
                          />
                          <div className="flex flex-col items-center">
                            <p className="text-gray-700">Discounted Price</p>
                            <span className="text-xs text-gray-500">( &#8377; / month  )</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="flex flex-col gap-6 flex-1">
                  <p className="font-semibold text-gray-900"> Images : 
                    <span className="font-normal text-gray-600 ml-2">
                       The first image will be cover (max 6) 
                     </span>
                  </p>
                  <div className="flex gap-6">
                      <input 
                        className="p-3 border border-gray-300 rounded w-full"
                        type="file" 
                        id="images" 
                        accept="image/*" 
                        multiple 
                      />
                      <button className="p-3 text-green-600 border border-green-700 rounded-lg uppercase hover:bg-green-100 hover:shadow-md transition duration-200">
                        Upload
                      </button>
                  </div>
                  <button className="p-3 bg-gray-900 text-white rounded-lg uppercase hover:bg-gray-800 hover:shadow-md hover:scale-105 transition duration-200">
                    Create Listing
                  </button>
              </div>
          </form>
      </main>
    )
  }
  
