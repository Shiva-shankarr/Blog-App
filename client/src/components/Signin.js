import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userAuthorLoginThunk } from '../redux/slices/userAuthorslice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

function Signin() {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    isPending,
    currentUser,
    loginUserStatus,
    errorOccurred,
    errMsg,
  } = useSelector((state) => state.userAuthoruserAuthorLoginReducer);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignUpFormSubmit = async (userCred) => {
    setErrorMessage(''); // Reset error message on form submit
   
    dispatch(userAuthorLoginThunk(userCred));
    
  };

  useEffect(() => {
    if (errorOccurred) {
      setErrorMessage(errMsg); // Set error message if error occurred
    }
    if (loginUserStatus) {
      // Redirect based on user type
      if (currentUser.userType === 'user') {
        navigate('/user');
      } else if (currentUser.userType === 'author') {
        navigate('/author');
      } else if (currentUser.userType === 'admin') {
        navigate('/admin');
      }
    }
  }, [errorOccurred, errMsg, loginUserStatus]);

  return (
    <div className='tharun d-block mt-5 mx-auto w-75'>
      <h1 className='display-4 text-center text-bold fw-bold text-info'>Signin</h1>
      {errorMessage && <p className='text-danger text-center'>{errorMessage}</p>}
      {errMsg && <p className='text-danger text-center'>{errMsg}</p>} {/* Display errMsg */}
      
      <div className='row mt-3'>
        <div className='col d-flex justify-content-center align-items-center '>
          <div className='form-check'>
            <input className='form-check-input' type='radio' name='userType' id='Author' value='author' {...register('userType', { required: true })} />
            <label className='form-check-label fw-bold' htmlFor='Author'>Author</label>
          </div>
        </div>
        <div className='col d-flex justify-content-center align-items-center'>
          <div className='form-check'>
            <input className='form-check-input' type='radio' name='userType' id='User' value='user' {...register('userType', { required: true })} />
            <label className='form-check-label fw-bold' htmlFor='User'>User</label>
          </div>
        </div>
        <div className='col d-flex justify-content-center align-items-center'>
          <div className='form-check'>
            <input className='form-check-input' type='radio' name='userType' id='Admin' value='admin' {...register('userType', { required: true })} />
            <label className='form-check-label fw-bold' htmlFor='Admin'>Admin</label>
          </div>
        </div>
      </div>
      <form className='mt-4 w-50 d-block mx-auto' onSubmit={handleSubmit(onSignUpFormSubmit)}>
        <div className=' row mb-3'>
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='username'>Username:</label>
          </div>
          <div className='col-9'>
            <input className='form-control col' type='text' id='username' {...register('username', { required: true, minLength: 6, maxLength: 20 })} />
            {errors.username && errors.username.type === 'required' && <p className='text-danger fw-bold'>Username is required</p>}
          </div>
        </div>
        <div className=' row mb-3'>
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='password'>Password:</label>
          </div>
          <div className='col-9'>
            <input className='form-control col' type='password' id='password' {...register('password', { required: true, minLength: 6 })} />
            {errors.password && errors.password.type === 'required' && <p className='text-danger fw-bold'>Password is required</p>}
          </div>
        </div>
        <div className=' p-3'>
          <button type='submit' className='btn btn-warning d-block mx-auto'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Signin;
