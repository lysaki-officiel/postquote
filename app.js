var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var port = 3000;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/home', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

var posts = [];
var users = [];

app.get('/posts', (req, res) => {
	console.log("posts requested");
	res.send(posts);
	});
;
app.post('/postafic', (req,res) => {
		console.log('postafic');
		console.log(req.body);
		let today = new Date();
		let date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
		posts.unshift({
			title: req.body.title,
			content: req.body.content,
			author: req.body.author,
			date: date,
		})
		res.send(posts);
})

app.post('/register', (req,res) => {
	console.log('resgister');
	let message = '';
	let data = req.body;
	users.forEach((user) => {
		if (data.username == user.username)
			message = "Eusername";
	});
	users.push({
		username : data.username,
		password : data.password
	})
	res.send(message == '' ? "Success" : message);
});

app.post('/login', (req,res) => {
	console.log('login');
	let data = req.body;
	let message = '';
	console.log(data);
	users.forEach((user) => {
		if (data.username == user.username && data.password == user.password)
			message = "Success";
		if (data.username == user.username && data.password != user.password)
			message = "Wpassword";
	});
	res.send(message == ''? "Wusername" : message);
});

console.log('App is listening on port ' + port);
app.listen(port);
