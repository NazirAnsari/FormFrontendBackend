const mysql = require('mysql2');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


const path = require("path");
app.use(express.static(path.join(__dirname, "../Frontend")));

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"form",
    password:"naziransari"
})
con.connect((err)=>{
    if(err)
        console.log(err);
    else
        console.log('Database Connected!!')
})

app.get('/',(req,res)=>{
    console.log('html called !!');
    res.sendFile(__dirname + '../Frontend/index.html');
});


app.get('/viewUser',(req,res)=>{
 con.query(
    'SELECT * from iwell_form',(error,row)=>{
        if(error){
            return console.log(error);
        }
        else{
            console.log(row)
        }
    }
 )
})


app.post('/newuser',(req,res)=>{
    const newUser = req.body;
    console.log(newUser);

    var name = newUser.userName; //UserName is value of form which u used in form.js file
    var email = newUser.userEmail;
    var password = newUser.userPass;
    var cpassword = newUser.cUserPass;
    
    console.log(name + " name is ");
    con.query(
            'INSERT into iwell_form(name,email,password,cpassword)values("'+name+'","'+email+'","'+password+'","'+cpassword+'")',
             function(err,result){
            if(err){
                return console.log(err);
            }
            console.log("Records inserted: "+result.affectedRows);
            console.log(result);
     })
    // res.send("Signup Successfull !!");
});

// app.use(express.static('gabbar'));
// app.get("/user/fetch", function(req,res){
//     con.query("select * from users",
//     function(err,results,fields){
//         if(err) throw err;
//         console.log(results);
//         res.send(results);
//     })
// })

// app.get("/user/login", function(req,res){
    
// })

// app.put("/user/update", function(req,res){
//     var data = req.get.body();
//     var sql = "update users set fname='ishan' where fname='yougank'";
//     var value=[
//         []
//     ]
// })

// app.patch("/user/update_single", function(req,res){
//     var data = req.get.body();
//     var sql = `update users set $"k" = $"v" where userId = $"u"` ;
// })

// app.delete("/user/del", function(req,res){
//     const id = req.params.id;
//     // const id = 1;
//     var sql= `delete from users where userId = "${id}"`;
//     con.query(sql, function(err,result){
//         if(err) throw err;
//         console.log("Row deleted: "+result.affectedRows);
//         res.send(result);
//     })
// })
app.patch('/',(req,res)=>{
    var user = req.body;
    mysql_con.query(`update user set user_id = '${user.Personid}' where user_id= 2`,[user],(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows)
        }
    })
})

app.listen(3000,()=>console.log("Server is running on port 3000"))
