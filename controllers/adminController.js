// controllers/adminController.js
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Exibe a página de registro
exports.registerPage = (req, res) => {
  res.render('admin/register');
};

// Processa o registro do admin
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashedPassword });
    req.flash('success_msg', 'Administrador registrado com sucesso!');
    res.redirect('/admin/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Erro ao registrar administrador.');
    res.redirect('/admin/register');
  }
};

// Exibe a página de login
exports.loginPage = (req, res) => {
  res.render('admin/login');
};

// Processa o login do admin
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se o administrador existe
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      req.flash('error_msg', 'Nome de usuário ou senha inválidos.');
      return res.redirect('/admin/login');
    }

    // Compara a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      req.flash('error_msg', 'Nome de usuário ou senha inválidos.');
      return res.redirect('/admin/login');
    }

    // Se a senha corresponder, cria uma sessão para o administrador
    req.session.admin = admin;
    req.flash('success_msg', 'Você está logado com sucesso!');
    res.redirect('/books/addBook'); // Redirecione para o dashboard ou outra página segura

  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Erro ao fazer login. Por favor, tente novamente.');
    res.redirect('/admin/login');
  }
};

// Faz logout do admin
exports.logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      req.flash('error_msg', 'Erro ao fazer logout.');
      return res.redirect('/admin/dashboard');
    }
    req.flash('success_msg', 'Você saiu com sucesso!');
    res.redirect('/admin/login');
  });
};
