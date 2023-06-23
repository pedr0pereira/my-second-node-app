require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

let people = [];
let contador = 1;

// Método POST para criar uma pessoa
app.post('/pessoas', (req, res) => {
  let pessoa = {}
  pessoa.id = contador
  if(req.body.hasOwnProperty('nome') == true) {
    pessoa.nome=req.body.nome
  } else {
    return res.status(400).send({ message: 'Propriedade nome em falta!'}); 
  }
  if(req.body.hasOwnProperty('idade') == true) {
    pessoa.idade=req.body.idade
  } else {
    return res.status(400).send({ message: 'Propriedade idade em falta!'}); 
  }
  if(req.body.hasOwnProperty('genero') == true) {
    pessoa.genero=req.body.genero
  } else {
    return res.status(400).send({ message: 'Propriedade genero em falta!'}); 
  }
  
  people.push(pessoa);
  contador++;
  console.log('Tamanho da lista ' + people.length)
  return res.status(201).send({ 'message': 'Pessoa criada com sucesso' }); 
});

// GET lista de pessoas
app.get('/lista_pessoas', (req, res) => {
  res.json(people);
});

//GET uma pessoa específica pelo ID
app.get('/pessoas/:id', (req, res) => {
  const { id } = req.params;
  const pessoa = people.find((p) => p.id === parseInt(id, 10));
  if (pessoa) {
    res.json(pessoa);
  } else {
    res.status(404).send({ message: 'Pessoa não encontrada' });
  }
});

//PUT
app.put('/pessoas/:id', (req, res) => {
  const { id } = req.params;

  // Verifica se a pessoa existe
  const pessoa = people.find((p) => p.id === parseInt(id, 10));
  if (!pessoa) {
    return res.status(404).send({ message: 'Pessoa não encontrada' });
  }

  // Atualiza os dados da pessoa
  if (req.body.nome) {
    pessoa.nome = req.body.nome;
  }
  if (req.body.idade) {
    pessoa.idade = req.body.idade;
  }
  if (req.body.genero) {
    pessoa.genero = req.body.genero;
  }

  return res.send({ message: 'Dados da pessoa atualizados com sucesso' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
