import Link from 'next/link'
import React from 'react'

const LogRegNavbar = () => {
  return (
    <div className="navbar bg-base-200 px-5 fixed">
  <div className="flex-1">
    <Link href={'/init'} className=" font-bold normal-case text-lg md:text-xl lg:text-2xl text-red-600 btn">BE A HERO</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={'/login'}>Login</Link></li>
      <li><Link href={'/register'}>Register</Link></li>
    </ul>
  </div>
</div>
  )
}

export default LogRegNavbar