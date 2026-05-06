//Requisitando as bibliotecas necessárias para o projeto
// Const são variaveis constantes (não da para mudar)
const express = require('express');
const cors = require('cors');
const app = express(); 

// Informando as dependencias utilizadas 
app.use(cors());
app.use(express.json());
// Usar essse modelo pq é uma biblioteca, colocar sempre o ; no final 
// Dentro da biblioteca existem mais coisas, por isso o () dentro do ()

// Criando um banco de dados local
let historicoSensores = [
    {id:1,temperatura:25,umidade:50,hora:"10:00"},
    {id:2,temperatura:40,umidade:60,hora:"11:00"},
    {id:3,temperatura:35,umidade:55,hora:"12:00"}

];

app.get('/api/dados', (req,res) => {
    res.json(historicoSensores);
});

app.post('/api/dados', (req,res) => {
    const{temperatura,umidade,hora} = req.body;

    if (!temperatura || !umidade || !hora){return res.status(400).json({mensagem:"Dados incompletos! Verifique novamente"});
    }

    const novosDados = {
        id: historicoSensores.length + 1,
        temperatura,
        umidade,
        hora,
    }
    // para colocar os novos dados dentro do banco de dados
    historicoSensores.push(novosDados);
    res.status(201).json({mensagem:"Dados enviados com sucesso" ,dados:novosDados})
});

const PORT =process.env.use || 3000;
// utilize a porta disponivel ou a 3000
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("servidor com metodo POST")
})