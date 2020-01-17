const express = require('express');
const mysql = require('mysql');

//express setup
const app = express();
//create connection to SQL

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'password',
    database :'nodemysql'
}
);

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("MySql connected ...");
});




//RUN CREATE ONLY ONCE. IF YOU TRY TO CREATE A NEW DATABASE WHEN IT ALREADY EXIST IT WILL GIVE ERROR
//Create Database
// app.get('/createdb', (req,res) =>{
//     let sql = 'CREATE DATABASE nodemysql';
//     db.query(sql, (err, result) =>{
//         if(err) throw err;
//         res.send('database created ...');
//         console.log(result);
//     });
// });

//Create POST Table
app.get('/createposttable', (req, res) =>{
    let sql = 'CREATE TABLE post(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result)=>{
        if(err) {
            throw err;
    }
        console.log(result)
        res.send('POST TABLE CREATED ...');

    });
});

//Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title:'POST One', body:'Tis is the first post'};
    let sql = 'INSERT INTO post SET ?';
    let query = db.query(sql,post,(err,result)=>{
        if(err) {
        
        throw err;
        }
        console.log(result);
        res.send('First post successfully added...');

    });

});
//Select All posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM post';
    let query = db.query(sql,(err,results)=>{
        if(err) {
        
        throw err;
        }
        console.log(results);
        res.send('POSTS SELECTED');

    });

});

//Select one specific post

app.get('/getpost/:id',(req,res) =>{
    let sql = `SELECT * FROM post WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);

    });



});

//Update post
app.get('/updatepost/:id',(req,res) => {
    let update = 'Updated TITLE';
    let sql = `Update post SET title = '${update}' WHERE id = ${req.params.id}`;
    let query = db.query(sql,(err,result) => {
        if(err) throw err;
        console.log(result);
        res.send('Title Updated');

    });


});

// DELETE POST

app.get('/deletepost/:id',(req,res) =>{
    let sql = `DELETE FROM post WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result);

    });



});

app.listen('3000' , () =>{
    console.log("Server started on port 3000");
});



