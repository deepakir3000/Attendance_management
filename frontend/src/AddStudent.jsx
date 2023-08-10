import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddStudent() {

    const [data,setData] = useState({
        name : '',
        email : '',
        password : '',
        address : '',
        batch: '',
        outof: '',
        total: '',
        image : '',
    })

    const navigate = useNavigate();

    const handleSubmit = (event)=>{
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("address", data.address);
        formdata.append("batch", data.batch);
        formdata.append("outof", data.outof);
        formdata.append("total", data.total);
        formdata.append("image", data.image);
        axios.post('http://localhost:8085/create',formdata)
        .then(res => {
            navigate('/student');
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='d-flex flex-column align-items-center pt-5'>
        <h2>ADD STUDENT</h2>
        <form class="row g-3 w-50" onSubmit={handleSubmit}>
            <div class="col-12">
                <label for="inputName4" class="form-label">Name</label>
                <input type="text" class="form-control" id="inputName4"
                onChange={e => setData({...data,name : e.target.value})} autoComplete='off'/>
            </div>
            <div class="col-12">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" aria-describedby="emailHelp"
                onChange={e => setData({...data,email : e.target.value})} autoComplete='off'/>
            </div>
            <div class="col-12">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4"
                onChange={e => setData({...data,password : e.target.value})} autoComplete='off'/>
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="inputAddress"
                onChange={e => setData({...data,address : e.target.value})} autoComplete='off'/>
            </div>
            <div class="col-12">
                <label for="inputbatch4" class="form-label">Batch</label>
                <input type="number" class="form-control" id="inputbatch4"
                onChange={e => setData({...data,batch : e.target.value})} autoComplete='off'/>
            </div>
            <div class="col-12">
                <label for="inputoutof4" class="form-label">Attendance</label>
                <input type="number" class="form-control" id="inputoutof4"
                onChange={e => setData({...data,outof : e.target.value})} autoComplete='off'/>
            </div>
            <div class="col-12">
                <label for="inputtotal4" class="form-label">Total</label>
                <input type="number" class="form-control" id="inputtotal4"
                onChange={e => setData({...data,total : e.target.value})} autoComplete='off'/>
            </div>
            <div class="col-12 mb-3">
                <label for="inputGroupFile01" class="form-label">Select Image</label>
                <input type="file" class="form-control" id="inputGroupFile01"
                onChange={e => setData({...data,image : e.target.files[0]})}/>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-secondary">Create</button>
            </div>
            
        </form>
    </div>

    
  )
}

export default AddStudent