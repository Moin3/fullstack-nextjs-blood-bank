'use client';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import toast from 'react-hot-toast';

interface Donor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const DonorListContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recordedData, setRecordedData] = useState<Donor[]>([]);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const getDonorRecord = async () => {
    try {
      const response = await fetch('/api/inventory/donar-list');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debugging line
      setRecordedData(data.donarData);
      setIsLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDonorRecord();
  }, []); // Only run on component mount

  const handleDelete = async (id: string) => {
    try {
      setDeletingItemId(id);
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Delete request failed');
      }

      const data = await response.json();
      toast.success(data.message);
      setRecordedData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      toast.error('Error deleting donor');
      console.error('Error deleting donor:', error); 
    } finally {
      setDeletingItemId(null);
    }
  };

  return (
    <div className="w-[100vw] lg:w-[65vw] overflow-x-scroll md:overflow-x-auto p-8">
      {isLoading ? (
        <div className="min-h-[300px] flex justify-center items-center font-bold text-red-500">Loading...</div>
      ) : (
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th scope="col" className="px-6 py-3 text-left font-bold">Donor Name</th>
              <th scope="col" className="px-6 py-3 text-left font-bold">Email</th>
              <th scope="col" className="px-6 py-3 text-left font-bold">Phone</th>
              <th scope="col" className="px-6 py-3 text-left font-bold">Date</th>
              <th scope="col" className="px-6 py-3 text-left font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {recordedData.length > 0 ? (
              recordedData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.phone}</td>
                  <td className="p-3 text-sm">{moment(item.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                  <td className="p-3">
                    {deletingItemId === item._id ? (
                      'Deleting...'
                    ) : (
                      <span
                        className="cursor-pointer text-blue-500"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DonorListContent;
