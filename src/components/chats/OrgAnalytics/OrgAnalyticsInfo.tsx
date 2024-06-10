import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';


interface IBloodGroupData {
  bloodGroup: string;
  totalIn: number;
  totalOut: number;
  availabeBlood:number
}

const OrgAnalyticsInfo = () => {
  const [bloodData, setBloodData] = useState<IBloodGroupData[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  const getOrgRecord = async () => {
    try {
      const response = await fetch('/api/inventory/org-analytics');
      if (!response.ok) {
        console.log('Network response was not ok');
        setIsLoading(false); 
        return;
      }
      const data = await response.json();
      setBloodData(data.bloodGroupData);
      setIsLoading(false); 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  useEffect(() => {
    getOrgRecord();
  }, []);

  if (isLoading) {
    return <div className='min-h-[300px] flex justify-center items-center font-bold text-red-500'>Loading...</div>
  }

  return (
    <div className="flex flex-wrap justify-center ">
      {bloodData.map((record) => (
        <div key={record.bloodGroup} className="z-[-10] card rounded-none shadow-md mb-4 mr-4">
          <div className="mixed-chart p-4">
            
            <div className="avatar">
                <div className="w-8 h-8 p-mr-2 rounded-full bg-red-200 cursor-pointer hover:bg-red-400">
                
                  <div className=" w-full h-full flex items-center justify-center">{record.bloodGroup}</div>
                </div>
           </div>
            <Chart
              options={{
                chart: {
                  id: `chart-${record.bloodGroup}`,
                },
                xaxis: {
                  categories: [''],
                },
              }}
              series={[
                {
                  name: 'Total In(ml)',
                  data: [record.totalIn],
                },
                {
                  name: 'Total Out(ml)',
                  data: [record.totalOut],
                },
                {
                  name: 'Available(ml)',
                  data: [record.availabeBlood],
                },
              ]}
              type="bar"
              width="300"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrgAnalyticsInfo;
