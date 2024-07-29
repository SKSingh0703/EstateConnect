import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { FaSpinner } from "react-icons/fa";import ListingItem from "../components/ListingItem";
;

export default function Search() {

    const navigate = useNavigate();

    const [sideBarData,setSideBarData] = useState({
        searchTerm:'',type:'all',parking:false,
        furnished:false,offer:false,sort:'created_at',
        order:'desc'
    });
    const [loading ,setLoading] = useState(false);
    const [listings,setListings] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl ||offerFromUrl ||sortFromUrl || orderFromUrl) {
            setSideBarData({
                searchTerm:searchTermFromUrl || '',type:typeFromUrl || 'all',
                parking:parkingFromUrl === 'true' ? true :false,
                furnished:furnishedFromUrl=== 'true' ? true :false,
                offer:offerFromUrl === 'true' ? true :false,
                sort:searchTermFromUrl || 'created_at',
                order:orderFromUrl || 'desc',
            })
        }

        const fetchListing = async () =>{
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                setLoading(false);
                setListings(data);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        fetchListing();

    },[location.search]);

    const handleChange=((e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id ==='sale' ) {
            setSideBarData({...sideBarData , type:e.target.id});
        }
        if (e.target.id === 'searchTerm') {
            setSideBarData({...sideBarData,searchTerm:e.target.value});
        }
        if (e.target.id === 'parking' ||  e.target.id === 'furnished'  || e.target.id === 'offer') {
            setSideBarData({...sideBarData,
                [e.target.id]:e.target.checked || e.target.checked === 'true' ? true : false
            });
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarData({...sideBarData ,sort,order});
        }
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm' , sideBarData.searchTerm);
        urlParams.set('type' , sideBarData.type);
        urlParams.set('parking' , sideBarData.parking);
        urlParams.set('furnished' , sideBarData.furnished);
        urlParams.set('sort' , sideBarData.sort);
        urlParams.set('order' , sideBarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    return (
      <div className="flex flex-col md:flex-row">
        {/* Search Form */}
        <div className="p-6 md:p-8 border-b-2 md:border-r-2 md:min-h-screen bg-white shadow-md">
          <form  onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Search Term */}
            <div className="flex items-center gap-3">
              <label htmlFor="searchTerm" className="font-semibold text-lg text-gray-700">Search Term:</label>
              <input
                value={sideBarData.searchTerm}
                onChange={handleChange}
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
                  <input onChange={handleChange} checked={sideBarData.type === 'all'}
                  type="checkbox" id="all" className="w-5 h-5" />
                  <label htmlFor="all" className="text-gray-600">Rent & Sale</label>
                </div>
                <div className="flex items-center gap-2">
                  <input onChange={handleChange} checked={sideBarData.type === 'rent'}
                  type="checkbox" id="rent" className="w-5 h-5" />
                  <label htmlFor="rent" className="text-gray-600">Rent</label>
                </div>
                <div className="flex items-center gap-2">
                  <input onChange={handleChange} checked={sideBarData.type === 'sale'}
                  type="checkbox" id="sale" className="w-5 h-5" />
                  <label htmlFor="sale" className="text-gray-600">Sale</label>
                </div>
                <div className="flex items-center gap-2">
                  <input onChange={handleChange} checked={sideBarData.offer}
                  type="checkbox" id="offer" className="w-5 h-5" />
                  <label htmlFor="offer" className="text-gray-600">Offer</label>
                </div>
              </div>
            </div>
  
            {/* Amenities */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-lg text-gray-700">Amenities:</label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <input onChange={handleChange} checked={sideBarData.parking}
                  type="checkbox" id="parking" className="w-5 h-5" />
                  <label htmlFor="parking" className="text-gray-600">Parking</label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                  onChange={handleChange} checked={sideBarData.furnished}
                  type="checkbox" id="furnished" className="w-5 h-5" />
                  <label htmlFor="furnished" className="text-gray-600">Furnished</label>
                </div>
              </div>
            </div>
  
            {/* Sort */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort_order" className="font-semibold text-lg text-gray-700">Sort By:</label>
              <select
                onChange={handleChange} defaultValue={'created_at_desc'}
                id="sort_order"
                className="border rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="regularPrice_desc">Price High to Low</option>
                <option value="regularPrice_asc">Price Low to High</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
  
            {/* Search Button */}
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-600 transition duration-200">
              Search
            </button>
          </form>
        </div>
  
       {/* Search Results */}
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-semibold border-b-2 border-slate-300 pb-3 text-slate-700 mb-4">
          Listing Results
        </h1>
        {/* Content for search results will go here */}
        <div className="p-6 flex flex-wrap gap-6">
          {!loading && listings.length === 0 && (
            <p className="text-lg text-slate-700">
              No Listings found
            </p>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full h-full min-h-[300px]">
              <FaSpinner className="animate-spin text-blue-600 text-6xl" aria-label="Loading" />
            </div>
          )}
          {!loading && listings && listings.length > 0 && 
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
         }
        </div>
      </div>

      </div>
    );
  }
  
