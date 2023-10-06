import React, { useState,useEffect } from 'react'
import { GrMenu } from 'react-icons/gr';
import moment from 'moment';


const OrgForDonar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [recordedData,setRecordedData]=useState([] as any)
    const getOrgRecord=async ()=>{

         const response= await fetch('/api/inventory/get-organisation-for-donar') 
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
    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden"><GrMenu/></label>
    <div className="w-[100vw] lg:w-[65vw] overflow-x-scroll  md:overflow-x-auto p-8">
    {isLoading ? ( 
      <div className=' min-h-[300px] flex justify-center items-center font-bold text-red-500'>Loading...</div>
    ) : (
        <table className="table min-w-full z-[-1]">
          <thead>
            <tr className="text-dark-900">
                  <th scope="col">Organisation Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Date</th>
            </tr>
          </thead>
          
          <tbody>
          {recordedData?.map((item:any) => (
                  <tr key={item._id} className='hover'>
                  <td>{item.organisationName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  </tr>
              ))}
          </tbody>
        </table>
    )}
      </div>
    </div>
  )
}

export default OrgForDonar


