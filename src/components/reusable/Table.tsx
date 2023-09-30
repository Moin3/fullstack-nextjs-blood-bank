"use client"
import React,{useState,useEffect} from 'react'
import Inventory from './Inventory'
import toast from 'react-hot-toast'
import PageLoader from './PageLoader'
import { useAppSelector } from '@/redux/hooks'
import { selectAuth } from '@/redux/features/auth/authSlice'
const baseUrl='http://localhost:3000/api/'


const Table = () => {
    const {loading}=useAppSelector(selectAuth)
    const [recordedData,setRecordedData]=useState([] as any)
    const getBloodRecord=async ()=>{

         const response= await fetch(`${baseUrl}/inventory/get-all`) 
            .then(response => {
                if (!response.ok) {
                console.log('Network response was not ok');
                }
                return response.json(); 
                })
            .then(data => {
                setRecordedData((data as any).inventory)      
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });

    }


    useEffect(()=>{
        getBloodRecord()
    },[])


  return (
    <>
    <div className="p-8">
        <Inventory/>
    </div>
    <div className="w-[100vw] lg:w-[65vw] overflow-x-scroll  md:overflow-x-auto p-8">
  <table className="table min-w-full">
    {/* head */}
    <thead>
      <tr className="text-dark-900">
        <th>Role</th>
        <th>Email</th>
        <th>Inventory Type</th>
        <th>Blood Gropu</th>
        <th>Quantity</th>
      </tr>
    </thead>
        {
            loading ?  <PageLoader/> : (
                <>
                    <tbody>
                    {recordedData?.map((item:any) => (
                            <tr key={item._id} className='hover'>
                            <td>{item.role}</td>
                            <td>{item.email}</td>
                            <td>{item.inventoryType}</td>
                            <td>{item.bloodGroup}</td>
                            <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
            )
        }
  </table>
</div>
    </>
  )
}

export default Table