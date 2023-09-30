"use client"
import React, { useState } from 'react'
import MenuItem from './MenuItem'

const SidebarMenu = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const handleItemClick = (item: string) => {
      setActiveItem(item);
    };
  return (
    <>
     <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <MenuItem
          text="Inventory"
          active={activeItem === 'Inventory'}
          onClick={() => handleItemClick('Inventory')}
          path='/'
        />
        <MenuItem
          text="Donar"
          active={activeItem === 'Donar'}
          onClick={() => handleItemClick('Donar')}
          path='/donar'
        />
        <MenuItem
          text="List"
          active={activeItem === 'Hospital'}
          onClick={() => handleItemClick('Hospital')}
          path='/donar'
        />
    </ul>
  </div>
    </>
  )
}

export default SidebarMenu