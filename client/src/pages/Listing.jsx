import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import {Swiper , SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/swiper-bundle.css'

export default function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [listing,setListing] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

  useEffect(()=>{
    try {
      setLoading(true);
     const fetchListing = async () =>{
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setListing(data);
      setError(false);
    }
    fetchListing();
  } catch (error) {
      setError(true);
      setLoading(false);
  }
  },[params.listingId])
  return (
    <main>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 z-50">
        <FaSpinner className="animate-spin text-blue-600 text-6xl" aria-label="Loading" />
      </div>
      )
    }
    {error && (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-50">
      <p className="text-center text-2xl font-semibold text-red-600 p-4 border border-red-300 rounded-lg shadow-lg">
        Something went wrong ...
      </p>
    </div>
    )}
    {listing && !loading && !error && (
      <div>
      <Swiper navigation>
        {listing.imageUrls.map((url) =>(
          <SwiperSlide key={url}>
            
            <div 
                  className="h-[450px] w-full bg-gray-200"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover'
                  }}
                />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    )}

    </main>
  )
}
