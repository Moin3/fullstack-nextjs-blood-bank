import React from 'react';
import dynamic from 'next/dynamic';
const OrgAnalyticsInfo = dynamic(() => import('./OrgAnalyticsInfo'), {
    ssr: false,
  });

const OrgAnalyticsChart = () => {
    return (
      <div className="z-[-1]">
            <OrgAnalyticsInfo/>
      </div>
    );
};

export default OrgAnalyticsChart;