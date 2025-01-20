import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Topbar from '../components/admin/Dashboard/Topbar'
import Sidebar from '../components/admin/Dashboard/Sidebar'
export default function layout() {
  return (
  <>
  <div className="flex h-screen bg-gradient-to-r from-blue-50 to-gray-100">
  <Sidebar />
  <div className="flex-1 flex flex-col">
     <Topbar/>
   
    
<main>
  <Outlet/>

</main>
</div>
</div>
</>
  )
}
