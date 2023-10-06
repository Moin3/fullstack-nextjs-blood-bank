"use client"
import OrgForDonar from "@/components/OrgForDonar";
import OrganisationInventoryData from "@/components/SidebarContent";
import SidebarMenu from "@/components/menu/SidebarMenu";
import Header from "@/components/reusable/Header";
import { selectAuth } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import OrgForHospital from "@/components/OrgForHospital";
import AdminHome from "@/components/admin/AdminHome";

const Home = () => {
  const {user}=useAppSelector(selectAuth)
  return (
   <>
       <div className="home min-h-full">
            <Header/>
          <div className="drawer lg:drawer-open z-10">
                  <input id="my-drawer-2" type="checkbox" className={`drawer-toggle`} />
                  <SidebarMenu/>

                  {
                    user?.role==="organisation" && (
                      <OrganisationInventoryData/>
                    )
                  }

                  {
                    user?.role==="donar" && (
                            <OrgForDonar/>
                    )
                  }

                  {
                      user?.role==="hospital" && (
                          <OrgForHospital/>
                      )
                  }

                  {
                      user?.role==="admin" && (
                          <AdminHome/>
                      )
                  }
                     
          </div>
    </div>
   </>


  );
};

export default Home;
