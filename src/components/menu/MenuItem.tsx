import Link from 'next/link';
import React from 'react'
interface IMenu{
    text:string,
    active:boolean | null,
    path:string
    onClick: () => void;
}

const MenuItem = ({ text, active, onClick,path }:IMenu) => {
    return (
      <li
        onClick={onClick}
      >
        <Link 
            className={`cursor-pointer ${
              active  ? 'font-semibold bg-red-400 text-white-100' : 'text-gray-500'
            }`} 
            href={`${path}`} > {text} 
        </Link>
      </li>
    );
  };

export default MenuItem