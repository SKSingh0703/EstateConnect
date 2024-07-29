import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare, FaSpinner } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/swiper-bundle.css';
import {useSelector} from 'react-redux';

import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const {currentUser} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [contact , setContact] = useState(false);

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
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button 
              onClick={() => setContact(true)}
              className="bg-slate-700 w-full text-white rounded-lg uppercase hover:opacity-95 p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition duration-150"
              >
                Contact Landlord
              </button>
            )}
            {!currentUser && (
              <button 
              onClick={() => navigate('/sign-in')}
              className="bg-slate-700 w-full text-white rounded-lg uppercase hover:opacity-95 p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition duration-150"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} /> }
            
          </div>
        </div>
      )}
    </main>
  );
}

