const express = require('express');
const app = express();
const data = require('./data');


// Verbos HTTP 

// GET  Receber dados de um Resource.
// POST Enviar dados ou informações para serem processados por um Resource.
// PUT  Atualiazar dados de um Resource
// DELETE   Deletar dados de um Resource

app.use(express.json());


app.get("/clients",(req,res)=>{
    res.json(data);
});

app.get("/clients/:id",(req,res)=>{
    const id = req.params.id;
    const client = data.find(cliente => cliente.id == id);
    if(client)res.json(client);
    else res.status(204).json();
        
});

app.post("/clients",(req,res)=>{
    const {name , email} = req.body;
    
    //salvar
  
    req.json({name, email});
});

app.put("/clients/:id",(req,res)=>{
    const id = req.params.id;
    const client = data.find(cliente => cliente.id == id);
    
    if(client){
        const {name} = req.body;
        client.name = name;
        res.json(client);
    }
    else res.status(204).json();

});
app.delete("/clients/:id",(req,res)=>{
    const id = req.params.id;
    const clientFiltered = data.filter(cliente => cliente.id != id);

    res.json(clientFiltered);

});

app.listen(3333, () => {
    console.log("Server On");
});
