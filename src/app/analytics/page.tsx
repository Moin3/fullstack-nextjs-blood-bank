"use client"
import SidebarMenu from "@/components/menu/SidebarMenu";
import Charts from "@/components/chats/hospitalAlalytics/Charts";
import DonationChart from "@/components/chats/donarAlalytics/DonationChart";
import Header from "@/components/reusable/Header";
import { selectAuth } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { GrMenu } from "react-icons/gr";
import OrgAnalyticsChart from "@/components/chats/OrgAnalytics/OrgAnalyticsCharts";


const Analytics = () => {
    const {user}=useAppSelector(selectAuth)

  return (
    <div className="">
                <Header/>
        <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className={`drawer-toggle`} />
                <SidebarMenu/>
                <div className="drawer-content ">
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden"><GrMenu/></label>
                    <div className="mt-7 px-3 mb-7 ">
                        {
                            user?.role==="hospital" && (
                                <Charts/>
                            )
                        }
                        {
                            user?.role==="donar" && (
                                <DonationChart/>
                            )
                        }
                        {
                            user?.role==="organisation" && (
                                <OrgAnalyticsChart/>
                            )
                        }
                      
                    </div>
                </div>
                
         </div>
    </div>


  );
};

export default Analytics;