var Grid = function(columns, rows) {
    columns = columns || 20; //si recibe valor se lo asigna sino le pone 20
    rows    = rows || 20; //si recibe valor se lo asigna sino le pone 20
    var self = {}; //variable tipo mapa json

    self.element = $('<table class="grid"></table>');

    for(var r = 0; r < rows; r++) {
        var row = $('<tr></tr>');//crea las filas
        for(var c = 0; c < columns; c++) {
            var cell = $('<td></td>');//crea las columnas

            cell.attr('x', c);//le crea un atributo llamado x al td y le asigna el indice c
            cell.attr('y', r);//le crea un atributo llamado x al td y le asigna el indice r

            //cuando le hace clic a un td
			cell.click(function (e) {
                //Notifica al server mediante socket que le han dado clic enviando un mapa con las coordenadas y el color
                window.client.emit('pintar',{
                    x : $(this).attr('x'),
                    y : $(this).attr('y'),
                    color : $('input').val()
                });
				//le asigna el color al td
                $(this).css('background-color', $('input').val() );
            });
            row.append(cell);
        }
        self.element.append(row);
    }
	//renderea y adiciona la tabla a la plantilla
    self.render = function(where) {
        where.append(self.element);
    };

    self.pintar = function(x,y,color) {
		//busca la celda y la pinta
        self.element.find('tr:eq('+ y +') td:eq('+ x +')').css('background-color', color);
    }
    return self;
};