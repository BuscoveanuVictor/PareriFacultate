"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const { Transform } = require('stream');
const { resourceUsage } = require('process');
const excel = require('xlsx');
const nodemailer = require("nodemailer");
var workbook = excel.readFile("data/facultati.xlsx");
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mugly11",
    database: "victordb",
});
db.connect((err) => {
    if (err) {
        throw "ceva" + err;
    }
    console.log('MySql Connected');
    //bTag = true;
});
let options = {};
app.use(express.static("css", options));
app.use(express.static("js", options));
app.use(express.static("imagini", options));
app.use(express.static('public'));
app.use('/selectare', express.static("css", options));
app.use('/selectare', express.static("js", options));
app.use('/selectare', express.static("imagini", options));
app.use('/forum', express.static("css", options));
app.use('/forum', express.static("js", options));
app.use('/forum', express.static("imagini", options));
app.use('/comment', express.static("css", options));
app.use('/comment', express.static("js", options));
app.use('/comment', express.static("imagini", options));
app.get('/', function (req, res) {
    fs.readFile('./Exemplu.html', null, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
        }
        res.end();
    });
});
app.get('/selectare/:index/get_info', function (req, res) {
    var facultate = ['UPB', 'UNIBUC', 'ASE'];
    var index = parseInt(req.params.index) - 1;
    db.query("SELECT * FROM facultati", function (err, result, fields) {
        //^cc console.log(result);
        const filtredItems = result.filter((item) => {
            return item.facultate === facultate[index];
        });
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
        const data = {
            idFacultati: 0,
            numeFacultati: 0,
            length: 0
        };
        //console.log(data)
        res.send(data);
    });
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
app.get('/selectare/*', function (req, res) {
    fs.readFile('./Selectare.html', null, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
        }
        res.end();
    });
});
app.get('/forum/:id/get_info', function (req, res) {
    let id = parseInt(req.params.id);
    var Q = "SELECT * FROM facultati WHERE id=" + id;
    db.query(Q, function (err, result, fields) {
        res.send(result);
    });
});
app.get('/forum/*', function (req, res) {
    fs.readFile('./Forum.html', null, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
        }
        res.end();
    });
});
app.post('/comment/:id/upload', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer.createTransport({
            service: 'yahoo',
            port: 25,
            secure: true,
            auth: {
                user: 'bucurestiiloveyou@yahoo.com',
                pass: 'nszzqdrqaeqkqvmz',
            }
        });
        let mailOptions = {
            from: 'bucurestiiloveyou@yahoo.com',
            to: 'surfer_haihui@yahoo.com',
            subject: 'Hello!',
            text: 'Ceva important'
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.log(err);
            else
                console.log(info.response);
        });
        res.end();
    });
});
app.get('/comment/*', function (req, res) {
    fs.readFile('./comment.html', null, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
        }
        res.end();
    });
});
app.get('/status/*', function (req, res) {
    fs.readFile('./status.html', null, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
        }
        res.end();
    });
});
app.get('/tabel', function (req, res) {
    res.write('<html><head><link rel="stylesheet" href="Exemplu.css"></head><body>');
    fetchData(res);
});
app.listen(80);
function fetchData(res) {
    var tab = "<table>";
    db.query("SELECT * FROM situatie_bac", function (err, result, fields) {
        if (err)
            throw err;
        //console.log(result[0].nume);
        //res.write((result));
        //nume = result[0].prenume;
        for (var row in result) {
            tab = tab + "<tr>";
            for (var column in result[row]) {
                tab = tab + "<td>" + result[row][column] + "</td>";
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
//# sourceMappingURL=app.js.map