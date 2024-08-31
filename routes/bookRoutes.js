// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const multer = require('multer');

// Configurando multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rotas de livro
router.get('/addBook', bookController.addBookPage);
router.post('/add', upload.single('cover'), bookController.addBook);
router.get('/', bookController.listBooks);

module.exports = router;
