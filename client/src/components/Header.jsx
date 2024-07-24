import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const [user, setUser] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Assuming currentUser is a promise, resolve it
    if (currentUser instanceof Promise) {
      currentUser.then((result) => {
        setUser(result); // Set the resolved user data
      }).catch((error) => {
        console.error('Error resolving currentUser:', error);
      });
    } else {
      setUser(currentUser); // If it's not a promise, just set the user
    }
  }, [currentUser]);

  const image = user?.avatar || ''; // Handle avatar URL

  return (
    <header className='bg-gray-900 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
            <span className='text-white'>Estate</span>
            <span className='text-gray-400'>Connect</span>
          </h1>
        </Link>
        <form className='bg-gray-800 p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-gray-300 placeholder-gray-500'
          />
          <FaSearch className='text-gray-500' />
        </form>
        <ul className='flex gap-4  '>
          <Link to='/'>
            <li className='hidden sm:inline text-gray-300 hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-gray-300 hover:underline'>About</li>
          </Link>
          <Link to='/profile'>
            {user ? (
              <img className='rounded-full h-7 w-7 object-cover ' src={image} alt="profile" />
            ) : (
              <li className='text-gray-300 hover:underline'>Sign-in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}


