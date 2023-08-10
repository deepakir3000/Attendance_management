import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditStudent() {

    const [data,setData] = useState({
        name : '',
        email : '',
        address : '',
        batch: '',
    })

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:8085/get/`+id)
        .then(res =>{
            setData({...data, name: res.data.Result[0].name,
                email: res.data.Result[0].email,
                address: res.data.Result[0].address,
                batch: res.data.Result[0].batch,
            })
        })
        .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.put('http://localhost:8085/update/'+ id, data)
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
                <label for="inputName4" class="form-label">Name</label>
                <input type="text" class="form-control" id="inputName4"
                onChange={e => setData({...data,name : e.target.value})} value={data.name}/>
            </div>
            <div class="col-12">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" aria-describedby="emailHelp"
                onChange={e => setData({...data,email : e.target.value})} value={data.email}/>
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input type="text" class="form-control" id="inputAddress"
                onChange={e => setData({...data,address : e.target.value})} value={data.address}/>
            </div>
            <div class="col-12">
                <label for="inputbatch4" class="form-label">Batch</label>
                <input type="number" class="form-control" id="inputbatch4"
                onChange={e => setData({...data,batch : e.target.value})} value={data.batch}/>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-secondary">Update</button>
            </div>
            
        </form>
    </div>

    
  )
}

export default EditStudent