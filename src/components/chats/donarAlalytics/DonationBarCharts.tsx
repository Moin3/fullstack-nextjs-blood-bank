import PreLoder from '@/components/reusable/Preloder';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';


interface IBarChartsProperty {
    orgId: string;
    orgName: string;
  }
  
  interface IChartState {
    options: {
      chart: {
        id: string;
      };
      xaxis: {
        categories: string[];
      };
    };
    series: {
      name: string;
      data: number[];
    }[];
  }

  const DonationBarCharts = ({ orgId, orgName }: IBarChartsProperty) => {
    const [bloodData, setBloodData] = useState({} as Record<string, Record<string, number>>);
    const [isLoading, setIsLoading] = useState(true);
  
    const [state, setState] = useState<IChartState>({
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: 'quantity(ml)',
          data: []
        },
      ],
    });
  
    const getOrgRecord = async () => {
      try {
        const response = await fetch('/api/inventory/donar-analytics');
        if (!response.ok) {
          console.log('Network response was not ok');
          setIsLoading(false); 
          return;
        }
        const data = await response.json();
        setBloodData(data.totalInBloodQuantityByDonar);
        setIsLoading(false); 
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    useEffect(() => {
      getOrgRecord();
    }, []);
  
    useEffect(() => {
      const bloodGroupData = bloodData[orgId];
  
      if (bloodGroupData) {
        const bloodGroups = Object.keys(bloodGroupData);
        const quantities = Object.values(bloodGroupData);
  
        setState((prevState) => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              categories: bloodGroups,
            },
          },
          series: [
            {
              name: 'quantity(ml)',
              data: quantities,
            },
          ],
        }));
      }
    }, [orgId, orgName, bloodData]);
  
    return (
      <div className="z-[-1] w-[300px] h-[250px] card bg-base-100 shadow-xl">
        <div className="mixed-chart">
          <p className="text-center p-2 bg-red-300 flex justify-center items-center">
            <span className="text-sm text-blue-900 px-2">Org. Name:</span>
            <p className="badge">{orgName}</p>
          </p>
          {isLoading ? (
            <p className='min-h-[220px] flex items-center justify-center'><PreLoder/></p>
          ) : (
            <Chart options={state.options} series={state.series} type="bar" width="300" />
          )}
        </div>
      </div>
    );
  };
  
  export default DonationBarCharts;
