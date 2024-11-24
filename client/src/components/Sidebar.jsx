import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebase'; // Adjust this path to your firebase.js file
import { logo, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive === name
        ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
        : 'bg-[#2c2f32]'
    } flex justify-center items-center cursor-pointer hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="icon" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="icon"
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [user, setUser] = useState(null);

  // Monitor the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        {/* User Section */}
        <div className="mt-4 text-center text-white">
          {user ? (
            <>
              <p className="text-sm">Hello, user</p>
              <button
                onClick={handleLogout}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Login
            </button>
          )}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
