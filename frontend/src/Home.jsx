import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Home() {

  const [data,setData] = useState([]);

    const [adminCount, setAdminCount] = useState();
    const [studentCount, setStudentCount] = useState();
    useEffect(() => {
        axios.get('http://localhost:8085/adminCount')
        .then(res =>{
            setAdminCount(res.data[0].admin)
        }).catch(err => console.log(err));

        axios.get('http://localhost:8085/studentCount')
        .then(res =>{
            setStudentCount(res.data[0].student)
        }).catch(err => console.log(err));

        axios.get('http://localhost:8085/getAdmin')
        .then(res => {
        if(res.data.Status === "Success"){
            setData(res.data.Result);
        }
        })
        .catch(err => console.log(err))
        }, []);

  return (
    <div>
        <div className='p-3 d-flex justify-content-around mt-3'>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div className='text-center pb-1'>
                    <h4>Admin</h4>
                </div>
                <hr/>
                <div className=''>
                    <h5>Total: {adminCount}</h5>
                </div>
            </div>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div className='text-center pb-1'>
                    <h4>Students</h4>
                </div>
                <hr/>
                <div className=''>
                    <h5>Total: {studentCount}</h5>
                </div>
            </div>
        </div>

        <div className='mt-4 px-5 pt-3'>
            <h3>LIST OF ADMINS</h3>
            <table className='table'>
                <thead>
                    <th>Email</th>
                    <th>Action</th>
                </thead>
                <tbody>
                {data.map((user, index) => {
                return <tr key={index}>
                        <td>{user.email}</td>
                        <td>Admin</td>
                      </tr>
              })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home