import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function StudentDetail() {

    const {id} = useParams();

    const navigate = useNavigate();

    const [student,setStudent] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8085/get/'+id)
        .then(res => setStudent(res.data.Result[0]))
        .catch(err => console.log(err));
    })

    const handleLogout = () =>{
        axios.get('http://localhost:8085/logout')
        .then(res => {
            navigate('/start')
        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex justify-content-center flex-column align-items-center vh-100 addbg'>
        <div className='empImg'>
            <img src={`http://localhost:8085/images/`+ student.image} alt=""/>
        </div>
        
        <div className='d-flex align-items-center flex-column mt-5'>
            <h3>Name: {student.name} </h3>
            <h3>Email: {student.email} </h3>
            <h3>Batch: {student.batch} </h3>
            <h3>Attendance: {student.outof} </h3>
            <h4>Total: {student.total} </h4>
        </div>
        <div>
            <button className='btn btn-light me-2' onClick={handleLogout}>Logout</button>
        </div>

    </div>
  )
}

export default StudentDetail