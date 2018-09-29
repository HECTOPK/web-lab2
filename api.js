const express = require("express");
const fs = require('fs');
const router = express.Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/books", (req, res) => {
	console.log(req.query);
	var onlyInStock = req.query.onlyInStock;
	var filterBydate = req.query.filterBydate;
	var books = require('./db.json').books;
	if (onlyInStock != 'false') {
		books = books.filter((e)=>{
			return e.inStock == true;
		});
	}
	if(filterBydate != 'false'){
		books = books.filter((e)=>{
			return e.date == filterBydate;
		});
	}
	console.log(books);
	res.send(JSON.stringify(books));
});

router.delete("/books/remove/:id", (req, res) => {
	var books = require('./db.json');
	var id = req.params.id;
	books.books = books.books.filter(function(e) {
		return e.id != id ;
	});
	fs.writeFile('db.json', JSON.stringify(books), 'utf8', (err)=>{
		if (err) {
			return console.log(err);
		}
	});
	res.send('deleted');
});

router.post('/books/:id([0-9]{1,})/give_away', urlencodedParser, (req, res) => {
	var books = require('./db.json');
	var id = req.params.id;
	var book = books.books.find(function(e) {
		return e.id == id;
	});
	console.log(req.body);
	book.customer = req.body.name;
	book.date = req.body.date;
	book.inStock = false;
	console.log(book);
	fs.writeFile('db.json', JSON.stringify(books), 'utf8', (err)=>{
		if (err) {
			return console.log(err);
		}
	});
	res.send('updated');
});

router.put('/books/:id([0-9]{1,})/return_book', urlencodedParser, (req, res) => {
	var books = require('./db.json');
	var id = req.params.id;
	var book = books.books.find(function(e) {
		return e.id == id;
	});
	book.inStock = true;
	fs.writeFile('db.json', JSON.stringify(books), 'utf8', (err)=>{
		if (err) {
			return console.log(err);
		}
	});
	res.send('updated');
});

module.exports = router;
