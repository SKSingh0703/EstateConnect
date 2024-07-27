import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate ,useParams } from "react-router-dom";


export default function CreateListing() {
  const navigate = useNavigate();
    const params = useParams();

  const {currentUser} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name:'',description:'',address:'',
    type:'rent',bedrooms:1,bathrooms:1,
    regularPrice:1500,discountPrice:0,offer:false,
    parking:false,furnished:false
  });
  const [imageUploadError, setImageUploadError] = useState(null); // Updated state name
  const [files, setFiles] = useState([]);
  const [uploading ,setUploading] = useState(false);

  const [error,setError] =useState(false);
  const [loading,setLoading] =useState(false);

  useEffect(() => {
    const fetchListing = async () => {
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
            console.log(data.message);
            return;
        }
        setFormData(data);
    }
    fetchListing();
  },[]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrls: prevData.imageUrls.concat(urls),
        }));
        setImageUploadError(false);
        setUploading(false)
      }).catch((err) => {
        console.error('Error uploading images:', err);
        setImageUploadError('Image upload failed (2MB max per image)');
      });
    } else {
        setUploading(false);
      setImageUploadError("You can upload up to 6 images per listing.");
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, `uploads/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          }).catch((error) => {
            console.error('Error getting download URL:', error);
            reject(error);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) =>{
    setFormData({
        ...formData,
        imageUrls:formData.imageUrls.filter((_,i) => i!==index)
    })
  }

  const handleChange = (e) => {
        if (e.target.id==='sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type:e.target.id,
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'  ) {
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            });
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea' ) {
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (formData.imageUrls.length <1) {
            return setError("You must upload atleast one image !")
        }
        if (+formData.regularPrice < +formData.discountPrice) {
            return setError('Regular price must be less than discount price')
        }
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/update/${params.listingId}`,
            {
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify({
                    ...formData,
                    userRef:currentUser._id
                })
            }
        )
        
        const data = await res.json();
        setLoading(false);
        if ((data.success === false)) {
            setError(data.message);
        }
        
        navigate(`/listing/${data._id}`);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
  }


  return (
    <main className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center my-6 text-gray-900">
        Update Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 flex-1">
          {/* Other form fields */}
          <input 
            value={formData.name}
            onChange={handleChange}
            type="text" 
            placeholder="Name" 
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            id="name" 
            maxLength="62" 
            minLength="10" 
            required
          />
          <textarea 
            value={formData.description}
            onChange={handleChange}
            placeholder="Description" 
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            id="description" 
            required
          />
          <input 
            value={formData.address}
            onChange={handleChange}
            type="text" 
            placeholder="Address" 
            className="border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            id="address" 
            required
          />
          <div className="flex flex-wrap gap-6">
            {/* Checkbox Inputs */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sale" className="w-5" 
              onChange={handleChange} checked={formData.type === 'sale'} />
              <label htmlFor="sale" className="text-gray-700">Sell</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="rent" className="w-5"
              onChange={handleChange} checked={formData.type === 'rent'}
              />
              <label htmlFor="rent" className="text-gray-700">Rent</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="parking" className="w-5" 
               onChange={handleChange} checked={formData.parking}
              />
              <label htmlFor="parking" className="text-gray-700">Parking Spot</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="furnished" className="w-5" 
              onChange={handleChange} checked={formData.furnished}
              />
              <label htmlFor="furnished" className="text-gray-700">Furnished</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="offer" className="w-5" 
              onChange={handleChange} checked={formData.offer}
              />
              <label htmlFor="offer" className="text-gray-700">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-8">
            {/* Number Inputs */}
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                onChange={handleChange} value={formData.bedrooms}
                id="bedrooms"
                className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                min="1" 
                max="10" 
                required  
              />
              <p className="text-gray-700">Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                onChange={handleChange} value={formData.bathrooms}
                id="bathrooms"
                className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                min="1" 
                max="10" 
                required  
              />
              <p className="text-gray-700">Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                onChange={handleChange} value={formData.regularPrice}
                id="regularPrice"
                className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                min="1000" 
                max="1000000000" 
                required  
              />
              <div className="flex flex-col items-center">
                <p className="text-gray-700">Regular Price</p>
                <span className="text-xs text-gray-500">( &#8377; / month )</span>
              </div>
            </div>

            {formData.offer &&( 
             <div className="flex items-center gap-2">
              <input 
                type="number" 
                onChange={handleChange} value={formData.discountPrice}
                id="discountPrice"
                className="p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                min="0" 
                max="1000000000" 
                required  
              />
              <div className="flex flex-col items-center">
                <p className="text-gray-700">Discounted Price</p>
                <span className="text-xs text-gray-500">( &#8377; / month )</span>
              </div>
             </div>
            ) }
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-1">
          <p className="font-semibold text-gray-900"> Images: 
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-6">
            <input 
              className="p-3 border border-gray-300 rounded w-full"
              type="file" id="images" accept="image/*" 
              multiple 
              onChange={handleFileChange}
            />
            <button disabled={uploading}
              onClick={handleImageSubmit} type="button"
              className="p-3 text-green-600 border border-green-700 rounded-lg uppercase hover:bg-green-100 hover:shadow-md transition duration-200">
              {uploading ? <FaSpinner className="animate-spin" />:'Upload' }
            </button>
          </div>
          {imageUploadError && <p className="text-red-700 text-sm">{imageUploadError}</p>}

          {formData.imageUrls.length > 0 && 
           formData.imageUrls.map((url, index) => (
            <div key={url} className="flex justify-between p-3 border items-center">
              <img src={url} alt="listing" className="w-20 h-20 object-contain rounded-lg" />
              <button type="button" onClick={() => handleRemoveImage(index)}
              className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">
                Delete</button>
            </div>
          ))}

          <button disabled={loading || uploading} className="p-3 bg-gray-900 text-white rounded-lg uppercase hover:bg-gray-800 hover:shadow-md hover:scale-105 transition duration-200">
            {loading ? <FaSpinner className="animate-spin" /> : 'Update listing' }
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p> }
        </div>
      </form>
    </main>
  );
}
