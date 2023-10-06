"use client"
import DonarToOrgContent from "@/components/DonarToOrgContent";
import SidebarMenu from "@/components/menu/SidebarMenu";
import Header from "@/components/reusable/Header";
import React from "react";

const Donar = () => {



  return (
    <div className="home min-h-full">
                <Header/>
        <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className={`drawer-toggle`} />
                <SidebarMenu/>
                <DonarToOrgContent/>
         </div>
    </div>


  );
};

export default Donar;
