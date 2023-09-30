import React from 'react'
import { GrMenu } from 'react-icons/gr';
import Table from './reusable/Table';

const OrganisationInventoryData = () => {
  return (
    <div className="drawer-content ">
    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button top-1 lg:hidden"><GrMenu/></label>
    <Table/>
    </div>
  )
}

export default OrganisationInventoryData