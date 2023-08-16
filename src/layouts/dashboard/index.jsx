import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from './SideNav.jsx'

function DashboardLayout() {
  return (
<>
<SideNav/>
<Outlet/>
</>
  )
}

export default DashboardLayout