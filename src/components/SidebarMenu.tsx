"use client"
import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/features/auth/authSlice';

const SidebarMenu = () => {
  const { user } = useAppSelector(selectAuth);
  const isClient = typeof window !== 'undefined'; // Check if code is running on the client-side
  const [activeItem, setActiveItem] = useState<string | null>(
    isClient ? localStorage.getItem('activeItem') || null : null
  );

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (isClient) {
      localStorage.setItem('activeItem', item);
    }
  };

  useEffect(() => {
    return () => {
      if (isClient) {
        localStorage.removeItem('activeItem');
      }
    };
  }, [isClient]);

  return (
    <>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {/* ---------------------------- organisation menu --------------------------- */}
          {user?.role === 'organisation' && (
            <>
              <MenuItem
                text="INVENTORY"
                active={activeItem === 'Inventory'}
                onClick={() => handleItemClick('Inventory')}
                path="/"
              />
              <MenuItem
                text="DONAR"
                active={activeItem === 'Donar'}
                onClick={() => handleItemClick('Donar')}
                path="/donar"
              />
              <MenuItem
                text="HOSPITAL"
                active={activeItem === 'Hospital'}
                onClick={() => handleItemClick('Hospital')}
                path="/hospital"
              />
            </>
          )}

          {/* ---------------------------- donar menu --------------------------- */}
          {(user?.role === 'donar' || user?.role === 'hospital') && (
            <>
              <MenuItem
                text="ORGANISATION"
                active={activeItem === 'Organisation'}
                onClick={() => handleItemClick('Organisation')}
                path="/"
              />
              <MenuItem
                text="ANALYTICS"
                active={activeItem === 'Analytics'}
                onClick={() => handleItemClick('Analytics')}
                path="/analytics"
              />
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SidebarMenu;
