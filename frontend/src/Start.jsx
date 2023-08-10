import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start() {

    const navigate = useNavigate();

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-4 roiunded w-25 border loginForm text-center'>
                <h2>Login As</h2>
                <div className='d-flex justify-content-around mt-5'>
                    <button className='btn btn-light btn-lg' onClick={e => navigate('/studentlogin')}>Student</button>
                    <button className='btn btn-secondary btn-lg' onClick={e => navigate('/login')}>Admin</button>
                </div>
            </div>
        </div>
  )
}

export default Start