const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem vindo a nossa API!');
});

const SECRET_KEY = 'seu_super_secreto';

app.post('/login', (req, res) => {
    const{usuario, senha} = req.body;

    if(usuario === 'admin' && senha === 'senha123') {
        const token = jwt.sign({userId:usuario}, SECRET_KEY, {expiresIn:'1h'});
        res.json({token});
    }
    res.status(401).send('Credenciais Inválidas!');
})

app.get('/dados-protegidos', (req, res) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).send('Acesso negado.');
    }
    try { 
        const verificado = jwt.verify(token, SECRET_KEY);
        req.usuario = verificado;

        res.send('Acesso liberado!');
    }catch(error){
        return res.status(400).send('Token inválido.');
    }
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});