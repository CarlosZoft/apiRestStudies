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
            res.statusCode(200);
        }
        else{
            res.statusCode = 404;
            res.sendStatus(404);
        }
    }


})




app.listen(3000, ()=>{
    console.log("App runing...");
})