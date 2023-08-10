import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { Navigate, useNavigate, Link } from 'react-router-dom'

function Login() {

    const [values,setValue] = useState({
        email : '',
        password : ''
    })

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const [error,setError] = useState('')

    const handleSubmit = (event) =>{ 
        event.preventDefault();
        axios.post('http://localhost:8085/login',values)
        .then(res => {
            if(res.data.Status === 'Success'){
                navigate('/');
            }else{
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 roiunded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                           onChange={e=>setValue({...values,email:e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e=>setValue({...values,password:e.target.value})}  className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-secondary w-100 rounded-0'> Log in</button>
                    <Link to={`/start`} type='submit' className='btn btn-outline-light w-100 rounded-0 mt-2'> Back to Home</Link>
                </form>
            </div>
        </div>
  )
}

export default Login