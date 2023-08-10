import express, { response } from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import { error } from 'console'


//Port

const port =8085;


// middleware

const app = express();
app.use(cors(
    {
        origin: ['http://localhost:5173'],
        methods: ["POST", "GET", "PUT", "DELETE"],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


//Mysql connection

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "deepak",
    database: "attendance"
})


//File Upload Connectivity

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'public/images')
    },
    filename : (req, file , cb) =>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage : storage
})

con.connect(function(err) {
    if (!err) {
        console.log("Connected to MySQL database");
    } else {
        console.error("Error in MySQL connection:", err);
    }
});


//Create Cookies

const verifyUser = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error : "You are not Authenticated"});
    }
    else{
        jwt.verify(token, "jwt-secret-key", (err,decoded) => {
            if(err){
                return res.json({Error: "Wronk Token"});
            }
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        })
    }
}

app.get('/dashboard', verifyUser, (req,res) => {
    return res.json({Status: "Success", role: req.role, id: req.id});
})


//Dashboard API

app.get('/adminCount', (req,res) =>{
    const sql = "SELECT COUNT(id) as admin FROM users";
    con.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error in running query"});
        }
        return res.json(result);
    })
})

app.get('/studentCount', (req,res) =>{
    const sql = "SELECT COUNT(id) as student FROM students";
    con.query(sql, (err, result) => {
        if(err){
            return res.json({Error: "Error in running query"});
        }
        return res.json(result);
    })
})


//CRUD Operation for Admin

app.post('/login',(req,res)=>{
    const sql = "SELECT * FROM users where email = ? AND password = ?";
    con.query(sql,[req.body.email, req.body.password], (err,result)=>{
        if(err){
            return res.json({Status : "Error", Error: "Error in running query"});
        }
        if(result.length > 0){
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn : '1d'});
            res.cookie('token',token);
            return res.json({Status : "Success"});
        }
        else{
            return res.json({Status : "Error", Error: "Wrong Email or Password"});
        }
    })

})

app.get('/logout', (req,res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

//All Admin

app.get('/getAdmin', (req,res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err,result) => {
        if(err){
            return res.json({Error: "Get userss error in mysql"});
        }
        return res.json({Status: "Success", Result: result})
    })
})

app.post('/create',upload.single('image'), (req,res) =>{
    const sql = "INSERT INTO students (`name`,`email`,`password`,`address`,`batch`,`outof`,`total`,`image`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(),10, (err,hash) =>{
        if(err){
            return res.json({Error: "Error in hashing password"});
        }
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.batch,
            req.body.outof,
            req.body.total,
            req.file.filename
        ]
        con.query(sql,[values], (err,result) =>{
            if(err){
                return res.json({Error: "Error in signup"});
            }
            return res.json({status: "Success"});
        })
    })
})

app.get('/getStudents', (req,res) => {
    const sql = "SELECT * FROM students";
    con.query(sql, (err,result) => {
        if(err){
            return res.json({Error: "Get students error in mysql"});
        }
        return res.json({Status: "Success", Result: result})
    })
})


app.get('/get/:id', (req,res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students where id = ?";
    con.query(sql,[id], (err,result) => {
        if(err){
            return res.json({Error: "Get students error in mysql"});
        }
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/update/:id', (req,res) => {
    const id = req.params.id;
    const sql = "UPDATE students SET name = ?,email = ? ,address = ?,batch =? WHERE id = ?";
    con.query(sql,[req.body.name,
        req.body.email,
        req.body.address,
        req.body.batch,
        id], (err,result) => {
        if(err){
            return res.json({Error: "Update students error in mysql"});
        }
        return res.json({Status: "Success"})
    })
})


app.put('/updateattendance/:id', (req,res) => {
    const id = req.params.id;
    const sql = "UPDATE students SET outof = ?,total=? WHERE id = ?";
    con.query(sql,[
        req.body.outof,
        req.body.total, 
        id], (err,result) => {
        if(err){
            return res.json({Error: "Update students attendance error in mysql"});
        }
        return res.json({Status: "Success"})
    })
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    const sql = "DELETE FROM students WHERE id = ?";
    con.query(sql,[id], (err,result) => {
        if(err){
            return res.json({Error: "Delete students error in mysql"});
        }
        return res.json({Status: "Success"})
    })
})


//Student Login

app.post('/studentlogin',(req,res)=>{
    const sql = "SELECT * FROM students where email = ?";
    con.query(sql,[req.body.email], (err,result)=>{
        if(err){
            return res.json({Status : "Error", Error: "Error in running query"});
        }
        if(result.length > 0){
            bcrypt.compare(req.body.password.toString(), result[0].password, (err,response) =>{
                if(response){
                    const token = jwt.sign({role: "student", id: result[0].id}, "jwt-secret-key", {expiresIn : '1d'});
                    res.cookie('token',token);
                    return res.json({Status : "Success", id: result[0].id});
                }
                else{
                    return res.json({Error: "Password error"});
                }
            })
        }
        else{
            return res.json({Status : "Error", Error: "Wrong Email or Password"});
        }
    })
})


//Connection for express server

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})