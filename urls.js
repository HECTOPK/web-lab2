const express = require("express");
const router = express.Router();
const pug = require('pug');

var books = require('./db.json');

function render(template){
	return pug.compileFile('./templates/' + template);
}

router.get("/books/new", (req, res, next) => {
	res.send(render('new_book.pug')());
	next();
});

router.get("/books/:id", (req, res, next) => {
	var id = req.params.id;
	var book = books.books.find(function(e) {
		return e.id == id;
	})
	res.send(render('book.pug')({book: book}));
	next();
});
router.get("/", (req, res, next)=>{
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
