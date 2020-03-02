let express = require('express');
let app=express();
let server=require('http').createServer(app);
let bodyParser = require('body-parser');
const mysql = require("mysql2");

server.listen(3000);

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb2",
    password: "root"
  });
  
  connection.connect(function(err){
     if (err) {
       return console.error("Ошибка: " + err.message);
     }
     else{
       console.log("Подключение к серверу MySQL успешно установлено");
     }
  });

//get 

app.get('/',function(req,res){
    res.sendFile(__dirname + '/home.html');
});

app.get('/features',function(_req,res){
 res.sendFile(__dirname+'/features.html');
});

app.get('/contact',function(req,res){
    res.sendFile(__dirname + '/contact.html');
   });

app.get('/',function(req,res){
    res.sendFile(__dirname + '/home.html');
});

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/registration',function(req,res){
  res.sendFile(__dirname + '/registration.html');
});

app.post("/register", urlencodedParser, function (request, response) {
  let emailAdress;
  let phoneNumber;
  if(!request.body) return response.sendStatus(400);
  console.log(request.body);

  emailAdress=request.body.emailAdress;
  phoneNumber=request.body.phoneNumber;
  
  const sql = "INSERT INTO users (name, age) VALUES (?,?)";
  const filter=[emailAdress,phoneNumber];

  connection.query(sql, filter, function(err, results) {
    if(err) console.log(err);
    console.log(results);
}); 
    
  response.sendFile(__dirname + '/sucRegister.html');
});

app.get('/h',function(req,res){
  res.sendFile(__dirname + '/sucRegister.html');
});


//SQL
