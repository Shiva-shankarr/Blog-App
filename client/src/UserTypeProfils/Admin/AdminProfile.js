import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminProfile() {
  return (
    <div className='text-center'>
        <div className='display-2 text-dark'>
          Admin Profile
        </div>
        <div className='row'>
          <div className='col-4'>
              <button className='btn btn-success'>User List</button>
          </div>
          <div className='col-4'>
              <button className='btn btn-success'>Author List</button>
          </div>
          <div className='col-4'>
              <button className='btn btn-success'>Articel List</button>
          </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default AdminProfile
