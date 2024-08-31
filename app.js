// app.js
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Configurações
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de sessão e flash
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());

// Middleware para mensagens globais
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Conectando ao banco de dados
sequelize
  .authenticate()
  .then(() => console.log('Conectado ao banco de dados MySQL'))
  .catch(err => console.log('Erro ao conectar ao banco de dados: ' + err));

sequelize.sync();

// Root route
app.get('/', (req, res) => {
    res.render('layouts/main'); 
  });

app.get('/books/add', (req, res) => {
  res.render('/books/add');
})

app.get('/books/add', (req, res) => {
  res.render('/books/add');
})

// Rotas
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
