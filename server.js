require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY; // Em produção, use variável de ambiente

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// "Banco de dados" em memória
const usuarios = [];

// Rota de registro
app.post('/registro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (usuarios.find(user => user.email === email)) {
    return res.status(400).json({ mensagem: 'Email já registrado' });
  }

  usuarios.push({ nome, email, senha });
  res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ email: usuario.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Middleware para verificar token
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
    }

    req.usuario = usuario;
    next();
  });
}

// Rota protegida
app.get('/musicas', verificarToken, (req, res) => {
  const musicas = [
    "Bohemian Rhapsody - Queen",
    "Imagine - John Lennon",
    "Hotel California - Eagles",
    "Smells Like Teen Spirit - Nirvana"
  ];

  res.json(musicas);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
