import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>
        <form className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <img src={image} alt="profile" className="rounded-full h-32 w-32 object-cover border-4 border-gray-200" />
          </div>
          <input
            type="text"
            placeholder="Username"
            className=" border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
          />
          <input
            type="email"
            placeholder="Email"
            className=" border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            className=" border border-gray-300 p-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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


