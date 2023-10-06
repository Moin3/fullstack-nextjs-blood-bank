import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DonationBarCharts = dynamic(() => import('./DonationBarCharts'), {
  ssr: false,
});

const DonationChart = () => {
  const [organisationData, setOrganisationData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrgRecord = async () => {
    try {
      const response = await fetch('/api/inventory/donar-analytics');
      if (!response.ok) {
        console.log('Network response was not ok');
        setLoading(false);
        return;
      }
      const data = await response.json();
      setOrganisationData(data.organisations);
      setLoading(false);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    getOrgRecord();
  }, []);

  if (loading) {
    return <div className='min-h-[300px] flex justify-center items-center font-bold text-red-500'>Loading...</div>
  }

  return (
    <div className='min-w-full flex flex-row gap-7 flex-wrap items-center justify-center'>
      {organisationData.map((org:any) => (
        <div key={org._id}>
          <DonationBarCharts orgId={org._id} orgName={org.organisationName} />
        </div>
      ))}
    </div>
  );
};

export default DonationChart;
