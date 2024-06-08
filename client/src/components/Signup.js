import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  // Initializing useForm hook
  let { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate(); // Hook for navigation
  let [err, setError] = useState(""); // State for error message
  let [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success

  // Function to handle form submission
  async function onRegisterFormSubmit(newUser) {
    try {
      // Make HTTP post request based on user type
      let res = await axios.post(`http://localhost:4000/${newUser.userType}-api/${newUser.userType}s`, newUser);
      
      // Handling response
      if (res.data.message === 'User created successfull') {
        setError(""); // Clearing error message
        setSignupSuccess(true); // Setting signup success flag
        navigate('/signin'); // Redirecting to signin page after successful signup
      } else {
        setError(res.data.message); // Setting error message from response
      }
    } catch(err) {
      console.log("Error:", err);
      setError("An error occurred while processing your request"); // Setting generic error message
    }
  }

  return (
    <div className='tharun d-block mt-5 mx-auto w-75'>
      <h1 className='display-4 text-center text-bold fw-bold text-info'>Signup</h1>

      {/* Form for signup */}
      <form className='w-50 d-block mx-auto mt-5' onSubmit={handleSubmit(onRegisterFormSubmit)}>
        {/* Radio buttons for selecting user type */}
        <div className="row mt-3 mb-3">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="userType" id="Author" value="author" {...register("userType")} />
              <label className="form-check-label fw-bold" htmlFor="Author">Author</label>
            </div>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="userType" id="User" value="user" {...register("userType")} />
              <label className="form-check-label fw-bold" htmlFor="User">User</label>
            </div>
          </div>
        </div>

        {/* Display error message if there's an error */}
        {err.length !== 0 && err !== "User created successfull" && (
          <p className="lead text-center text-danger fw-bold">{err}</p>
        )}

        {/* Username input */}
        <div className=' row mb-3'>
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='username'>Username: </label>
          </div>
          <div className='col-9'>
            <input className='form-control col' type='text' id='username' {...register("username", { required: true, minLength: 6, maxLength: 20 })}></input>
          </div>
        </div>
        {/* Display username input errors */}
        {errors.username?.type === "required" && <p className='text-danger fw-bold'>Username is required</p>}
        {errors.username?.type === "minLength" && <p className='text-danger fw-bold'>Minimum length of username should be 6</p>}
        {errors.username?.type === "maxLength" && <p className='text-danger fw-bold'>Maximum length of username should be 20</p>}

        {/* Password input */}
        <div className=' row mb-3'>
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='password'>Password: </label>
          </div>
          <div className='col-9'>
            <input className='form-control col' type='password' id='password' {...register("password", { required: true, minLength: 6 })}></input>
          </div>
        </div>
        {/* Display password input errors */}
        {errors.password?.type === "required" && <p className='text-danger fw-bold'>Password is required</p>}
        {errors.password?.type === "minLength" && <p className='text-danger fw-bold'>Minimum length of password should be 6</p>}

        {/* Email input */}
        <div className=' row mb-3 '>
          <div className='col-3'>
            <label className='form-label fw-bold' htmlFor='email'>Email: </label>
          </div>
          <div className='col-9'>
            <input className='form-control col' type='email' id='email' {...register("email", { required: true })}></input>
          </div>
        </div>
        {/* Display email input errors */}
        {errors.email?.type === "required" && <p className='text-danger fw-bold'>Email is required</p>}

        {/* Register button */}
        <div className='mt-3 mb-4 p-5'>
          <button className='btn btn-warning d-flex mx-auto ' type='submit'>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
