import React, { useState, useEffect } from 'react';
import { GrMenu } from 'react-icons/gr';
import moment from 'moment';

const HospitalToOrgContent = () => {
  const [recordedData, setRecordedData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);

  const getHospitalRecord = async () => {
    try {
      const response = await fetch('/api/inventory/get-hospitals');
      if (!response.ok) {
        console.log('Network response was not ok');
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setRecordedData(data.hospitals);
      setIsLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHospitalRecord();
  }, []);

  return (
    <div className="drawer-content">
      <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden">
        <GrMenu />
      </label>
      <div className="w-[93vw] lg:w-[65vw] overflow-x-auto min-w-full p-4">
        {isLoading ? (
          <div className='min-h-[300px] flex justify-center items-center font-bold text-red-500'>Loading...</div>
        ) : (
          recordedData.length === 0 ? (
            <div className='min-h-[300px] flex justify-center items-center font-bold text-red-500'>No data available</div>
          ) : (
            <div className="overflow-x-auto border rounded-sm">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-200">
                <tr className="text-gray-700">
                  <th scope="col" className="px-6 py-3 text-left font-bold">Hospital Name</th>
                  <th scope="col" className="px-6 py-3 text-left font-bold">Email</th>
                  <th scope="col" className="px-6 py-3 text-left font-bold">Phone</th>
                  <th scope="col" className="px-6 py-3 text-left font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recordedData.map((item: any, index: number) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-blue-100 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'}`}
                  > 
                    <td className="p-3">{item.hospitalName}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.phone}</td>
                    <td className="p-3 text-sm">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
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

export default HospitalToOrgContent;
