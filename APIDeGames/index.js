const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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


app.listen(3000, ()=>{
    console.log("App runing...");
})