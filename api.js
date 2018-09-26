const express = require("express");
const router = express.Router();

var books = require('./db.json');

router.delete("/books/remove/:id", (req, res, next) => {
	var id = req.params.id;
	var book = books.books.find(function(e) {
		return e.id == id;
	});
	console.log(book);
	res.send('deleted');
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
	console.log(books.books);
	res.send(render('index.pug')({books: books.books}));
	next();
});
router.get("*", (req, res)=>{
	res.status(404);
});

module.exports = router;
