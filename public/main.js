var main = function (argument) {
	console.log('iniciando main en el cliente');
	//instancia el objeto grid
	var grid = new Grid();
	//crea la tabla con el id grid 
	grid.render( $('#grid') );
	//se conecta con el servidor mediante socket
	window.client = io.connect(window.location.href);
	//crea el evento pintar para notificarle al servidor que dieron clic en una celda 
	client.on('pintar', function (data) {
		grid.pintar(data.x, data.y, data.color);
	});
}
//funcion todo listo
$(document).on('ready', main)