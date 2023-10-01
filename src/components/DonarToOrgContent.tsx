import { selectAuth } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import React, { useState,useEffect } from 'react'
import { GrMenu } from 'react-icons/gr';
import PageLoader from './reusable/PageLoader';
import moment from 'moment';

const baseUrl='http://localhost:3000/api/'

const DonarToOrgContent = () => {
    const {loading}=useAppSelector(selectAuth)
    const [recordedData,setRecordedData]=useState([] as any)
    const getDonarRecord=async ()=>{

         const response= await fetch(`${baseUrl}/inventory/get-donar`) 
            .then(response => {
                if (!response.ok) {
                console.log('Network response was not ok');
                }
                return response.json(); 
                })
            .then(data => {
                setRecordedData((data as any).donars)      
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });

    }


    useEffect(()=>{
        getDonarRecord()
    },[])

  return (
    <div className="drawer-content ">
    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden"><GrMenu/></label>
    <div className="w-[100vw] lg:w-[65vw] overflow-x-scroll  md:overflow-x-auto p-8">
  <table className="table min-w-full">
    {/* head */}
    <thead>
      <tr className="text-dark-900">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
      </tr>
    </thead>
        {
            loading ?  <PageLoader/> : (
                <>
                    <tbody>
                    {recordedData?.map((item:any) => (
                            <tr key={item._id} className='hover'>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
            )
        }
  </table>
</div>
    </div>
  )
}

export default DonarToOrgContent


