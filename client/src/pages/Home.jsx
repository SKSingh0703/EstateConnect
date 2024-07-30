import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Swiper , SwiperSlide} from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import ListingItem from "../components/ListingItem";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings,setOfferListings] = useState([]);
  const [saleListings , setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () =>{
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaletListings();
      } catch (error) {
        console.log(error);
      }
    }
    const fetchSaletListings = async () =>{
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    }
  },[])
  console.log(saleListings);

  return (
    <div>
      {/* top  */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
           Discover Your <span className="text-slate-500">Dream Home</span> 
            <br /> with Unmatched Simplicity
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm ">
            At EstateConnect, finding the perfect place to call home has never been easier.
                <br />
            Explore our extensive collection of listings and find your next home today.
        </div>
        <Link to="/search" className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
            Get Started
        </Link>
      </div>




      {/* swiper  */}
      <div className="relative">
        <Swiper
          navigation
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="max-w-7xl mx-auto"
        >
          {offerListings && offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  className="h-[450px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${listing.imageUrls[0] || 'https://via.placeholder.com/600x450'})` }}
                />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>


      {/* listing results for offer sale and rent  */}
      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-8 my-10">
        { offerListings && offerListings.length >0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">Recent offers</h2>
              <Link to={'/search?offer=true'}
              className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) =>(
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        { rentListings && rentListings.length >0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">Recent places for rent</h2>
              <Link to={'/search?type=rent'}
              className="text-sm text-blue-800 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) =>(
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        { saleListings && saleListings.length >0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600 ">Recent places for sale</h2>
              <Link to={'/search?type=sale'}
              className="text-sm text-blue-800 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) =>(
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}


      </div>
    </div>
  )
}
