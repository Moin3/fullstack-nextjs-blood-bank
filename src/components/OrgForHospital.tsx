import React, { useState,useEffect } from 'react'
import { GrMenu } from 'react-icons/gr';
import moment from 'moment';


const OrgForHospital = () => {
    const [recordedData,setRecordedData]=useState([] as any)
    const [isLoading, setIsLoading] = useState(true);

    const getOrgRecord=async ()=>{

         const response= await fetch('/api/inventory/get-organisation-for-hospital') 
            .then(response => {
                if (!response.ok) {
                console.log('Network response was not ok');
                setIsLoading(false); 
                return;
                }
                return response.json(); 
                })
            .then(data => {
                setRecordedData((data as any).organisations) 
                setIsLoading(false); 
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });

    }


    useEffect(()=>{
        getOrgRecord()
        
    },[])

  return (
    <div className="drawer-content z-[-1]">
      <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden">
        <GrMenu />
      </label>
      <div className="w-[70vw] lg:w-[65vw] overflow-x-scroll md:overflow-x-auto min-w-full">
        {isLoading ? (
          <div className='min-h-[300px] flex justify-center items-center font-bold text-red-500'>Loading...</div>
        ) : (
          <table className="min-w-full bg-white border rounded-lg overflow-x-scroll">
            <thead className="bg-gray-200">
              <tr className="text-gray-700">
                <th scope="col" className="px-6 py-3 text-left font-bold">Organisation Name</th>
                <th scope="col" className="px-6 py-3 text-left font-bold">Email</th>
                <th scope="col" className="px-6 py-3 text-left font-bold">Phone</th>
                <th scope="col" className="px-6 py-3 text-left font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {recordedData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-3">No data available</td>
                </tr>
              ) : (
                recordedData.map((item: any) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="p-3">{item.organisationName}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.phone}</td>
                    <td className="p-3 text-sm">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default OrgForHospital


