'use client'
import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
  const { user } = useAppSelector(selectAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-red-400 text-base-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1">
            <Link href={'/'} className="text-xl font-bold">Blood Bank</Link>
          </div>
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-9">
              <span className="badge h-6 p-2 bg-gray-800 text-white rounded">{user?.role}</span>
              <span className="text-lg font-semibold">{user?.name || user?.hospitalName || user?.organisationName}</span>
            </div>
            <Link href={'/logout'} className="text-lg font-semibold badge p-3 bg-gray-800 text-white rounded">Logout</Link>
          </div>
        </div>
      </nav>
      <div className={`fixed top-0 right-0 h-full w-64 bg-red-400 text-base-100 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform lg:hidden z-50`}>
        <div className="p-4">
          <button onClick={toggleMenu} className="btn btn-ghost mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="space-y-4">
            <li>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Role:</span>
                <span className="badge h-6 p-2 bg-gray-800 text-white rounded">{user?.role}</span>
              </div>
            </li>
            <li className="flex items-center space-x-2">
              <span className="font-semibold">Name:</span>
              <span className="text-lg font-semibold">{user?.name || user?.hospitalName || user?.organisationName}</span>
            </li>
            <li>
              <Link href={'/logout'} className="text-lg font-semibold badge p-3 bg-gray-800 text-white rounded">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
