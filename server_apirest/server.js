const express = require('express');
const app = express();


// Verbos HTTP 

// GET  Receber dados de um Resource.
// POST Enviar dados ou informações para serem processados por um Resource.
// PUT  Atualiazar dados de um Resource
// DELETE   Deletar dados de um Resource

app.get("/clients",);
app.get("/clients/:id",);
app.post("/clients",);
app.put("/clients/:id",);
app.delete("/clients/:id",);


app.listen(3333, () => {
    console.log("Server On");
});
