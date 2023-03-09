import express, {Request, Response}from 'express';
import fs from 'fs'; 
import mysql from 'mysql2';
import excel from 'xlsx';
import nodemailer from 'nodemailer';

import path from 'path';
var jwt = require('jsonwebtoken');


const { Transform } = require('stream');
const { resourceUsage } = require('process');


var workbook = excel.readFile("data/facultati.xlsx");

const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

const db = mysql.createConnection({
    host : "localhost",
    port: 3306,
    user : "root",
    password : "Mugly11@",
    database : "victordb",
})

db.connect((err:any)=>{
    if(err){
        throw "ceva"+ err;
    }
    console.log('MySql Connected');
    //bTag = true;
});

let options = {};

app.use(express.static("css",options));
app.use(express.static("js",options));
app.use(express.static("imagini",options));
app.use(express.static('public'));

app.use('/selectare', express.static("css",options));
app.use('/selectare', express.static("js",options));
app.use('/selectare', express.static("imagini",options));

app.use('/prezentare', express.static("css",options));
app.use('/prezentare', express.static("js",options));
app.use('/prezentare', express.static("imagini",options));


app.use('/comment', express.static("css",options));
app.use('/comment', express.static("js",options));
app.use('/comment', express.static("imagini",options));

app.use('/forum', express.static("css",options));
app.use('/forum', express.static("js",options));
app.use('/forum', express.static("imagini",options));

app.get('/', function(req:Request,res:Response){
    fs.readFile('./html/Exemplu.html',null, (error:any,data:any) => {
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }else{
            res.write(data);
        }
        res.end();
    });
    console.log('ceva');
});


app.get('/selectare/:index/get_info', function(req:any,res:any){ 
    var facultate = ['UPB','UNIBUC','ASE'];
    var index = parseInt(req.params.index)-1;

    db.query("SELECT * FROM facultati", function (err:any, result:any, fields:any) {
       //^cc console.log(result);
        
        
        const filtredItems = result.filter((item:any) =>{
            return item.facultate === facultate[index];
        })

        /*
        //console.log(filtredItems);
        const numeFacultati = filtredItems.map((item) =>{
            return item.nume;
        })
        const idFacultati = filtredItems.map((item) =>{
            return item.id;
        })
        
        const data ={
            idFacultati: idFacultati, 
            numeFacultati : numeFacultati,
            length : filtredItems.length
        }
        */
        const data ={
            idFacultati: 0, 
            numeFacultati : 0,
            length : 0
        }
        //console.log(data)
        
        res.send(data);        
    })
    

    // <--- Inserarea de informatii in db prin folosirea excelului --->
    /*
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let info =[]
    let i = 0;
    for(let cell in worksheet){
        const cellAsString=cell.toString();
        //console.log(cellAsString)
        if(cellAsString[1]!=='r' && cellAsString!=='m' && cellAsString[1]>1){
            if(cellAsString[0]>='A' && cellAsString[0]<='F'){
                info.push(worksheet[cell].v);   i++;
            }   
            if(i==6){            
                var Q='';
                info[0]=info[0].toString()
                info[5]=info[5].toString()
                Q = "INSERT INTO facultati(nume,cadrul_facultatii,descriere,poza,rating) VALUES ('" 
                + info[1] + "','" + info[2] + "','"  + info[3] + "','"  + info[4] + "',"  + info[5] + ")";

                db.query(Q, function (err, result, fields) {
                    if(err)return err;
                })
            
                info=[];
                i=0;
            }
        }
    }
    */

});


app.get('/selectare/*',function(req:any,res:any){

    fs.readFile('./html/Selectare.html',null, (error:any,data:any) => {
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }else{
            res.write(data);
        }
        res.end();
    });
    
});

app.get('/prezentare/:id/get_info',function(req:any,res:any){
    var Q = `SELECT * FROM facultati WHERE id='${req.params.id}'`;
   
    db.query(Q,function (err:any, result:any, fields:any) {
        if(err){
            res.writeHead(404);
            res.write('S-a produs o eroare');
        }else res.send(result);
    })
});

app.get('/prezentare/*', function(req:any,res:any){
    fs.readFile('./html/Prezentare.html',null, (error:any,data:any) => {
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }else{
            res.write(data);
        }
        res.end();
    });
});

app.get('/forum/:id/get_info',function(req:any,res:any){
    var Q = `SELECT * FROM facultati WHERE id='${req.params.id}'`;
    db.query(Q,function (err:any, result:any, fields:any) {
        if(err){
            res.writeHead(404);
            res.write('S-a produs o eroare');
        }else res.send(result);
    })
});

app.get('/forum/:id/get_comm',function(req:any,res:any){

    var Q = `SELECT * FROM users WHERE cod_facultate='${req.params.id}'`;
    db.query(Q,function (err:any, result:any, fields:any) {
        if(err){
            res.writeHead(404);
            res.write('S-a produs o eroare');
        }else {
            res.send(result);
        }
    })
});



app.get('/forum/*', function(req:any,res:any){
    fs.readFile('./html/Forum.html',null, (error:any,data:any) => {
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }else{
            res.write(data);
        }
        res.end();
    });
});

app.post('/comment/:id/upload', async function(req:any,res:any){
    
    let Q = `INSERT INTO users (nume,email,password) VALUES ("${req.body.nume}","${req.body.email}","${req.body.password}")`;
    db.query(Q,function (err:any, result:any, fields:any) {
        if(err){
            throw err;
            res.writeHead(404);
            res.write('S-a produs o eroare');
        }else{
            res.send({
                status :'s-a trimis',
            });
        }
    });

    
    /*
    let transporter = nodemailer.createTransport({
        service:'yahoo',
        port: 25,
        secure: true,
        auth: {
            user: 'bucurestiiloveyou@yahoo.com',
            pass: 'nszzqdrqaeqkqvmz',
        }
    });

    let mailOptions = {
        from : 'bucurestiiloveyou@yahoo.com',
        to: 'surfer_haihui@yahoo.com',
        subject : 'Hello!',
        text: 'Ceva important'
    }
    transporter.sendMail(mailOptions,(err:any,info:any)=>{
        if(err)console.log(err)
        else; //console.log(info.response)
    })

    res.end();
    */
});

app.get('/comment/*', function(req:any,res:any){
    fs.readFile('./html/comment.html',null, (error:any,data:any) => {
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }else{
            res.write(data);
        }
        res.end();
    });
});



app.get('/status',function(req:any,res:any){
    fs.readFile('./html/status.html',null, (error: any,data:any) => {
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }else{
            res.write(data);
        }
        res.end();
    });
});


app.get('/tabel',function(req:any,res:any){
    res.write('<html><head><link rel="stylesheet" href="Exemplu.css"></head><body>');    
    fetchData(res);
});

app.listen(80);

function fetchData(res:any){

    var tab = "<table>"; 

    db.query("SELECT * FROM situatie_bac", function (err:string, result:any, fields:any) {

        if (err) throw err;
        //console.log(result[0].nume);
        //res.write((result));
        //nume = result[0].prenume;
        for (var row in result){
            tab = tab + "<tr>";
            for (var column in result[row]){
                tab = tab + "<td>" + result[row][column]+ "</td>" ;
            }
            tab = tab + "</tr>";
        }
        tab = tab + "</table>";
        //console.log(fields);
        res.write(tab);
        //console.log(tab);
        //return tab;
        res.write('</body></html>');
        res.end();
    });

    //return tab;
    //console.log(tab);
}
