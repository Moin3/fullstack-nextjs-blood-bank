import React from 'react'
import { GrMenu } from 'react-icons/gr'

const AdminHome = () => {
  return (
    <div className="drawer-content ">
        <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden"><GrMenu/></label>
        <div className="mt-7 px-3 mb-7 ml-5">
            <h1 className="text-center font-bold text-2xl text-red-300">Welcome to admin Dashboard</h1>
            <div className="mt-9 text-black-200">
                <h2 className='text-green-500'>Admin permission:</h2>
                <li>Can Delete Donar</li>
                <li>Can Delete Hospital</li>
                <li>Can Delete Organisation</li>
            </div>
            <p className=''>It means admin can manage the deletaion process.</p>
        </div>
        <hr />
        <div className="mt-7 px-3 mb-7 ml-5">
                <h2 className='text-red-500'>Admin Concern:</h2>
                <li>Before delete any user please check first</li>
                <p className='font-sm mt-7 italic'><span className='font-bold'>N.B:</span> You can't back deleted user informarion</p>
            </div>
            <hr />
    </div>
  )
}

export default AdminHome