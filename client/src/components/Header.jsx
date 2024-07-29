import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const [user, setUser] = useState(null);
  const {currentUser} = useSelector((state) => state.user);

  const [searchTerm,setSearchTerm] = useState('');

  useEffect(() => {
    if (currentUser instanceof Promise) {
      currentUser.then((result) => {
        setUser(result); 
      }).catch((error) => {
        console.error('Error resolving currentUser:', error);
      });
    } else {
      setUser(currentUser); 
    }
  }, [currentUser]);

  const image = user?.avatar || '';

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search]);
  return (
    <header className='bg-gray-900 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-2xl flex flex-wrap'>
            <span className='text-white'>Estate</span>
            <span className='text-gray-400'>Connect</span>
          </h1>
        </Link>
        <form  onSubmit={handleSubmit} className='bg-gray-800 p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={((e) => setSearchTerm(e.target.value))}
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-gray-300 placeholder-gray-500'
          />
          <button>
            <FaSearch className='text-gray-500' />
          </button>
          
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


