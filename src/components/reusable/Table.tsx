import React, { useState, useEffect, useCallback } from 'react';
import Inventory from './Inventory';
import moment from 'moment';

const Table = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recordedData, setRecordedData] = useState([] as any);

  const getBloodRecord = async () => {
    try {
      const response = await fetch('/api/inventory/get-all');
      if (!response.ok) {
        console.log('Network response was not ok');
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setRecordedData(data.inventory);
      setIsLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBloodRecord();
  }, []);

  const handleNewDataAdded = useCallback(async () => {
    await getBloodRecord();
  }, []);

  return (
    <>
      <div className="p-8">
        <Inventory onNewDataAdded={handleNewDataAdded} />
      </div>
      <div className="w-[93vw] lg:w-[65vw] overflow-x-scroll md:overflow-x-auto min-w-full px-5 py-10">
        {isLoading ? (
          <div className="min-h-[300px] flex justify-center items-center font-bold text-red-500">Loading...</div>
        ) : (
          recordedData.length === 0 ? (
            <div className="min-h-[300px] flex justify-center items-center font-bold text-red-500">No data available</div>
          ) : (
            <table className="min-w-full bg-white border rounded-lg overflow-x-scroll">
              <thead className="bg-blue-200">
                <tr className="text-gray-700">
                  <th className="px-6 py-3 text-left font-bold">Role</th>
                  <th className="px-6 py-3 text-left font-bold">Email</th>
                  <th className="px-6 py-3 text-left font-bold">Inventory Type</th>
                  <th className="px-6 py-3 text-left font-bold">Blood Group</th>
                  <th className="px-6 py-3 text-left font-bold">Quantity</th>
                  <th className="px-6 py-3 text-left font-bold">Time & Date</th>
                </tr>
              </thead>
              <tbody>
                {recordedData.map((item: any, index: number) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-blue-100 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'}`}
                  >
                    <td className="p-3">{item.role}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.inventoryType}</td>
                    <td className="p-3">{item.bloodGroup}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3 text-sm">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </>
  );
};

export default Table;
