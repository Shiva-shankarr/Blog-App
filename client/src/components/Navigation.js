import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../Css/Navigation.css'
import { useSelector,useDispatch } from 'react-redux';
import { resetState } from '../redux/slices/userAuthorslice';

function Navigation(){
    
  let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } = useSelector((state) => state.userAuthoruserAuthorLoginReducer);
  

  let dispatch=useDispatch();
  function signout()
  {
   localStorage.removeItem("token");
    dispatch(resetState());
  }




  return (
    <div className=' w-100 shiv'>
      <ul className='nav justify-content-end mt-2 '>
        {loginUserStatus===false?<>
        <li className='nav-item mt-4 '>
            <NavLink className='nav-link ' to="">
              Home
            </NavLink>
        </li>
        <li className='nav-item mt-4'>
            <NavLink className='nav-link' to="signup">
              Signup
            </NavLink>
        </li>
        <li className='nav-item mt-4'>
            <NavLink className='nav-link' to="signin">
              Signin
            </NavLink>
        </li>
        </>:
         <li className='nav-item mt-4'>
         <NavLink
                  className="nav-link"
                  to="/"
                  style={{ color: "#EBA40F" }}
                  onClick={signout}
                >
                  <span className="lead  fs-4 me-3 fw-1"  style={{ color: "#F0EAFB" ,fontWeight:'bold',fontSize:'1.3rem',textTransform:'capitalize',fontFamily:'fantasy'}}>{currentUser.username}
                   <sup style={{color:'#35F8DE',fontSize:'1rem'}}>({currentUser.userType})</sup>
                   </span>
                  Signout
                </NavLink>
        </li>
        }

      </ul>
    </div>
  )
}

export default Navigation
