import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px] border border-gray-200">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
          src={listing.imageUrls[0] || "https://fixthephoto.com/blog/UserFiles/free-real-estate-cover-photos-for-facebook-820x340.jpg"}
          alt="listing cover"
        />
        <div className="p-4 flex flex-col gap-3">
          <p className="text-lg font-semibold text-slate-800 truncate">{listing.name}</p>
          <div className="flex items-center gap-1 text-gray-700">
            <MdLocationOn className="h-5 w-5 text-green-600" />
            <p className="text-sm truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 truncate">{listing.description}</p>
          <p className="text-xl font-bold text-slate-800 mt-2">
            &#8377;{listing.offer ? listing.discountPrice.toLocaleString('en-IN') : listing.regularPrice.toLocaleString('en-IN')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <div className="text-gray-600 flex gap-4">
            <div className="font-medium text-xs">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </div>
            <div className="font-medium text-xs">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

