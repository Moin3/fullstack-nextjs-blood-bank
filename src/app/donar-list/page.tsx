import DonarListContent from "@/components/admin/DonarListContent";
import SidebarMenu from "@/components/menu/SidebarMenu";
import Header from "@/components/reusable/Header";
import React from "react";
import { GrMenu } from "react-icons/gr";



const DonarList = () => {
  return (
    <div>
        <Header/>
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className={`drawer-toggle`} />
            <SidebarMenu/>
            <div className="drawer-content ">
            <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden"><GrMenu/></label>
                <div className="mt-7 px-3 mb-7 ">
                    <DonarListContent/>
                </div>
            </div>
         </div>
    </div>


  );
};

export default DonarList;