import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);

  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [filePerc, setFilePerc] = useState(0);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>
        <form className="flex flex-col gap-6">
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
            className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          />
          <button className="bg-blue-600 text-white rounded-lg p-4 uppercase hover:bg-blue-700 transition-colors duration-200">Update</button>
        </form>
        <div className="flex justify-between mt-6">
          <span className="text-red-600 cursor-pointer hover:underline">Delete Account</span>
          <span className="text-red-600 cursor-pointer hover:underline">Sign Out</span>
        </div>
      </div>
    </div>
  );
}



