'use client'
import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react';
import toast from 'react-hot-toast';


const Header = () => {
    const router=useRouter()
    const {user}=useAppSelector(selectAuth)
    const handleLogout = async () => {
      try {
        const response = await fetch('/api/user/logout');
        if (!response.ok) {
          console.log('Network response was not ok');
          return;
        }
        toast.success('Successfully Logged out')
        router.push('/login')
  
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

  return (
    <div className="navbar bg-red-400 text-base-100">
    <div className="flex-1">
      <Link href={'/'} className="px-2 cursor-pointer normal-case text-xl">Blood Bank</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><a><div className="badge h-6">{user?.role}</div></a></li>
        <li><a>{user?.name || user?.hospitalName || user?.organisationName}</a></li>
        <li><Link href={'/logout'} onClick={()=>handleLogout()}>Logout</Link> </li>
      </ul>
    </div>
  </div>
  );
};

export default Header;
