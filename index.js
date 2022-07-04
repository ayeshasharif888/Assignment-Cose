const express = require('express');
const app = express();
const pool = require('./db');
app.use(express.json());

app.post("/student", async(req,res)=>{
    try{
        const {fname,address,lname}=req.body;
        const studentData = await pool.query("INSERT INTO STUDENT(fname,address,lname) VALUES($1,$2,$3) returning *", [fname,address,lname]);
        res.json(studentData.rows[0]);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.post("/book", async(req,res)=>{
    try{
        const {title,author,publisher,edition,isbn,price,yearofpub}=req.body;
        const bookData = await pool.query("INSERT INTO BOOK(title,author,publisher,edition,isbn,price,yearofpub) VALUES($1,$2,$3,$4,$5,$6,$7) returning *", [title,author,publisher,edition,isbn,price,yearofpub]);
        res.json(bookData.rows[0]);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.post("/borrow", async(req,res)=>{
    try{
        const {bd,std_id,bk_id,rd}=req.body;
        const borrowData = await pool.query("INSERT INTO BORROW(bd,std_id,bk_id,rd) VALUES($1,$2,$3,$4) returning *", [bd,std_id,bk_id,rd]);
        res.json(borrowData.rows[0]);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.get("/students", async(req,res)=>{
    try{
        const studentData=await pool.query("SELECT * FROM STUDENT");
        res.json(studentData.rows);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.get("/books", async(req,res)=>{
    try{
        const bookData=await pool.query("SELECT * FROM BOOK");
        res.json(bookData.rows);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.get("/borrows", async(req,res)=>{
    try{
        const borrowData=await pool.query("SELECT * FROM BORROW");
        res.json(borrowData.rows);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.get("/mydata", async(req,res)=>{
    try{
        const studentData1=await pool.query("SELECT fname, lname FROM STUDENT");
        res.json(studentData1.rows);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.get("/mydata2", async(req,res)=>{
    try{
        const myData2=await pool.query("SELECT book.title, book.author,student.fname,student.lname, borrow.bd,borrow.rd FROM book inner join borrow on borrow.bk_id=book.id inner join student on borrow.std_id=student.id");
        res.json(myData2.rows);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.put("/student/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const{fname,address,lname}=req.body;
        const studentData = await pool.query("UPDATE STUDENT SET fname=$1,address=$2,lname=$3 where id=$4 returning *",[fname,address,lname,id])
        res.json(studentData.rows[0]);
    }
    catch(error){
        res.status(500).json(error);
    }
})

app.put("/book/:id",async(req,res)=>{
    try{
        const{id}=req.params;
        const{title,author,publisher,edition,isbn,price,yearofpub}=req.body;
        const bookData = await pool.query("UPDATE BOOK SET title=$1,author=$2,publisher=$3,edition=$4,isbn=$5,price=$6,yearofpub=$7 where id=$8 returning *",[title,author,publisher,edition,isbn,price,yearofpub,id])
        res.json(bookData.rows[0]);
    }
    catch(error){
        res.status(500).json(error);
    }
})
app.listen(3000,()=>{
    console.log("server listening in port 3000")
})