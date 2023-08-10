import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateAttendance() {

    const [data,setData] = useState({
        outof: '',
        total: '',
    })

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:8085/get/`+id)
        .then(res =>{
            setData({...data,
                outof: res.data.Result[0].outof,
                total: res.data.Result[0].total
            })
        })
        .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.put('http://localhost:8085/updateattendance/'+ id, data)
        .then(res => {
            if(res.data.Status === "Success"){
                navigate('/student');
            }
            
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='d-flex flex-column align-items-center pt-5'>
        <h2>UPDATE STUDENT</h2>
        <form class="row g-3 w-50" onSubmit={handleSubmit}>
            <div class="col-12">
                <label for="inputoutof4" class="form-label">Attendance</label>
                <input type="number" class="form-control" id="inputoutof4"
                onChange={e => setData({...data,outof : e.target.value})} value={data.outof}/>
            </div>
            <div class="col-12">
                <label for="inputtotal4" class="form-label">Total</label>
                <input type="number" class="form-control" id="inputtotal4"
                onChange={e => setData({...data,total : e.target.value})} value={data.total}/>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-secondary">Update</button>
            </div>
            
        </form>
    </div>

    
  )
}

export default UpdateAttendance