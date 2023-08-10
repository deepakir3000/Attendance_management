import React from 'react';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Student from './Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import Start from './Start';
import StudentDetail from './StudentDetail';
import StudentLogin from './StudentLogin';
import UpdateAttendance from './UpdateAttendance';

function App() {
  return (
    <BrowserRouter>

    <Routes>
        <Route path='/' element={<Dashboard/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='/student' element={<Student/>}></Route>
          <Route path='/create' element={<AddStudent/>}></Route>
          <Route path='/studentEdit/:id' element={<EditStudent/>}></Route>
          <Route path='/updateattendance/:id' element={<UpdateAttendance/>}></Route>
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/start' element={<Start/>}></Route>
        <Route path='/studentlogin' element={<StudentLogin/>}></Route>
        <Route path='/studentdetail/:id' element={<StudentDetail/>}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
