//incluye las librerias de node
var express = require('express'),
	app     = express(),
	server  = require('http').createServer(app),
	io      = require('socket.io').listen(server),
	cons    = require('consolidate');
//coloca a escuchar el servidor en el puerto 8002
server.listen(8002);
//inicializa el motor de plantillas
app.engine('.html', cons.jade);
app.set('view engine', 'html');
//carpeta del programa cliente
app.use(express.static('./public'));
//root del server
app.get('/', function(req, res){
  	res.render('index',{
  		titulo : "Bienvenido al juego de colorear la celda colaborativamente con node"
  	});
});
//maneja el evento connetion del los socket
io.sockets.on('connection', function (socket) {
	//maneja el evento pintar llamando al pintar de todos los otros cliente en forma de broadcast
	socket.on('pintar', function (data) {
		socket.broadcast.emit('pintar', data);
	});
});
console.log("Servidor corriendo en\n  => http://localhost:8002/\n CTRL + C para detenerlo");
