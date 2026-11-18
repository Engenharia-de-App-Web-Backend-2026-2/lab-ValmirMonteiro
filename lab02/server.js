const express = require('express');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const app = express();
const port = process.env.PORT || 4000;
const message = process.env.APP_MESSAGE || "Mensagem padrão";

app.get('/', (req, res) => {
  res.send('Aula de Backend - Lab 02');
});

app.get("/info", (req, res) => {
    res.send(`${message}`);
});

app.get('/aviso', async (req, res) => {
  const aviso = await readFile(path.join(__dirname, 'dados', 'aviso.txt'), 'utf8');
  res.send(`${aviso.toString()}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});