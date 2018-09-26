const express = require('express');
const server = express();
const pug = require('pug');
const urls = require('./urls');
const api = require('./api');
server.set('view engine', 'pug');
server.use(express.static('static'));


server.use("/api/", api);
server.use("/", urls);
server.listen(8000);


// server.get('/', (req, res) => {
// 	console.log(render('index.pug')());
// 	res.send(render('index.pug')());
// }).listen(3000);
