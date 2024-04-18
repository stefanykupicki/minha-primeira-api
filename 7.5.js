// middleware de logging

const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log(`[${new Date().toString()}] ${req.method} ${req.url}`);
    next();
})

const authenticate = (req, res, next) => { 
    const authToken = req.headers.authorization;

    if(authToken == '123456'){
        next();
    }
    res.status(401).send('Não autorizado.');
}

app.get('/secure', authenticate, (req, res)=>{
    res.send('Rota segura!');
})

app.get('/', (req, res) => { 
    res.send('Olá');
});

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000!");
})