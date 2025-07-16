const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;
  const html = `
    <html>
      <head><title>Obrigado!</title></head>
      <body>
        <h1>Obrigado, ${nome}!</h1>
        <p>Recebemos sua sugestão com os ingredientes: <strong>${ingredientes}</strong>.</p>
        <a href="/">Voltar para o início</a>
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  const html = `
    <html>
      <head><title>Contato Recebido</title></head>
      <body>
        <h1>Obrigado pelo contato, ${nome}!</h1>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong> ${mensagem}</p>
        <a href="/">Voltar para o início</a>
      </body>
    </html>
  `;
  res.send(html);
});

app.get('/api/lanches', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ erro: 'Erro ao ler os dados dos lanches.' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
