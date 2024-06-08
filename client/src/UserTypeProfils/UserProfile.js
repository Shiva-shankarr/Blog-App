import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'


function UserProfile() {


  let navigate=useNavigate();
  const Article=()=>{
    navigate('/user/articles');
  }

  return (
    <div>
    <div className='text-center mt-3'>
      <button className='btn btn-secondary' onClick={()=>Article()}>Articles</button>
      </div>
      <Outlet/>
    </div>
  )
}

export default UserProfile
