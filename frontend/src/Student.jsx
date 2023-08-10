import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Student() {

  const [data,setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8085/getStudents')
    .then(res => {
      if(res.data.Status === "Success"){
        setData(res.data.Result);
      }
    })
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8085/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success"){
        window.location.reload(true);
      }
      else{
        alert("Error");
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='px-5 py-3'>
        <div className='d-flex justify-content-center'>
            <h3>STUDENT LIST</h3>
        </div>
        <Link to='/create' className='btn btn-secondary'>Add Student</Link>
      <div className='mt-3'>
        <table className='table'>
           <thead>
              <tr>
                 <th>Profile Photo</th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Address</th>
                 <th>Batch</th>
                 <th>Attendance</th>
                 <th>Total</th>
                 <th>Action</th>
              </tr>
           </thead>
           <tbody>
              {data.map((student, index) => {
                return <tr key={index}>
                        <td>{
                            <img className="student_image" src={`http://localhost:8085/images/`+ student.image} alt="" />
                          }</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.address}</td>
                        <td>{student.batch}</td>
                        <td>{student.outof}</td>
                        <td>{student.total}</td>
                        <td>
                          <Link to={`/updateattendance/` +student.id} className='btn btn-info btn-sm me-2'>Attendance</Link>
                          <Link to={`/studentEdit/` +student.id} className='btn btn-dark btn-sm me-2'>Update</Link>
                          <button onClick={e => handleDelete(student.id)} className='btn btn-dark btn-sm'>Delete</button>
                        </td>
                      </tr>
              })}
           </tbody>
        </table>
      </div>  
    </div>
  )
}

export default Student