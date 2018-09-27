const express = require('express');
const bodyParser = require('body-parser')
const server = express();
const pug = require('pug');
const urls = require('./urls');
const api = require('./api');
server.set('view engine', 'pug');
server.use(express.static('static'));


server.use("/api/", api);
server.use("/", urls);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.listen(8000);


// server.get('/', (req, res) => {
// 	console.log(render('index.pug')());
// 	res.send(render('index.pug')());
// }).listen(3000);
