import React, { useState, useEffect } from 'react';
import { GrMenu } from 'react-icons/gr';
import moment from 'moment';
import Image from 'next/image'; 
import HospitalInstruction from '../../public/hospital.png';

const OrgForHospital = () => {
  const [recordedData, setRecordedData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);

  const getOrgRecord = async () => {
    try {
      const response = await fetch('/api/inventory/get-organisation-for-hospital');
      if (!response.ok) {
        console.log('Network response was not ok');
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setRecordedData(data.organisations);
      setIsLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrgRecord();
  }, []);

  return (
    <div className="drawer-content z-[-1]">
      <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden">
        <GrMenu />
      </label>
      <div className="w-full lg:w-[65vw] overflow-x-auto min-w-full">
        {isLoading ? (
          <div className='min-h-[300px] flex justify-center items-center font-bold text-red-500'>Loading...</div>
        ) : (
          recordedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4 md:px-8 lg:px-12">
              <p className="font-bold text-red-500 mt-4">No data available</p>

              <ul className="list-disc list-inside mt-4 text-left">
                <li>As you are a new hospital you have no data available</li>
                <li>To show data, first you have to take blood from a registered "Organisation" account</li>
                <li>Please create an "Organisation" account first and login</li>
                <li>Then click inventory and it will open a modal with some information like below:</li>
                <Image src={HospitalInstruction} alt="No data available" className="rounded-sm shadow-sm mt-7 max-w-xs md:max-w-md lg:max-w-lg" />
                <li>Insert your Hospital email, select blood group, add quantity and press submit to take blood from here</li>
                <li>Then, Again Login to your "Hospital" account</li>
                <li>Now you can see data and analytics in your Hospital account as well as in your registered organization account</li>
              </ul>
              <ul className='list-disc list-inside mt-4 text-left text-red-300 mb-10'>
                <li>N.B: [Without creating a new organization account you can use our demo organization account]</li>
              </ul>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-200">
                  <tr className="text-gray-700">
                    <th scope="col" className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 text-left font-bold">Organisation Name</th>
                    <th scope="col" className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 text-left font-bold">Email</th>
                    <th scope="col" className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 text-left font-bold">Phone</th>
                    <th scope="col" className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 text-left font-bold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recordedData.map((item: any) => (
                    <tr key={item._id} className="hover:bg-gray-100">
                      <td className="p-2 md:p-4 lg:p-6">{item.organisationName}</td>
                      <td className="p-2 md:p-4 lg:p-6">{item.email}</td>
                      <td className="p-2 md:p-4 lg:p-6">{item.phone}</td>
                      <td className="p-2 md:p-4 lg:p-6 text-sm">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OrgForHospital;
