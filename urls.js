const express = require("express");
const router = express.Router();
const pug = require('pug');
const fs = require('fs');
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

function render(template){
	return pug.compileFile('./templates/' + template);
}

router.get("/books/new", (req, res, next) => {
	var context = {
		book: '',
		title: 'Add New Book',
		action: req.path
	}
	res.send(render('new_book.pug')(context));
	next();
});

router.post("/books/new", urlencodedParser, (req, res) => {
	var books = require('./db.json');
	var book = {};
	if (!book){
		books = {books:[], maxId:0};
	}
	book.title = req.body.title;
	book.author = req.body.author;
	book.year = req.body.year;
	book.inStock = true;
	books.maxId ++;
	book.id = books.maxId;
	books.books.push(book);
	fs.writeFile('db.json', JSON.stringify(books), 'utf8', (err)=>{
		if (err) {
			return console.log(err);
		}
	});
	res.redirect('/books/' + book.id);
});

router.get("/books/:id([0-9]{1,})", (req, res) => {
	var books = require('./db.json');
	var id = req.params.id;
	var book = books.books.find(function(e) {
		return e.id == id;
	})
	if (book){
		res.send(render('book.pug')({book: book}));
	}
	else{
		res.status('404');
		res.send('Not Found');
	}
});

router.get("/books/edit/:id([0-9]{1,})", (req, res) => {
	var books = require('./db.json');
	var context = {
		title: 'Edit Book',
		action: req.path
	}
	var id = req.params.id;
	var book = books.books.find(function(e) {
		return e.id == id;
	})
	context.book = book;
	res.send(render('new_book.pug')(context));
});

router.post("/books/edit/:id([0-9]{1,})", urlencodedParser, (req, res) => {
	var books = require('./db.json');
	var id = req.params.id;
	var book = books.books.find(function(e) {
		return e.id == id;
	});
	book.title = req.body.title;
	book.author = req.body.author;
	book.year = req.body.year;
	// context.book = book;
	res.redirect('/books/' + id);
});

router.get("/", (req, res, next)=>{
	var books = require('./db.json');
	// console.log(req.body);
	// books = fs.readFileSync('./db.json');
	// books = JSON.parse(books);
	// console.log(books.books);
	res.send(render('index.pug')({books: books.books}));
	next();
});
router.get("*", (req, res)=>{
	res.status(404);
});

module.exports = router;
