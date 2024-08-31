const Book = require('../models/Book');
const path = require('path');
const fs = require('fs');

//Exibe a pagina de adição de livros
exports.addBookPage = (req, res) => {
    res.render('books/addBook')
};

//Para adicionar um novo livro
exports.addBook = async (req, res) => {
    try{
        const{ title, author, isbn, price } = req.body;
        let.cover = '';

        //se houver uma capa de livro
        if(req.file){
            cover = req.file.filename;
        }

        await Book.create({ title, author, isbn, price, cover });
        req.flash('success_msg', 'Livro adicionado com sucesso!');
        res.redirect('/books');
    }catch (err){
        console.error(err);
        req.flash('error_msg', 'Erro ao adicionar um Livro.');
        res.redirect('/books/add');
    }
};

//Exibir todos os livros
exports.listBooks = async (req, res) => {
    try{
        const books = await Book.findAll();
        res.render('books/listBooks', {books});
    }catch (err) {
        console.error(err);
        req.flash('error_msg', 'Erro ao buscar livros.');
        res.redirect('/');
    }
};