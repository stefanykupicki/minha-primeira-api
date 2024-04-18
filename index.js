const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem vindo a nossa API!');
});
let usuarios=[];

app.get('/usuarios', (req, res) =>{
    res.json(usuarios);
})

app.post('/usuarios', (req,res) =>{
    const usuario = req.body;
    usuarios.push(usuario);
    res.status(201).json(usuario);
})


app.put('/usuarios/:id', (req,res) =>{
    const id = req.params.id;
    const atualizacao = req.body;
    usuarios = usuarios.map(u => u.id == id ? {...u,...atualizacao}:u);
    res.json({id:id,...atualizacao});
})

app.delete('/usuarios/:id', (req,res) =>{
    const id = req.params.id;
    usuarios = usuarios.filter(u => u.id != id);
    res.status(204).send();
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});