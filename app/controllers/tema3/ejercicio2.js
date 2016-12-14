(function constructor(args) {
	"use strict";

	/**
	 * setEventos
	 * @description Añadimos eventos a los elementos de UI
	 */
	(function setEventos() {
		//Establecemos eventos sobre los botones
		$.addListener($.readFile, "click", leerFichero);
		$.addListener($.writeFile, "click", escribirFichero);
	})();

	/**
	 * leerFichero
	 * @description Callback boton leer fichero, leemos fichero de texto
	 * @param {Object} e
	 */
	function leerFichero(e) {
		//Obtenemos manejador de fichero
		//Utilizamos directorio privado de aplicación
		//Nombre de fichero: miFichero.txt

		//Si no existe mostramos un mensaje indicando que no existe el fichero
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "miFichero.txt");
		
		if (f.exists()){
			var contenido = f.read();
			$.fileContent.setText(contenido);
		} else {	
			alert("no existe fichero");
		}


		//Si fichero existe lo leemos y volcamos contenido sobre etiqueta #fileContent

		//Establecemos con tenido de fichero en Label
		
	}

	/**
	 * escribirFichero
	 * @description Callback boton escribir fichero, escribimos en fichero de texto
	 * contenido de textfield
	 * @param {Object} e
	 */
	function escribirFichero(e) {
		//Solo escribimos si hay contenido en el área de texto #textArea
		
		var contenido = $.textArea.getValue();
		alert(contenido);
		//Obtenemos manejador de fichero
		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "miFichero.txt");
		f.write(contenido);
		
		
		//var contenido2 = f.read().text;
		
		//alert(contenido2);
		
		//Utilizamos directorio privado de aplicación
		//Nombre de fichero: miFichero.txt

		//Si escritura exitosa mostramos mensaje de alerta indicando el éxito
	}

})($.args || {}); 