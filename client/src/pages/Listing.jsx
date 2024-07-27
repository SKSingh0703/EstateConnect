// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaSpinner } from "react-icons/fa";
// import {Swiper , SwiperSlide} from 'swiper/react';
// import SwiperCore from 'swiper';
// import {Navigation} from 'swiper/modules';
// import 'swiper/css/bundle';
// import 'swiper/swiper-bundle.css'


// export default function Listing() {
//   SwiperCore.use([Navigation]);

//   const params = useParams();
//   const [listing,setListing] = useState(null);
//   const [loading,setLoading] = useState(false);
//   const [error,setError] = useState(false);

//   const [copied,setCopied] = useState(false);

//   useEffect(()=>{
//     try {
//       setLoading(true);
//      const fetchListing = async () =>{
//       const res = await fetch(`/api/listing/get/${params.listingId}`);
//       const data = await res.json();
//       setLoading(false);
//       if (data.success === false) {
//         setError(true);
//         return;
//       }
//       setListing(data);
//       setError(false);
//     }
//     fetchListing();
//   } catch (error) {
//       setError(true);
//       setLoading(false);
//   }
//   },[params.listingId])
//   return (
//     <main>
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center  bg-opacity-50 z-50">
//         <FaSpinner className="animate-spin text-blue-600 text-6xl" aria-label="Loading" />
//       </div>
//       )
//     }
//     {error && (
//     <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-50">
//       <p className="text-center text-2xl font-semibold text-red-600 p-4 border border-red-300 rounded-lg shadow-lg">
//         Something went wrong ...
//       </p>
//     </div>
//     )}
//     {listing && !loading && !error && (
//       <div>
//       <Swiper navigation>
//         {listing.imageUrls.map((url) =>(
//           <SwiperSlide key={url}>
            
//             <div 
//                   className="h-[450px] w-full bg-gray-200"
//                   style={{
//                     background: `url(${url}) center no-repeat`,
//                     backgroundSize: 'cover'
//                   }}
//                 />
//           </SwiperSlide> 
//         ))}
//       </Swiper>
        
//       <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer " >
//         <FaShare
//          className="text-slate-500"
//          onClick={() => {
//           navigator.clipboard.writeText(window.location.href);
//           setCopied(true);
//           setTimeout(() => {setCopied(false)},2000);
//          }}
//         />
//       </div>
//       {copied && (
//         <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2  ">
//           Link copied
//         </p>
//       )}
//       <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-6">
//         <p className="text-2xl font-semibold">
//           {listing.name} - &#8377;{' '}
//              {listing.offer ? listing.discountPrice.toLocaleString('en-in') :listing.regularPrice.toLocaleString('en-in') }
//           {listing.type === 'rent'  && '/month' }
//         </p>
//       </div>

//       <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
//         <FaMapMarkerAlt className="text-green-700" />
//         {listing.address}
//       </p>
//       <div className="flex gap-4">
//         <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
//           {listing.type === 'rent' ? 'For rent' : 'For Sale' }
//         </p>
//         {
//           listing.offer && (
//             <p
//             className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md"  >
//               &#8377;{+listing.regularPrice - +listing.discountPrice} Discount
//             </p>
//           )
//         }
//       </div>
//       <p className="text-slate-800">
//         <span className="font-semibold text-black"> Description : </span> {listing.description}
//       </p>
//       <ul className="text-green-900 font-semibold text-sm flex items-center fap-4 sm:gap-6 flex-wrap ">
//         <li className="flex  items-center gap-1 whitespace-nowrap ">
//           <FaBed  className="text-lg" />
//           {listing.bedrooms > 1 ? `${listing.bedrooms} beds` :`${listing.bedrooms} bed` }
//         </li>
//         <li className="flex  items-center gap-1 whitespace-nowrap ">
//           <FaBath  className="text-lg" />
//           {listing.bathrooms > 1 ? `${listing.bathrooms} baths` :`${listing.bathrooms} bath` }
//         </li>
//         <li className="flex  items-center gap-1 whitespace-nowrap ">
//           <FaParking  className="text-lg" />
//           {listing.parking ? 'Parking Spot ' : 'No Parking'}
//         </li>
//         <li className="flex  items-center gap-1 whitespace-nowrap ">
//           <FaChair  className="text-lg" />
//           {listing.furnished ? 'Furnished ' : 'Unfurnished'}
//         </li>
//       </ul>
//       </div>
//     )}

//     </main>
//   )
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaSpinner } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/swiper-bundle.css';

export default function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(true);
          return;
        }
        setListing(data);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="relative bg-gray-100">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-white z-50">
          <FaSpinner className="animate-spin text-blue-600 text-6xl" aria-label="Loading" />
        </div>
      )}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-white z-50">
          <p className="text-center text-2xl font-semibold text-red-600 p-4 border border-red-300 rounded-lg shadow-lg">
            Something went wrong ...
          </p>
        </div>
      )}
      {listing && !loading && !error && (
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Swiper for property images */}
          <Swiper navigation className="mb-6">
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[450px] w-full bg-gray-200"
                  style={{
                    background: `url(${url}) center center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Button */}
          <div className="fixed top-[10%] right-[3%] z-10 bg-white p-2 rounded-full shadow-lg border cursor-pointer">
            <FaShare
              className="text-gray-700"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => { setCopied(false) }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[20%] right-[5%] z-10 rounded-md bg-white p-2 shadow-md text-sm">
              Link copied
            </p>
          )}

          {/* Property Details */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h1 className="text-3xl font-semibold mb-2">
              {listing.name} - &#8377;{listing.offer ? listing.discountPrice.toLocaleString('en-IN') : listing.regularPrice.toLocaleString('en-IN')}
              {listing.type === 'rent' && '/month'}
            </h1>
            <p className="text-gray-600 flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4 mb-4">
              <p className="bg-red-900 text-white text-center p-2 rounded-md w-full max-w-[200px]">
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className="bg-green-900 text-white text-center p-2 rounded-md w-full max-w-[200px]">
                  &#8377;{+listing.regularPrice - +listing.discountPrice} Discount
                </p>
              )}
            </div>
            <p className="text-gray-800 mb-4">
              <span className="font-semibold text-black">Description:</span> {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex items-center gap-4 flex-wrap">
              <li className="flex items-center gap-1">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1">
                <FaParking className="text-lg" />
                {listing.parking ? 'Parking Spot' : 'No Parking'}
              </li>
              <li className="flex items-center gap-1">
                <FaChair className="text-lg" />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}

