var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
server.listen(2000);
console.log('Server Started!');

var SOCKET_LIST = {};

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	socket.x = 0;
	socket.y = 0;
	SOCKET_LIST[socket.id] = socket;
	console.log('socket connection');
	//socket.on('sup', function(data){
	//	console.log('Howdy,' + data.reason);
});

	//socket.emit('serverMsg',{
	//	msg: 'Hello There!',
	//});
//});

setInterval(function(){
	var pack = [];
	for (var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.x++;
		socket.y++;
		pack.push({
			x:socket.x,
			y:socket.y
		});
	}
	for (var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit('newPositions',pack);
		}
		
},1000/25);