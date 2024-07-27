import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { FaSpinner } from "react-icons/fa";
import {Link} from 'react-router-dom';
import { updateUserFailure,updateUserStart,updateUserSuccess ,updateUserEnd, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess} from '../redux/user/userSlice';

export default function Profile() {
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  const fileRef = useRef(null);

  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const loading = useSelector((state) =>state.user.loading);

  const [filePerc, setFilePerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  const [showListingError ,setShowListingError] = useState(false);
  const [listingLoading , setListingLoading] =useState(false);
  const [userListing ,setUserListing] = useState([]);

  useEffect(() => {
    if (currentUser instanceof Promise) {
      currentUser
        .then((result) => {
          setUser(result);
        })
        .catch((error) => {
          console.error('Error resolving currentUser:', error);
        });
    } else {
      setUser(currentUser);
    }
  }, [currentUser]);

  const image = user?.avatar || '';

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.error('File upload error:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setFileUploadError(false);
        });
      }
    );
  };
  
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] :e.target.value,
    })
  }

const handleSumbit =async (e)=>{
  e.preventDefault();
  try {
    
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    })
    const data = await res.json();
    if (data.success === false) {
      dispatch(updateUserEnd());
      dispatch(updateUserFailure(data.message));
      return;
    }
    setSuccess("Updated Successfully");
    dispatch(updateUserEnd());
    dispatch(updateUserSuccess(data));
    setTimeout(() => {
      setSuccess(null);
    }, 2000);
  } catch (error) {
    dispatch(updateUserFailure(error.message));
  }
}
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
        } else {
          dispatch(deleteUserSuccess());
        }
      } else {
        const errorText = await res.text();
        dispatch(deleteUserFailure(`HTTP Error: ${res.status} - ${errorText}`));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  

  const handleSignOut = async () =>{
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }
  
  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      setListingLoading(true);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setListingLoading(false);
        setShowListingError(true);
        return;
      }
      setListingLoading(false);
      setUserListing(data);
      
    } catch (error) {
      setListingLoading(false);
      setShowListingError(true);
    }
  }

  const handleListingDelete = async (listingId) =>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE',
      })
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListing((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log(error.message);
    }
  }

  return ( 
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>
        <form  onSubmit={handleSumbit} className="flex flex-col gap-6">
          <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
          <div className="flex justify-center mb-4">
            <img onClick={() => fileRef.current.click()} src={formData.avatar || image} alt="profile" className="rounded-full h-32 w-32 object-cover border-4 border-gray-200" />
          </div>

          <p className="text-sm text-center">
            {fileUploadError ? (
              <span className="text-red-700">Error Image Upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-900">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">Image Uploaded Successfully</span>
            ) : (
              ""
            )}
          </p>

          <input
            type="text"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="New Password"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          />
          <button 
          className="bg-blue-600 text-white rounded-lg p-4 uppercase hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            { loading ? (<FaSpinner className="animate-spin" />) : ('update')}
          </button>
          
          <Link 
          className='bg-green-600 text-white p-3 rounded-lg uppercase text-center transition-transform duration-300 hover:opacity-90 hover:scale-105 hover:shadow-lg'
          to={"/create-listing"}>
            Create Listing
          </Link>
        </form>
        {success && <p className="text-green-500 mt-5 text-center">{success}</p>}
        <div className="flex justify-between mt-6">
          <span onClick={handleDeleteUser} className="text-red-600 cursor-pointer hover:underline">Delete Account</span>
          <span onClick={handleSignOut} className="text-red-600 cursor-pointer hover:underline">Sign Out</span>
        </div>
        
        <button disabled={listingLoading} onClick={handleShowListing}
        className={`text-green-700 text-sm w-full hover:underline flex items-center justify-center ${listingLoading ? 'cursor-wait' : ''}`}
        >
        {listingLoading ? (
          <FaSpinner className="animate-spin text-lg" />
          ) : (
    '         Show listings'
          )}
        </button>
        <p className='text-red-700 mt-5'>{showListingError ? 'Error showing listing' :''}</p>

        {userListing && userListing.length >0 && 
          <div className='flex flex-col gap-4'>
            <h1 className=' text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
           {userListing.map((listing) =>(
            <div  key={listing._id} 
            className='border rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover"
                  className='h-16 w-16 object-contain '
                 />
              </Link>
              <Link 
              className='text-slate-900 font-semibold flex-1 hover:underline truncate'
              to={`/listing/${listing._id}`}>
               <p >{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button onClick={() => handleListingDelete(listing._id)  } className='text-red-700 uppercase'>Delete</button>
                <Link to={`/update-listing/${listing._id}`} >
                <button className='text-blue-600'>Edit</button>
                </Link>
                
              </div>

            </div>
          ))}
        </div>
        }
      </div>
      
    </div>
  );
}

