const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

var DB = {

    games : [
        {
            id : 100,
            title : "Fortnite",
            year: 2017,
            price: 0
        },
        {
            id : 50,
            title : "League Of legends",
            year: 2009,
            price: 50
        },
        {
            id : 76,
            title : "Apex Legends",
            year: 2018,
            price: 30
        }
    ],
    users : [
        {
            id : 1,
            nome : "Carlos Rafael",
            email : "carlosoftwar@gmail.com",
            password : "nodemonstart1"
        },
        {
            id : 2,
            name : "Rafael Carlos",
            email : "carlosk2gunn@gmail.com",
            password : "nodemonstart2"
        }
    ]

}
app.get("/games",(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);

})
app.get("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.statusCode = 400;
        res.sendStatus(400);
    }
    else{
        var id = parseInt(req.params.id);
        const game = DB.games.find(game => game.id == id);
        if(game != undefined) {
            res.statusCode = 200;
            res.json(game);
        }
        else{
            res.statusCode = 404;
            res.sendStatus(404);
        }
    }
})

app.post("/game", (req,res) => {
     
    var {title,price,year} = req.body;
    if(title != undefined && price != undefined && year != undefined){
        
        DB.games.push({
            id: 4237,
            title,
            year,
            price
        }
        );
        res.statusCode = 200;
        res.sendStatus = (200);
    }
    else{
        res.statusCode = 406;
        res.sendStatus(406);
    }
})

app.delete("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.statusCode = 400;
        res.sendStatus(400);
    }
    else{
        var id = parseInt(req.params.id);
        const index = DB.games.findIndex(game => game.id === id);
        if(index < 0){
            res.statusCode = 404;
            res.sendStatus(404);
        }
        else{
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
})
app.put("/game/:id", (req,res)=>{
    if(isNaN(req.params.id)){
        res.statusCode = 400;
        res.sendStatus(400);
    }
    else{
        var id = parseInt(req.params.id);
        const game = DB.games.find(game => game.id == id);
        if(game != undefined) {
           
            var {title,price,year} = req.body;
            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }
            res.sendStatus(200);
            res.statusCode = 200;
        }
        else{
            res.statusCode = 404;
            res.sendStatus(404);
        }
    }


})

app.post("/auth", (req,res)=>{
    var {email,password} = req.body;

    if(email != undefined || password != undefined){

       var user = DB.users.find(user => user.email == email);

       if(user != undefined){
        if(user.password == password){
            res.status(200);
            res.json({token : "Token Falso"})
         }
         else{
            res.status(401);
             res.json("Password incorreta");
         }
       }
       else{
          res.status(404);
          res.json("Email incorreto")
       }
    }
    else{
        res.status(400);
        res.json({err : "E-mail/Password inválido"})
    }
})



app.listen(3000, ()=>{
    console.log("App runing...");
})