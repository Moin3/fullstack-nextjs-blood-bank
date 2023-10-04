import React, { useEffect, useState } from 'react';
// import BarCharts from './BarCharts';
const baseUrl = 'http://localhost:3000/api/';
import dynamic from 'next/dynamic';
const BarCharts = dynamic(() => import('./BarCharts'), {
    ssr: false,
  });

const Charts = () => {
  const [organisationData, setOrganisationData] = useState([] as any);
  const getOrgRecord = async () => {
    try {
      const response = await fetch(`${baseUrl}/inventory/hospital-analytics`);
      if (!response.ok) {
        console.log('Network response was not ok');
        return;
      }
      const data = await response.json();
      setOrganisationData(data.organisations);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    getOrgRecord();
  }, []);

  return (
    <div className='z-[-1px] min-w-full flex flex-row gap-7 flex-wrap items-center justify-center'>
      {organisationData.map((org: any) => (
        <div key={org._id} className="">
            <div className="">
                 <BarCharts orgId={org._id} orgName={org.organisationName}/>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Charts;
