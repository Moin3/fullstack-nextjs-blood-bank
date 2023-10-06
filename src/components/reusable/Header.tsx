'use client'
import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    const {user}=useAppSelector(selectAuth)
  return (
    <div className="navbar bg-red-400 text-base-100">
    <div className="flex-1">
      <Link href={'/'} className="px-2 cursor-pointer normal-case text-xl">Blood Bank</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><a><div className="badge h-6">{user?.role}</div></a></li>
        <li><a>{user?.name || user?.hospitalName || user?.organisationName}</a></li>
        <li><Link href={'/logout'}>Logout</Link> </li>
      </ul>
    </div>
  </div>
  );
};

export default Header;
