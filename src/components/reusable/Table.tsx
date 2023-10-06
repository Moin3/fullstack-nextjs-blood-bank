"use client"
import React,{useState,useEffect} from 'react'
import Inventory from './Inventory'
import moment from 'moment'


const Table = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [recordedData,setRecordedData]=useState([] as any)
    const getBloodRecord=async ()=>{

         const response= await fetch('/api/inventory/get-all') 
            .then(response => {
                if (!response.ok) {
                console.log('Network response was not ok');
                setIsLoading(false); 
                return;
                }
                return response.json(); 
                })
            .then(data => {
                setRecordedData((data as any).inventory)  
                setIsLoading(false); 
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
        {isLoading ? ( 
        <div className=' min-h-[300px] flex justify-center items-center font-bold text-red-500'>Loading...</div>
        ) : (
          <table className="table min-w-full">
            <thead>
              <tr className="text-dark-900">
                <th>Role</th>
                <th>Email</th>
                <th>Inventory Type</th>
                <th>Blood Gropu</th>
                <th>Quantity</th>
                <th>Time & date</th>
              </tr>
            </thead>
            <tbody>
            {recordedData?.map((item:any) => (
                    <tr key={item._id} className='hover'>
                    <td>{item.role}</td>
                    <td>{item.email}</td>
                    <td>{item.inventoryType}</td>
                    <td>{item.bloodGroup}</td>
                    <td>{item.quantity}</td>
                    <td>{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Table